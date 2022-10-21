import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { accentColor, baseColor, chosenDay } from "../constants/colors";
import { BASE_URL } from "../constants/urls";
import { weekdays } from "../constants/weekdays";
import UserContext from "../contexts/UserContext";

export default function HabitsPage() {
  const { userInfo } = useContext(UserContext);
  const [newHabitOpened, setNewHabitOpened] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [newHabit, setNewHabit] = useState({});
  const [habits, setHabits] = useState([]);

  const token = userInfo.token; //TODO localStorage
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}habits`, config)
      .then((res) => setHabits([...res.data]))
      .catch((err) => console.log(err.response.data));
  }, []);

  function handleSelectedDays(day) {
    selectedDays.includes(day)
      ? setSelectedDays([...selectedDays.filter((d) => d !== day)])
      : setSelectedDays([...selectedDays, day]);
  }

  function createHabit() {
    console.log(token);
    const body = { ...newHabit, days: selectedDays };
    axios
      .post(`${BASE_URL}habits`, body, config)
      .then((r) => {
        setHabits([...habits, r.data]);
        setNewHabitOpened(!newHabitOpened);
      })
      .catch((err) => {
        console.log(err.response.data);
        //TODO Habilitar botão e inputs
      });
    //TODO Desabilitar botão e inputs
  }

  function deleteHabit(habitId) {
    console.log(token);
    axios
      .delete(`${BASE_URL}habits/${habitId}`, config)
      .then(() => console.log("Deletou!"))
      .catch((err) => console.log(err.response.data));
  }

  function Habits() {
    if (!habits || habits.length === 0) {
      return (
        <>
          <span>There's no habit to be tracked yet.</span>
          <span>Click on "+" to begin your journey!</span>
        </>
      );
    } else {
      return (
        <>
          {habits.map((habit) => (
            <HabitCard key={habit.id}>
              <p className="habit-name">{habit.name}</p>
              <Weekdays>
                {weekdays.map((d) => (
                  <ChosenWeekday
                    key={d.id}
                    className="weekday"
                    selected={habit.days.includes(d.id)}
                  >
                    {d.name}
                  </ChosenWeekday>
                ))}
              </Weekdays>
              <button className="delete" onClick={() => deleteHabit(habit.id)}>
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </HabitCard>
          ))}
        </>
      );
    }
  }

  function handleForm(e) {
    setNewHabit({ ...newHabit, [e.target.name]: e.target.value });
  }

  return (
    <main className="habits-page">
      <NavBar />
      <TitleBarStyled newHabitOpened={newHabitOpened}>
        <span>My habits</span>
        <button
          onClick={() => {
            setNewHabitOpened(!newHabitOpened);
          }}
        >
          {newHabitOpened ? "-" : "+"}
        </button>
      </TitleBarStyled>
      <NewHabitCard newHabitOpened={newHabitOpened}>
        <input
          type="text"
          name="name"
          value={newHabit.name || ""}
          onChange={handleForm}
          placeholder="habit name"
        />
        <Weekdays>
          {weekdays.map((d) => (
            <WeekdayButton
              key={d.id}
              className="weekday"
              onClick={() => handleSelectedDays(d.id)}
              selected={selectedDays.includes(d.id)}
            >
              {d.name}
            </WeekdayButton>
          ))}
        </Weekdays>
        <ConfirmationButtons>
          <button
            className="cancel"
            onClick={() => {
              setNewHabitOpened(!newHabitOpened);
            }}
          >
            Cancel
          </button>
          <button onClick={() => createHabit()}>Save</button>
        </ConfirmationButtons>
      </NewHabitCard>
      <Habits />
      <Habits />
      <Habits />
      <Habits />
      <Footer />
    </main>
  );
}

const TitleBarStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-height: 35px;
  height: 35px;
  margin-bottom: 25px;
  span {
    align-self: center;
    font-size: 23px;
    color: ${baseColor};
  }
  button {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 23px;
    align-items: flex-start;
    width: 40px;
    height: ${(props) => (props.newHabitOpened ? "70px" : "35px")};
    background: ${(props) => (props.newHabitOpened ? "white" : accentColor)};
    color: ${(props) => (props.newHabitOpened ? accentColor : "white")};
  }
`;
const NewHabitCard = styled.form`
  display: ${(props) => (props.newHabitOpened ? "flex" : "none")};
  background: white;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 20px;
  padding: 18px;
  font-size: 18px;
  overflow: hidden;
  .weekday {
    width: 35px;
    height: 30px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid ${chosenDay};
  }
`;
const Weekdays = styled.div`
  display: flex;
  align-self: flex-start;
  gap: 4px;
`;
const WeekdayButton = styled.button`
  background: ${(props) => (props.selected ? chosenDay : "white")}; //isso muda
  color: ${(props) => (props.selected ? "white" : chosenDay)}; //isso muda
`;
const ConfirmationButtons = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
  button {
    height: 35px;
    width: 85px;
  }
  .cancel {
    background: none;
    color: ${accentColor};
  }
`;
const HabitCard = styled.div`
  position: relative;
  background: white;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 18px;
  font-size: 18px;
  overflow: hidden;
  .habit-name {
    margin-bottom: 10px;
  }
  .weekday {
    width: 28px;
    height: 25px;
    border-radius: 5px;
    border: 1px solid ${chosenDay};
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .delete {
    position: absolute;
    top: 0;
    right: 0;
    width: 35px;
    height: 40px;
    border-radius: 0 5px;
    ion-icon {
      color: white;
      font-size: 15px;
    }
  }
`;
const ChosenWeekday = styled.div`
  background: ${(props) => (props.selected ? chosenDay : "white")}; //isso muda
  color: ${(props) => (props.selected ? "white" : chosenDay)}; //isso muda
`;

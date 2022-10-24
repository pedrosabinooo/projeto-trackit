import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import axios from "axios";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { accentColor, baseColor, chosenDay } from "../constants/colors";
import { BASE_URL } from "../constants/urls";
import { weekdays } from "../constants/weekdays";
import { ThreeDots } from "react-loader-spinner";

export default function HabitsPage() {
  const { setUserInfo } = useContext(UserContext);
  const [habits, setHabits] = useState(undefined);
  const [newHabit, setNewHabit] = useState({});
  const [isNewHabitContainerOpen, setIsNewHabitContainerOpen] = useState(true);
  const [selectedDays, setSelectedDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newHabitLoading, setNewHabitLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfoStringfied = localStorage.getItem("user");
    if (userInfoStringfied) setUserInfo(JSON.parse(userInfoStringfied));
  }, [setUserInfo]);

  const userInfoFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };

  if (!userInfoFromLocalStorage) navigate("/");

  useEffect(() => {
    axios
      .get(`${BASE_URL}habits`, config)
      .then((res) => {
        setHabits([...res.data]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });
    setLoading(true);
  }, []);

  function handleSelectedDays(clickedDay) {
    selectedDays.includes(clickedDay)
      ? setSelectedDays([...selectedDays.filter((d) => d !== clickedDay)])
      : setSelectedDays([...selectedDays, clickedDay]);
  }

  function createHabit() {
    const body = { name: newHabit.name, days: [...selectedDays] };
    axios
      .post(`${BASE_URL}habits`, body, config)
      .then((r) => {
        setHabits([...habits, r.data]);
        setIsNewHabitContainerOpen(!isNewHabitContainerOpen);
        setNewHabitLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setNewHabitLoading(false);
      });
    setNewHabitLoading(true);
  }

  function deleteHabit(habitId) {
    if (window.confirm("Do you really want to delete this habit?") === true) {
      axios
        .delete(`${BASE_URL}habits/${habitId}`, config)
        .then(() => {
          setLoading(false);
          setHabits([...habits.filter((h) => h.id !== habitId)]);
        })
        .catch((err) => {
          console.log(err.response.data);
          alert("Deletion was not possible. Try again in a moment.");
          setLoading(false);
        });
      setLoading(true);
    }
  }

  return (
    <main className="habits-page">
      <NavBar />
      <TitleBarStyled isNewHabitContainerOpen={isNewHabitContainerOpen}>
        <span>My habits</span>
        <button
          data-identifier="create-habit-btn"
          onClick={() => {
            setIsNewHabitContainerOpen(!isNewHabitContainerOpen);
          }}
        >
          {isNewHabitContainerOpen ? "-" : "+"}
        </button>
      </TitleBarStyled>
      <NewHabitCard
        isNewHabitContainerOpen={isNewHabitContainerOpen}
        onSubmit={createHabit}
      >
        <input
          type="text"
          name="name"
          value={newHabit.name || ""}
          onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
          placeholder="new habit name"
          disabled={newHabitLoading}
          data-identifier="input-habit-name"
        />
        <Weekdays>
          {weekdays.map((d) => (
            <WeekdayButtonStyled
              key={d.id}
              className="weekday"
              onClick={() => handleSelectedDays(d.id)}
              selected={selectedDays.includes(d.id)}
              disabled={newHabitLoading}
              data-identifier="week-day-btn"
            >
              {d.name}
            </WeekdayButtonStyled>
          ))}
        </Weekdays>
        <ConfirmationButtons>
          <button
            className="cancel"
            disabled={newHabitLoading}
            data-identifier="cancel-habit-create-btn"
            onClick={() => {
              setIsNewHabitContainerOpen(!isNewHabitContainerOpen);
            }}
          >
            cancel
          </button>
          <button
            type="submit"
            disabled={newHabitLoading}
            data-identifier="save-habit-create-btn"
          >
            {newHabitLoading ? (
              <ThreeDots color="white" width="35px" />
            ) : (
              "save"
            )}
          </button>
        </ConfirmationButtons>
      </NewHabitCard>
      {!habits ? (
        <ThreeDots color={chosenDay} />
      ) : habits.length === 0 ? (
        <span data-identifier="no-habit-message">
          There's no habit to be tracked yet. Click on "+" to begin your
          journey!
        </span>
      ) : (
        <>
          {habits.map((habit) => (
            <HabitCard key={habit.id}>
              <p className="habit-name" data-identifier="habit-name">
                {habit.name}
              </p>
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
              <button
                className="delete"
                onClick={() => deleteHabit(habit.id)}
                disabled={loading}
                data-identifier="delete-habit-btn"
              >
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </HabitCard>
          ))}
        </>
      )}
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
  margin-bottom: 20px;
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
    height: ${(props) => (props.isNewHabitContainerOpen ? "50px" : "35px")};
    background: ${(props) =>
      props.isNewHabitContainerOpen ? "white" : accentColor};
    color: ${(props) =>
      props.isNewHabitContainerOpen ? accentColor : "white"};
  }
`;
const Weekdays = styled.div`
  display: flex;
  align-self: flex-start;
  gap: 4px;
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
    width: 35px;
    height: 30px;
    font-size: 16px;
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
  background: ${(props) => (props.selected ? chosenDay : "white")};
  color: ${(props) => (props.selected ? "white" : chosenDay)};
`;
const NewHabitCard = styled.form`
  display: ${(props) => (props.isNewHabitContainerOpen ? "flex" : "none")};
  background: white;
  border-radius: 5px;
  width: 100%;
  margin-top: -10px;
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
const ConfirmationButtons = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
  button {
    height: 35px;
    width: 85px;
    line-height: unset;
  }
  .cancel {
    background: none;
    color: ${accentColor};
  }
`;
const WeekdayButtonStyled = styled.button`
  background: ${(props) => (props.selected ? chosenDay : "white")};
  color: ${(props) => (props.selected ? "white" : chosenDay)};
`;

import UserContext from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { accentColor, baseColor, chosenDay } from "../constants/colors";
import { BASE_URL } from "../constants/urls";
import { weekdays } from "../constants/weekdays";
import NewHabit from "./NewHabit";

export default function Habits() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [newHabitOpened, setNewHabitOpened] = useState(true);
  const [loading, setLoading] = useState(false);
  const [habits, setHabits] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + userInfo.token,
    },
  };

  useEffect(() => {
    const userInfoStringfied = localStorage.getItem("user");
    console.log(userInfoStringfied);
    if (userInfoStringfied) {
      const userInfoParsed = JSON.parse(userInfoStringfied);
      setUserInfo(userInfoParsed);
    }
  }, [setUserInfo]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}habits`, config)
      .then((res) => setHabits([...res.data]))
      .catch((err) => console.log(err.response.data));
  }, []);

  function deleteHabit(habitId) {
    setLoading(!loading);
    if (window.confirm("Do you really want to delete this habit?") === true) {
      axios
        .delete(`${BASE_URL}habits/${habitId}`, config)
        .then(() => {
          console.log("Deleted!");
          setLoading(!loading);
          setHabits([...habits]);
        })
        .catch((err) => {
          console.log(err.response.data);
          alert("Deletion was not possible. Try again in a moment.");
          setLoading(!loading);
        });
    }
  }

  function HabitList() {
    if (!habits || habits.length === 0) {
      return (
        <>
          <span data-identifier="no-habit-message">There's no habit to be tracked yet.</span>
          <span data-identifier="no-habit-message">Click on "+" to begin your journey!</span>
        </>
      );
    } else {
      return (
        <>
          {habits.map((habit) => (
            <HabitCard key={habit.id}>
              <p className="habit-name" data-identifier="habit-name">{habit.name}</p>
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
      );
    }
  }

  return (
    <>
      <TitleBarStyled newHabitOpened={newHabitOpened}>
        <span>My habits</span>
        <button
          data-identifier="create-habit-btn"
          onClick={() => {
            setNewHabitOpened(!newHabitOpened);
          }}
        >
          {newHabitOpened ? "-" : "+"}
        </button>
      </TitleBarStyled>
      <NewHabit
        newHabitOpened={newHabitOpened}
        setNewHabitOpened={setNewHabitOpened}
        habits={habits}
        setHabits={setHabits}
        loading={loading}
        setLoading={setLoading}
      />
      <HabitList />
    </>
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
    height: ${(props) => (props.newHabitOpened ? "50px" : "35px")};
    background: ${(props) => (props.newHabitOpened ? "white" : accentColor)};
    color: ${(props) => (props.newHabitOpened ? accentColor : "white")};
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

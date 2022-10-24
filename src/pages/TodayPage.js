import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { baseColor, doneHabit, undoneHabit } from "../constants/colors";
import { BASE_URL } from "../constants/urls";
import UserContext from "../contexts/UserContext";
import dayjs from "dayjs";
import HabitsProgressionContext from "../contexts/HabitsProgressionContext";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

export default function TodayPage() {
  const { setUserInfo } = useContext(UserContext);
  const { percentage, setPercentage } = useContext(HabitsProgressionContext);
  const [todayHabits, setTodayHabits] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfoStringfied = localStorage.getItem("user");
    if (userInfoStringfied) setUserInfo(JSON.parse(userInfoStringfied));
  }, [setUserInfo]);

  const userInfoFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  const config =  {
    headers: {
      Authorization: `Bearer ${userInfoFromLocalStorage.token}`,
    },
  };

  if (!userInfoFromLocalStorage) navigate("/");

  useEffect(() => {
    axios
      .get(`${BASE_URL}habits/today`, config)
      .then((res) => {
        setTodayHabits([...res.data]);
        setPercentage(
          (
            ([res.data].filter((h) => h.done).length / [res.data].length) *
            100
          ).toFixed(0)
        );
      })
      .catch((err) => console.log(err.response.data));
  }, [setTodayHabits, setPercentage]);

  function changeHabitStatus(habit) {
    axios
      .post(
        `${BASE_URL}habits/${habit.id}/${habit.done ? "uncheck" : "check"}`,
        {id: habit.id},
        config
      )
      .then(() => setTodayHabits([...todayHabits.map(h => habit.id===h.id ? h.done=!habit.done : "")]))
      .catch((err) => console.log(err.response.data));
  }

  return (
    <main className="today-page">
      <NavBar />
      <TitleBarStyled>
        <span data-identifier="today-infos">
          {dayjs().format("dddd, MM/DD")}
        </span>
        <p data-identifier="today-infos">
          {percentage && percentage === 0
            ? "No habits completed yet"
            : `${percentage}% of habits complete`}
        </p>
      </TitleBarStyled>
      {!todayHabits ? (
        <ThreeDots color="white" />
      ) : todayHabits.length === 0 ? (
        <span>There's no habits to be tracked for today.</span>
      ) : (
        todayHabits.map((habit) => (
          <HabitCard
            key={habit.id}
            done={habit.done}
            data-identifier="today-infos"
          >
            <div>
              <p className="habit-name">{habit.name}</p>
              <p className="streak">{`Current streak: ${habit.currentSequence} days`}</p>
              <p className="streak">{`Max. streak: ${habit.highestSequence} days`}</p>
            </div>
            <button
              onClick={() => changeHabitStatus(habit)}
              data-identifier="done-habit-btn"
            >
              <ion-icon name="checkbox"></ion-icon>
            </button>
          </HabitCard>
        ))
      )}
      <Footer />
    </main>
  );
}

const TitleBarStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  gap: 5px;
  span {
    font-size: 23px;
    color: ${baseColor};
  }
`;
const HabitCard = styled.div`
  display: flex;
  background: white;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 18px;
  .habit-name {
    margin-bottom: 5px;
    overflow: hidden;
  }
  .streak {
    display: flex;
    font-size: 13px;
    gap: 5px;
    line-height: 16px;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
    width: 69px;
    height: 69px;
    border: none;
    border-radius: 5px;
    background: none;
  }
  ion-icon {
    font-size: 69px;
    color: ${(props) => (props.done ? doneHabit : undoneHabit)};
  }
`;

import { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { baseColor, inputTextColor } from "../constants/colors";

export default function TodayPage() {
  const [habits, setHabits] = useState([]);
  if (false) setHabits([]);
  function Habits() {
    if (!habits) {
      return (
        <>
          <span>There's no habit to be tracked for today.</span>
        </>
      );
    } else {
      return (
        <HabitCard>
          <div>
            <p className="habit-name">Habit name</p>
            <p className="streak">{`Current streak: 4 days`}</p>
            <p className="streak">{`Max. streak: 5 days`}</p>
          </div>
          <button>
            <ion-icon name="checkbox"></ion-icon>
          </button>
        </HabitCard>
      );
    }
  }
  return (
    <main className="today-page">
      <NavBar />
      <TitleBarStyled>
        <span>{`Monday, 17/05`}</span>
        <p>{`67% of habits complete`}</p>
      </TitleBarStyled>
      <Habits />
      <Habits />
      <Habits />
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
    color: ${inputTextColor};
  }
`;

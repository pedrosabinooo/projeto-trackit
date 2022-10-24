import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { accentColor } from "../constants/colors";
import { footerHeight } from "../constants/dimensions";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useContext } from "react";
import HabitsProgressionContext from "../contexts/HabitsProgressionContext";

export default function Footer() {
  const { percentage } = useContext(HabitsProgressionContext);

  const navigate = useNavigate();
  return (
    <FooterStyled>
      <button
        onClick={() => navigate("/habits")}
        data-identifier="habit-page-action"
      >
        <p className="habits">Habits</p>
      </button>
      <button className="today" onClick={() => navigate("/today")}>
        <CircularProgressbar
          value={percentage ? percentage : 0}
          text={"Today"}
          background
          backgroundPadding={6}
          styles={buildStyles({
            backgroundColor: accentColor,
            textColor: "white",
            pathColor: "white",
            trailColor: "transparent",
            pathTransition: 0.5,
          })}
        />
      </button>
      <button
        onClick={() => navigate("/history")}
        data-identifier="historic-page-action"
      >
        <p className="history">History</p>
      </button>
    </FooterStyled>
  );
}

const FooterStyled = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${footerHeight};
  width: 100%;
  button {
    background: white;
    z-index: 1;
    padding: 0;
    align-items: center;
    height: 100%;
    border: none;
    border-radius: 0;
    font-size: 18px;
    &:hover {
      filter: brightness(0.9);
    }
  }
  p {
    color: ${accentColor};
  }
  .habits {
    margin-right: 10%;
  }
  .history {
    margin-left: 10%;
  }
  .today {
    position: absolute;
    z-index: 10;
    bottom: 10px;
    left: calc(50% - 91px / 2);
    background: ${accentColor};
    display: flex;
    align-items: center;
    justify-content: center;
    height: 91px;
    width: 91px;
    border-radius: 50%;
    color: white;
  }
`;

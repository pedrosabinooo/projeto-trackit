import styled from "styled-components";
import { chosenDay } from "../constants/colors";
import { weekdays } from "../constants/weekdays";

export default function Weekdays({ selectedDays, setSelectedDays, loading }) {
  function handleSelectedDays(day) {
    selectedDays.includes(day)
      ? setSelectedDays([...selectedDays.filter((d) => d !== day)])
      : setSelectedDays([...selectedDays, day]);
  }

  return (
    <>
      <WeekdaysStyled>
        {weekdays.map((d) => (
          <WeekdayButtonStyled
            key={d.id}
            className="weekday"
            onClick={() => handleSelectedDays(d.id)}
            selected={selectedDays.includes(d.id)}
            disabled={loading}
            data-identifier="week-day-btn"
          >
            {d.name}
          </WeekdayButtonStyled>
        ))}
      </WeekdaysStyled>
    </>
  );
}
const WeekdaysStyled = styled.div`
  display: flex;
  align-self: flex-start;
  gap: 4px;
`;
const WeekdayButtonStyled = styled.button`
  background: ${(props) => (props.selected ? chosenDay : "white")};
  color: ${(props) => (props.selected ? "white" : chosenDay)};
`;

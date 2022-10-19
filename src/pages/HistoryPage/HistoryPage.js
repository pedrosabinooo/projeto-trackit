import styled from "styled-components";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import { baseColor } from "../../constants/colors";

export default function HistoryPage() {
  return (
    <main className="history-page">
      <NavBar />
      <TitleBarStyled>
        <span>History</span>
      </TitleBarStyled>
      <div>Soon you'll be able to see your evolution!</div>
      <Footer/>
    </main>
  );
}

const TitleBarStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  span {
    font-size: 23px;
    color: ${baseColor};
  }
`;
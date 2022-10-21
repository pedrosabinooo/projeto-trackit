import styled from "styled-components";
import { baseColor } from "../constants/colors";
import MiniLogo from "../assets/images/white-logo64.png";
import UserPhoto from "../assets/images/user-photo-default64.png";
import { navBarHeight } from "../constants/dimensions";
import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function NavBar() {
  const { userInfo } = useContext(UserContext);
  
  return (
    <NavBarStyled>
      <img src={MiniLogo} alt="Logo" />
      <img src={!userInfo.image ? UserPhoto : userInfo.image} alt="ProfilePic" />
    </NavBarStyled>
  );
}

const NavBarStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: ${baseColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${navBarHeight};
  width: 100%;
  padding: 19px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  img {
    align-items: center;
    height: 55px;
  }
`;

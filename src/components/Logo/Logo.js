import styled from "styled-components";
import LogoImage from "../../assets/images/color-logo512.png";
import { baseColor } from "../../constants/colors";


export default function Logo() {
  return (
    <LogoStyled>
      <img src={LogoImage} alt="Logo" />
      <span>TrackIt</span>
    </LogoStyled>
  );
}

const LogoStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    img {
        height: 180px;
        width: 180px;
        margin: auto 0 10px 0;
    }  

    span {
        font-size: 48px;
        color: ${baseColor};
        font-weight: 700;
    }
`;

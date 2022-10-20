import axios from "axios";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../components/Logo";
import { accentColor } from "../constants/colors";
import { BASE_URL } from "../constants/urls";
import UserContext from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function SignUpPage() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  function signup(e) {
    e.preventDefault();
    axios
      .post(`${BASE_URL}auth/sign-up`, userInfo)
      .then(() => navigate("/"))
      .catch((e) => console.log(e.response.data));
  }

  function handleForm(e) {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  return (
    <HomePageStyled>
      <Logo />
      <form onSubmit={signup}>
        <input
          id="email"
          name="email"
          value={userInfo.email || ""}
          onChange={handleForm}
          placeholder="email"
          required // FIXME: deixar required
        />
        <input
          id="password"
          type="password"
          name="password"
          value={userInfo.password || ""}
          onChange={handleForm}
          placeholder="password"
          required // FIXME: deixar required
        />
        <input
          id="name"
          name="name"
          value={userInfo.name || ""}
          onChange={handleForm}
          placeholder="name"
          required // FIXME: deixar required
        />
        <input
          id="image"
          name="image"
          value={userInfo.image || ""}
          onChange={handleForm}
          placeholder="image"
          // required // FIXME: deixar required
        />
        <button type="submit">Sign up</button>
      </form>
      <Link to="/">Already have an account? Log in!</Link>
    </HomePageStyled>
  );
}

const HomePageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 40px;
  a {
    color: ${accentColor};
    font-size: 14px;
    &:visited {
      filter: brightness(0.6);
    }
  }
`;

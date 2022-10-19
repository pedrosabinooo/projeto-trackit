import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../components/Logo/Logo";
import { accentColor } from "../../constants/colors";

export default function SignUpPage() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  function signup(e) {
    e.preventDefault();
    navigate("/");
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
          // required // FIXME: deixar required
        />
        <input
          id="password"
          type="password"
          name="password"
          value={userInfo.password || ""}
          onChange={handleForm}
          placeholder="password"
          // required // FIXME: deixar required
        />
        <input
          id="name"
          name="name"
          value={userInfo.name || ""}
          onChange={handleForm}
          placeholder="name"
          // required // FIXME: deixar required
        />
        <input
          id="photo"
          name="photo"
          value={userInfo.photo || ""}
          onChange={handleForm}
          placeholder="photo"
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

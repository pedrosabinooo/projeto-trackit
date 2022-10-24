import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import Logo from "../components/Logo";
import { accentColor } from "../constants/colors";
import { BASE_URL } from "../constants/urls";
import UserContext from "../contexts/UserContext";

export default function HomePage() {
  const { setUserInfo } = useContext(UserContext);
  const [loginInfo, setLoginInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/today");
    }
  }, [navigate]);

  function login(e) {
    e.preventDefault();
    const body = { email: loginInfo.email, password: loginInfo.password };
    axios
      .post(`${BASE_URL}auth/login`, body)
      .then((r) => {
        setUserInfo({ ...r.data });
        localStorage.setItem("user", JSON.stringify({ ...r.data }));
        
        navigate("/today");
      })
      .catch(() => {
        alert("There's been an issue. Check your login info and try again.");
        setLoading(false);
      });
    setLoading(true);
  }

  function handleForm(e) {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  }

  return (
    <HomePageStyled>
      <Logo />
      <form onSubmit={login}>
        <input
          id="email"
          name="email"
          value={loginInfo.email || ""}
          onChange={handleForm}
          placeholder="email"
          disabled={loading}
          required
          data-identifier="input-email"
        />
        <input
          id="password"
          type="password"
          name="password"
          value={loginInfo.password || ""}
          onChange={handleForm}
          placeholder="password"
          disabled={loading}
          required
          data-identifier="input-password"
        />
        <button type="submit" disabled={loading} data-identifier="login-btn">
          {loading ? <ThreeDots color="white" /> : "Log in"}
        </button>
      </form>
      <Link to="/signup" data-identifier="sign-up-action">
        Don't have an account? Sign up!
      </Link>
    </HomePageStyled>
  );
}

const HomePageStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
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

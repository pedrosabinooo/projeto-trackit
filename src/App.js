import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import { UserProvider } from "./contexts/UserContext";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import HabitsPage from "./pages/HabitsPage";
import TodayPage from "./pages/TodayPage";
import HistoryPage from "./pages/HistoryPage";
import { HabitsProgressionProvider } from "./contexts/HabitsProgressionContext";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <UserProvider>
        <HabitsProgressionProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/habits" element={<HabitsPage />} />
              <Route path="/today" element={<TodayPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </BrowserRouter>
        </HabitsProgressionProvider>
      </UserProvider>
    </>
  );
}

import Footer from "../components/Footer";
import Habits from "../components/Habits";
import NavBar from "../components/NavBar";

export default function HabitsPage() {
  return (
    <main className="habits-page">
      <NavBar />
      <Habits />
      <Footer />
    </main>
  );
}

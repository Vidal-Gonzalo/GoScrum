import "./Donate.css";
import { useNavigate } from "react-router-dom";

export const Donate = () => {
  const navigate = useNavigate();
  return (
    <main className="donate">
      <section>
        <h1>Colabora con el proyecto</h1>
        <a href="https://mpago.la/2j8Wner" target="_blank" rel="noreferrer">
          Donar
        </a>
        <p onClick={() => navigate("/")}>Volver al inicio</p>
      </section>
    </main>
  );
};

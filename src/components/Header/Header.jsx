import React from "react";
import "./Header.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login", { replace: true });
  };
  return (
    <header>
      <img src="/img/goscrum.png" alt="" />
      <div className="wrapper-right-header">
        <div className="">
          <button onClick={() => navigate("/donate", { replace: true })}>
            Donar
          </button>
        </div>
        <div className="black">Tareas creadas: {tasks?.length}</div>
        <div className="username">{userName}</div>
        <button onClick={handleLogout} className="">
          X
        </button>
      </div>
    </header>
  );
};

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
export const Navbar = () => {
  const { actions } = useContext(Context);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto">
          <Link to="/register">Regístrarse</Link>
        </div>
        <div className="ml-auto">
          <Link to="/login">Ingresar</Link>
        </div>
        <div className="ml-auto">
          <button
            onClick={() => {
              actions.logout();
            }}
          >
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
};

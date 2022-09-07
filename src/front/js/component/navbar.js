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
        <div className="btn-group" role="group">
          <button id="btnGroupDrop1" type="button" className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            View more
          </button>
          <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <li>
              <div className="ml-auto text-center">
                <Link to="/register">Regístrarse</Link>
              </div>
            </li>
            <li>
              <div className="ml-auto text-center">
                <Link to="/login">Ingresar</Link>
              </div>
            </li>
            <li>
              <div className="ml-auto">
                <button className="btn btn-outline-dark w-100"
                  onClick={() => {
                  actions.logout();
                }}
                >
                Salir
                </button>
            
              </div>
            </li>
          </ul>
        </div>




      </div>
    </nav>
  );
};

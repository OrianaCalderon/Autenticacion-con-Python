import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="container">
        <div className="row">
          {store.token.length <= 0 ? (
            <h1>hola no tienes permiso de ver esto inicia sesion</h1>
          ) : (
            <h1>hola que tal tienes permiso</h1>
          )}
        </div>
      </div>
    </>
  );
};

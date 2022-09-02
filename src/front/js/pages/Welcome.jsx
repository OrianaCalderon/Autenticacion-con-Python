import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Welcome = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    if (store.token != "") {
      actions.handleUser();
      return;
    }
    navigate("/login");
  }, [store.token]);
  sessionStorage.removeItem("token");

  return (
    <div className="container">
      <div className="row">
        {store.token.length <= 0 ? (
          <h1>hola no tienes permiso de ver esto inicia sesion</h1>
        ) : (
          <ul>
            {store.users.map((user) => {
              return <li key={user.id}>{user.email}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Welcome;

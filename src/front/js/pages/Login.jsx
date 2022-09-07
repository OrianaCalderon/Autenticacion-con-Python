import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

  let initialState = {
    email: "",
    password: "",
  };

  //usar context
  const { actions } = useContext(Context);
  const [userLogin, setUserLogin] = useState(initialState);

  //navigations
  let navigate = useNavigate();

  const handleChange = ({ target }) => {
    setUserLogin({
      ...userLogin,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userLogin.email.trim() != "" && userLogin.password.trim() != "") {
      let response = await actions.login(userLogin);
      if (response) {
        navigate("/welcome");
      } else {
        alert("Verifica tus credenciales, sino tienes registrate primero");
      }
    } else {
      console.log("todos los campso son obligatorios");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-6 col-md-4">
        <h1 className="text-right my-5">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={userLogin.email}
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              value={userLogin.password}
            />
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <button className="btn btn-outline-primary w-50 my-3 justify-content-center">Ingresar</button>
          </div>
          
        </form>
      </div>
    </div>

    

  );
};

export default Login;

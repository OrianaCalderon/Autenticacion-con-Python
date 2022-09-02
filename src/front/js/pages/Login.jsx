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
        alert("todo mal");
      }
    } else {
      console.log("todos los campso son obligatorios");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6">
        <h1 className="text-center">Ingresar a Deimianland</h1>
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

          <button className="btn btn-success w-100 my-3">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

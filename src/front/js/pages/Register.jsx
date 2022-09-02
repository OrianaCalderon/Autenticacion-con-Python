import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

const Register = () => {
  let initialState = {
    email: "",
    password: "",
  };

  //usar context
  const { actions } = useContext(Context);
  const [userRegister, setUserRegister] = useState(initialState);

  const handleChange = ({ target }) => {
    setUserRegister({
      ...userRegister,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userRegister.email.trim() != "" && userRegister.password.trim() != "") {
      console.log("todo bien registremos");
      let response = await actions.userRegister(userRegister);
      if (response) {
        setUserRegister({ initialState });
        alert("se registro con exito");
      } else {
        alert("todo mal");
      }
    } else {
      console.log("todos los campso son obligatorios");
    }
  };

  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h1 className="text-center">Regístrate aquí</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                className="form-control"
                onChange={handleChange}
                value={userRegister.email}
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={handleChange}
                value={userRegister.password}
              />
            </div>

            <button className="btn btn-secondary w-100 my-3">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

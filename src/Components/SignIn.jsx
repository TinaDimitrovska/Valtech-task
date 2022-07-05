import React, { useState } from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };
  console.log(values);

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    const { email, password } = values;

    if (email === "") {
      validationErrors["email"] = "Email is required";
    } else if (!email.includes("@")) {
      validationErrors["email"] = "Please enter a valid email";
    }
    if (password === "") {
      validationErrors["password"] = "Password is required";
    }

    setErrors(validationErrors);

    if (email !== "" && email.includes("@") && password !== "") {
      navigate("/home");
    }
  };

  return (
    <>
      <Nav />
      <div className="main-div">
        <h1>Join our stock community!</h1>
        <p>
          Download free photos and videos powered by the best photographers.
        </p>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="username">username</label>
          <input
            type="email"
            id="username"
            name="username"
            placeholder="Enter username here..."
            className="inp"
            onChange={handleChange("email")}
          />
          {errors.email && <p className="err">{errors.email}</p>}
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Enter password here..."
            className="inp"
            onChange={handleChange("password")}
          />
          {errors.password && <p className="err">{errors.password}</p>}
          <button className="sub" type="submit">
            Log in
          </button>
        </form>
        <footer>
          <img
            src={require("../img/Picsart-Camera-photography-logo-png-1.png")}
            alt=""
            className="image"
          />
        </footer>
      </div>
    </>
  );
}

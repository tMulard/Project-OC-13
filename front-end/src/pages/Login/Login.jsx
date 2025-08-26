import { useState } from "react";
import "./Login.css"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setIsAuth, setToken } from "../../../store/slices/authSlice.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const fetchData = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const response = await fetchData.json();
      
      if (response.status === 200 && response.body.token) {
        dispatch(setIsAuth(true))
        dispatch(setToken(response.body.token))
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Log in</h1>
          <form onSubmit={onSubmit}>
            <div className="input-wrapper">
              <label htmlFor="mail">Email: </label>
              <input
                type="text"
                name="email"
                id="mail"
                placeholder="example@mail.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="12345678"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">Log in</button>
          </form>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default Login;

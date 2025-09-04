import { useEffect, useState } from "react";
import "./Login.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logIn} from "../../../store/slices/authSlice.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth)
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    dispatch(logIn(email,password))
  };
  
  useEffect(() => {
    if (isAuth) {navigate("/dashboard");}
  }, [isAuth]);

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

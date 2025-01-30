import { useState } from "react";
import { useAuth } from "../../provider/AuthProvider";

import logo from '../../assets/logo.png'
import "./Signup.css"

const Signup = () => {
  const { signup, isAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    signup({ email, password, firstName, lastName });
  };

  return (
    <>
      <main class="main bg-dark">
        <section class="sign-in-content">
          <i class="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign up</h1>
          <form onSubmit={onSubmit}>
            <div className="input-wrapper">
              <label for="mail">Email: </label>
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
              <label for="password">Password: </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="12345678"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label for="firstName">First Name: </label>
              <input
                type="text"
                name="firstName"
                id="firstNamme"
                placeholder="John"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label for="lastName">Last Name: </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <button type="submit" class="sign-in-button">Sign Up</button>
          </form>
        </section>
      </main>
      <footer class="footer">
        <p class="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default Signup;

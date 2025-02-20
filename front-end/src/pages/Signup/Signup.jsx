import { useState } from "react";
import { useAuth } from "../../provider/AuthProvider";

import "./Signup.css";

const Signup = () => {
  const { signup, isAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const response = await signup({ email, password, firstName, lastName });

    if (response.status !== 200) {
      setErrorMessage(response.message);
    }
  };

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign up</h1>
          <p className="error">{errorMessage}</p>
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
            <div className="input-wrapper">
              <label htmlFor="firstName">First Name: </label>
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
              <label htmlFor="lastName">Last Name: </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <button type="submit" className="sign-in-button">
              Sign Up
            </button>
          </form>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default Signup;

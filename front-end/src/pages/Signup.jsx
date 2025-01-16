import { useState } from "react";
import { useAuth } from "../provider/AuthProvider";

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
    <main>
      <h1>Signup page</h1>

      <div className="formContainer">
        <form onSubmit={onSubmit}>
          <label for="mail">Email: </label>
          <input
            type="text"
            name="email"
            id="mail"
            placeholder="example@mail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label for="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="12345678"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label for="firstName">First Name: </label>
          <input
            type="text"
            name="firstName"
            id="firstNamme"
            placeholder="John"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <label for="lastName">Last Name: </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Doe"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </main>
  );
};

export default Signup;

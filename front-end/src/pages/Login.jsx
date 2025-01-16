import { useState } from "react";
import { useAuth } from "../provider/AuthProvider";

const Login = () => {
  const { login, isAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <main>
      <h1>Login page</h1>

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
          <button type="submit">Connect</button>
        </form>
      </div>
    </main>
  );
};

export default Login;

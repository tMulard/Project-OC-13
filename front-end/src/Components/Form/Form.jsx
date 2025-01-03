import { useState } from "react";
import "./Form.css";

function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    console.log("submit");
    // fetch

    checkData({ email, password });
  };

  const checkData = async (data) => {
    console.log(JSON.stringify(data));
    try {
      const fetchData = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const response = await fetchData.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form id="connect-form" onSubmit={(event) => onSubmit(event)}>
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
    </>
  );
}

export default Form;

import { useState } from "react";

import "./Signup.css";
import { useDispatch } from "react-redux";
import { setIsAuth, setToken } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router";

const Signup = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const onSubmit = async (event) => {
    event.preventDefault();
    
    // Validate form data
    const errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    if (!formData.firstName) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName) {
      errors.lastName = 'Last name is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      const fetchData = await fetch("http://localhost:3001/api/v1/user/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formData }),
        }
      );

      const response = await fetchData.json();

      if (response.status === 200 && response.body.token) {
        dispatch(setIsAuth(true));
        dispatch(setToken(response.body.token));
        navigate("/dashboard");
      }
      if (response.status === 400) {
        return response;
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.toString());
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
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && <p className="error">{formErrors.email}</p>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="12345678"
                value={formData.password}
                onChange={handleChange}
              />
              {formErrors.password && <p className="error">{formErrors.password}</p>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="firstName">First Name: </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
              />
              {formErrors.firstName && <p className="error">{formErrors.firstName}</p>}
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last Name: </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
              />
              {formErrors.lastName && <p className="error">{formErrors.lastName}</p>}
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

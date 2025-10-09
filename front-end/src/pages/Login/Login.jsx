import { useEffect, useState } from "react";
import "./Login.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logIn, selectError} from "../../../store/slices/authSlice.js";
import { selectIsAuth } from "../../../store/slices/authSlice";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const errorMsg = useSelector(selectError);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
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

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    dispatch(logIn(formData.email,formData.password))
  };
  
  useEffect(() => {
    if (isAuth) {navigate("/dashboard");}
  }, [isAuth, navigate]);

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
              {errorMsg && <p className="error">{errorMsg}</p>}
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

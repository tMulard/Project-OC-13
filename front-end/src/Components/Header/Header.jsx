import { Link, useNavigate } from "react-router";
import "./Header.css";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout, selectIsAuth, selectProfile, selectToken } from "../../../store/slices/authSlice";
import { useEffect } from "react";


const Header = () => {
  
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth)
  const token = useSelector(selectToken)
  const navigate = useNavigate();
  const profile = useSelector(selectProfile)
  
  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
    }
  }, [token, dispatch]);

  return (
    <nav className="main-nav">
      <Link to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="navLinks">
        {isAuth ? (
          <>
            <Link className="main-nav-item" to="./dashboard">
              <i className="fa fa-user-circle"></i>
              {profile?.firstName}
            </Link>
            <button onClick={() => {dispatch(logout())
              navigate("/")
            }}>Sign out</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <i className="fa fa-user-circle"></i>
              Log in
            </Link>
            <Link to="/signup">
              <i className="fa fa-user-circle"></i>
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;

import { Link, useNavigate } from "react-router";
import "./Header.css";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout, setProfile } from "../../../store/slices/authSlice";
import { useEffect } from "react";

const Header = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const token = useSelector((state) => state.auth.token?.payload);// ? nécessaire pour savoir si on reçoit les données et éviter une erreur au chargement
  const navigate = useNavigate();
  
  const getProfile = async (token) => {
    try {
      const fetchData = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const response = await fetchData.json();

      if (response.status === 200) {
        dispatch(setProfile(response.body));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const profile = useSelector((state) => state.auth.profile?.payload)
  
  useEffect(() => {
    if (token) {
      getProfile(token);
    }
  }, [token]);

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

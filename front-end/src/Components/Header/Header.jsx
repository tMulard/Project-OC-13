import { Link } from "react-router";
import "./Header.css";
import logo from "../../assets/logo.png";
import { useAuth } from "../../provider/AuthProvider";

const Header = () => {
  const { logout, profile } = useAuth();

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

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

  useEffect(() => {
    getProfile();
  }, []);

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
            <button onClick={logout}>Sign out</button>
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

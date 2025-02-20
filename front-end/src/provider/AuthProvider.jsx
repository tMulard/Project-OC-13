import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext({
  isAuth: false,
  token: null,
  profile: null,
  login: () => {
    throw new Error("login n'est pas encore initialisée");
  },
  logout: () => {
    throw new Error("logout n'est pas encore initialisée");
  },
  signup: () => {
    throw new Error("signup n'est pas encore initialisée");
  },
});

const AuthProvider = ({ children }) => {
  let navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  const login = async (data) => {
    try {
      const fetchData = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const response = await fetchData.json();

      if (response.status === 200 && response.body.token) {
        setIsAuth(true);
        setToken(response.body.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setIsAuth(false);
    setToken(null);
  };

  const signup = async (data) => {
    try {
      const fetchData = await fetch(
        "http://localhost:3001/api/v1/user/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const response = await fetchData.json();

      if (response.status === 200 && response.body.token) {
        setIsAuth(true);
        setToken(response.body.token);
        navigate("/dashboard");
      }
      if (response.status === 400) {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        setProfile(response.body);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getProfile(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        token,
        profile,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export default AuthProvider;

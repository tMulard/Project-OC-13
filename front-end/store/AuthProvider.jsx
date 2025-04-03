import { useContext, useState, useEffect } from "react";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    token: null,
    profile: null,
  },
  reducers: {
    setIsAuth: (state, isAuth) => {
      state.isAuth = isAuth;
    },
    setToken: (state, token) => {
      state.token = token;
    },
    setProfile: (state, profile) => {
      state.profile = profile;
    },
  },
});

export const { setIsAuth, setToken } = AuthSlice.actions;

export const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
  },
});

const AuthProvider = ({ children }) => {
  let navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

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

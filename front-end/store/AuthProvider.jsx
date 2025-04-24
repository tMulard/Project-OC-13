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
    logout: (state) => {
      state.isAuth = false,
      state.token = null,
      state.profile = null;
    }
  },
});

export const { setIsAuth, setToken, setProfile, logout } = AuthSlice.actions;

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
        // signup,
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

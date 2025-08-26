import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


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

export default AuthProvider;

import { useEffect } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const { isAuth, logout } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Dashboard.css";
import { logIn, selectIsAuth, selectProfile } from "../../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  let navigate = useNavigate();
  const profile = useSelector(selectProfile);
  const isAuth = useSelector(selectIsAuth);
  const [modalOpened, setModalOpened] = useState(false);
  
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    dispatch(logIn(firstName, lastName))
  };

  const displayModal = () => {
    setModalOpened(true);
  }
  
  const closeModal = () => {
    setModalOpened(false);
  }

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);


  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {profile?.firstName} !
          </h1>

          <button className="edit-button" onClick={displayModal}>Edit Name</button>
          <form onSubmit={onSubmit} id="modalForm" className={modalOpened? "" : "hidden"}>
            <div className="inputs">
              <label htmlFor="fname">First name:</label><br/>
              <input type="text" id="fname" name="firstName" defaultValue="John" /><br/>
              <label htmlFor="lname">Last name:</label><br/>
              <input type="text" id="lname" name="lastName" defaultValue="Doe" /><br/>
            </div>
            <div className="buttons">
              <input type="submit" value="Submit">Save</input>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </form>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </>
  );
};

export default Dashboard;

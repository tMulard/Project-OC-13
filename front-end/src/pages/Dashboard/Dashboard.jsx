import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Dashboard.css";
import { selectIsAuth, selectProfile, selectSuccessUpdate, upDate } from "../../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  let navigate = useNavigate();
  const profile = useSelector(selectProfile);
  const isAuth = useSelector(selectIsAuth);
  const successUpdate = useSelector(selectSuccessUpdate);
  const [modalOpened, setModalOpened] = useState(false);
  
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
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

    const errors = {};

    if (!formData.firstName) {
      errors.firstName = 'First Name is required';
    }

    if (!formData.lastName) {
      errors.lastName = 'Last Name is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      // Perform form submission logic (e.g., API call)
      await dispatch(upDate(formData.firstName, formData.lastName))
      // Reset form fields and errors
      setFormData({ firstName: '', lastName: '' });
      setFormErrors({});
    } catch (error) {
      // Handle form submission error
      console.error('Form submission failed:', error);
    }
  };

  const displayModal = () => {setModalOpened(true);}
  
  const closeModal = () => {setModalOpened(false);}

  useEffect(() => {
    if (!isAuth) { navigate("/login");}
    if (successUpdate) { navigate(0);}
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

          <button className="edit-button" onClick={displayModal}>
            Edit Name
          </button>
          <div className={modalOpened ? "" : "hidden"}>
            <form onSubmit={onSubmit} id="modalForm">
              <div className="inputs">
                <label htmlFor="fname">First name:</label>
                <br />
                <input
                  type="text"
                  id="fname"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={profile?.firstName}
                />
                <br />
                {formErrors.firstName && (
                  <p className="error">{formErrors.firstName}</p>
                )}
                <label htmlFor="lname">Last name:</label>
                <br />
                <input
                  type="text"
                  id="lname"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={profile?.lastName}
                />
                <br />
                {formErrors.lastName && (
                  <p className="error">{formErrors.lastName}</p>
                )}
              </div>
              <div className="buttons">
                <input type="submit" value="Save" />
                <button onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
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

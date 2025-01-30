import { Link } from 'react-router';
import './Header.css';
import logo from '../../assets/logo.png'

const Header = () => {
    return <nav class="main-nav">
        <Link to='/'>
        <img class="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 class="sr-only">Argent Bank</h1>
        </Link>
        <div class="navLinks">
        <Link to="/login">
            <i class="fa fa-user-circle"></i>
            Log in
        </Link>
        <Link to="/signup">
            <i class="fa fa-user-circle"></i>
            Sign up
        </Link>
        {/* <button onClick={logout}>Sign out</button> */}
    </div>
  </nav>
}

export default Header;
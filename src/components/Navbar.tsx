import { NavLink } from 'react-router-dom';
import heart from "../assets/pngegg.png";

const Navbar = () => {
    return (
        <nav className="navbar">
            <a className="navbar__a" href="/">
                <img src={heart} alt="Valentines Day Cards" />
            </a>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;
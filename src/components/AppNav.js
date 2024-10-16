import './AppNav.css';
import { Link } from "react-router-dom";

const AppNav = () => {
    return (
        <nav className="mainNav">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Log In</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
            </ul>
        </nav>
    )
}
export default AppNav;
import './AppNav.css';
import { Link } from "react-router-dom";

const AppNav = () => {
    return (
        <nav className="mainNav">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/clients/add">Add Client</Link></li>
                <li><Link to="/users/login">Log In</Link></li>
                <li><Link to="/users/signup">Sign up</Link></li>
            </ul>
        </nav>
    )
}
export default AppNav;
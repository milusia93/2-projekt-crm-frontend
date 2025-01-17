import axios from "axios";
import config from "../config";
import "./AppNav.css";
import { Link } from "react-router-dom";


const AppNav = (props) => {
  const handlelogout = (e) => {
    e.preventDefault();

    axios
      .post(config.api.url + "/users/logout")
      .then((res) => {
        if (res.data.message) {
          props.setUser(null);
          localStorage.setItem("user", null);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <nav className="mainNav">
      <ul>
        {props.user && (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}
        {props.user && (
          <li>
            <Link to="/clients/add">Add Client</Link>
          </li>
        )}
        {!props.user && (
          <li>
            <Link to="/users/login">Log In</Link>
          </li>
        )}
        {!props.user && (
          <li>
            <Link to="/users/signup">Sign up</Link>
          </li>
        )}
        {props.user && (
          <li>
            <Link to="/" onClick={handlelogout}>
              Log out
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default AppNav;

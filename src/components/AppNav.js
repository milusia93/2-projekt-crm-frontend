import axios from 'axios';
import config from "../config";
import './AppNav.css';
import { Link } from "react-router-dom";
import { useEffect } from 'react';

const AppNav = (props) => {
    const handlelogout = (e) => {
        e.preventDefault()

        axios
            .post(config.api.url + "/users/logout")
            .then((res) => {

                console.log(res.data)
                if (res.data.message) {
                    props.setUser(null)
                    localStorage.setItem('user', null)
                }
            })
            .catch((err) => {
               console.error(err)
            });
    }
    useEffect(()=>{
        props.setUser()
    }, [])
    return (
        <nav className="mainNav">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/clients/add">Add Client</Link></li>
                {!props.user && <li><Link to="/users/login">Log In</Link></li>}
                {!props.user && <li><Link to="/users/signup">Sign up</Link></li>}
                {props.user && <li><Link to="/" onClick={handlelogout}>Log out</Link></li>}
            </ul>
        </nav>
    )
}
export default AppNav;
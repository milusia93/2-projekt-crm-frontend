import axios from "axios";
import config from "../config";
import React, { useState, useEffect } from "react";
const Login = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const[signUpMessage, setSignUpMessage] = useState('')

    const handleInputChange = (e) => {
        const target = e.target
        const name = target.name
        setFormData({
            ...formData,
            [name]: target.value
        })
    }

    const handleSubmit = (e) => {
       e.preventDefault()
        axios
            .post(config.api.url + "/users/login", {
                username: formData.username,
                password: formData.password
            }, { mode: "cors" })
            .then((res) => {
                console.log(res.data);
                if(res.data.logedin){
                    setSignUpMessage(res.data.message)
                }
            })
            .catch((err) => {
                console.error(err);
            });

    };

    return (
        <div className="loginForm">
            <form onSubmit={handleSubmit}>
                {signUpMessage && <h2>{signUpMessage}</h2>}
                <div>
                    <label htmlFor="username">User name</label>
                    <input type="text" id="username" name="username" onChange={handleInputChange} value={formData.username} />
                </div>
                <div>
                    <label htmlFor="password">User password</label>
                    <input type="password" id="password" name="password" onChange={handleInputChange} value={formData.password}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
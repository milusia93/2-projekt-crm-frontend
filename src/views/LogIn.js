import axios from "axios";
import config from "../config";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
const Login = (props) => {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [loginMessage, setLoginMessage] = useState('')

    const handleInputChange = (e) => {
        const target = e.target
        const name = target.name
        setFormData({
            ...formData,
            [name]: target.value
        })
    }

    const resetForm = () => {
        setFormData({
            username: '',
            password: ''
        });
        setLoginMessage('')
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            return;
        }

        console.log('User loged in')

        loginUser();
        resetForm();

    };

    const loginUser = () => {

        
        axios
            .post(config.api.url + "/users/login", {
                username: formData.username,
                password: formData.password
            }, { mode: "cors" })
            .then((res) => {
                // console.log(res.data);
                props.setUser(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
                console.log(res)
                if (res.data.error) {
                    setLoginMessage(res.data.message)
                }
            })
            .catch((err) => {
                // console.error(err.response);
                if (err.response.data.error) {
                    console.log(err.response)
                    setLoginMessage(err.response.data.message)
                }
            });

    };

    const validateForm = (e) => {
        let validationErrors = {
            username: false,
            password: false,
        };
        if (formData.username.trim() === '') {
            validationErrors.username = true;

            setLoginMessage('Username is required')
        } else if (formData.password.trim() === '') {
            validationErrors.password = true;
            setLoginMessage('Password is required')
        } else {
            validationErrors.username = false;
            validationErrors.password = false;
            setLoginMessage('')
        }
        return (
            validationErrors.username ||
            validationErrors.password
        );

    }

    return (
        <div className="loginForm">
            {props.user && <Navigate to="/" />}
            <form onSubmit={handleSubmit}>
                {loginMessage && <h2>{loginMessage}</h2>}
                <div>
                    <label htmlFor="username">User name</label>
                    <input type="text" id="username" name="username" onChange={handleInputChange} value={formData.username} />
                </div>
                <div>
                    <label htmlFor="password">User password</label>
                    <input type="password" id="password" name="password" onChange={handleInputChange} value={formData.password} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
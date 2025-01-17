import axios from "axios";
import config from "../config";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import Cookies from 'js-cookie';
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

    const [isPasswordVisible, setisPasswordVisible] = useState(false);


    const handleToggle = () => {

        setisPasswordVisible(!isPasswordVisible);

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
            props.setUser(res.data)
            const user = JSON.stringify(res.data);
            let inOneHour = 1/24;
            Cookies.set('user', user, { expires: inOneHour, secure: true });
            if (res.data.error) {
                setLoginMessage(res.data.message)
            }
        })
            .catch((err) => {
                console.error(err);
                if (err.response.data.error) {
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
        <div className="formBackgroundAddClient"> 
            <div className="formContainer">
                {props.user && <Navigate to="/" />}
                <form onSubmit={handleSubmit}>
                    {loginMessage && <h2>{loginMessage}</h2>}
                    <div>
                        <label htmlFor="username">User name</label>
                        <input className='formFields' type="text" id="username" name="username" onChange={handleInputChange} value={formData.username} />
                    </div>
                    <div>
                        <label htmlFor="password">User password</label>
                        <span className="flex justify-around items-center" onClick={() => handleToggle("password")}>
                            <Icon className="absolute mr-10 icon" icon={!isPasswordVisible ? eyeOff : eye} size={25} />
                        </span>
                        <input className='formFields' type={isPasswordVisible ? "text" : "password"} id="password" name="password" onChange={handleInputChange} value={formData.password} />

                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>

    )
}

export default Login;
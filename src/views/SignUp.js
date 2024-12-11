import axios from "axios";
import config from "../config";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
const SignUp = () => {

    const [addedUser, setAddedUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [signUpMessage, setSignUpMessage] = useState('')

    const [signup, setSignup] = useState(false)
    const [type, setType] = useState({
        password: 'password',
        confirmPassword: 'password'
    });
    const [icon, setIcon] = useState({
        password: eyeOff,
        confirmPassword: eyeOff
    })

    const handleToggle = (e) => {
        console.log(e.target.parentElement.attributes.name)
        const target = e.target;
        const name = target.parentElement.attributes.name;
        if(name === 'password'){
            console.log('weszło1')
            if(type.password === 'password'){
                console.log('weszło2')
                setIcon({
                    ...icon,
                    [name]: eye,
                });
                setType({
                    ...type,
                    [name]: 'text',
                });
                
            } else {
                setIcon({
                    ...icon,
                    [name]: eyeOff,
                });
                setType({
                    ...type,
                    [name]: 'password',
                });
            }
        }
        if(name === 'confirmPassword'){
            if(type.confirmPassword === 'password'){
                setIcon({
                    ...icon,
                    [name]: eye,
                });
                setType({
                    ...type,
                    [name]: 'text',
                });
            } else {
                setIcon({
                    ...icon,
                    [name]: eyeOff,
                });
                setType({
                    ...type,
                    [name]: 'password',
                });
            }
        }
   
    }

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setAddedUser({
            ...addedUser,
            [name]: target.value,
        });
    };

    const saveUser = () => {

        axios
            .post(config.api.url + "/users/signup", {
                username: addedUser.username,
                email: addedUser.email,
                password: addedUser.password
            }, { mode: "cors" })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                let resData = res.data;

                if (resData.signedup) {
                    setSignUpMessage('Account created')
                    setSignup(true)
                } else {

                    if (resData.message.username) {
                        setSignUpMessage(resData.message.username[0])
                        setAddedUser({
                            username: resData.user.username,
                            email: resData.user.email,
                            password: resData.user.password,
                            confirmPassword: ""
                        });
                    } else if (resData.message.email) {
                        setSignUpMessage(resData.message.email[0])
                    }
                }

            })
            .catch((err) => {
                console.error(err);
            });

    };


    const resetForm = () => {
        setAddedUser({
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
        setErrors({
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
        setSignup(false);
    };

    useEffect(() => {
        return () => {
            resetForm()
        }
    }, [])

    const validateForm = (e) => {
        let validationErrors = {
            username: false,
            email: false,
            password: false,
            confirmPassword: false
        };

        if (addedUser.username.trim() === '') {
            validationErrors.username = true;

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    username: "Wpisz nazwę użytkownika.",
                };
            });
        } else if (addedUser.username.trim().length < 4) {
            validationErrors.username = true;

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    username: "Nazwa użytkownika musi mieć co najmniej 4 znaki.",
                };
            });
        } else if (/\s/.test(addedUser.username.trim())) {
            validationErrors.username = true;

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    username: "Nazwa użytkownika nie może zawierać pustych znaków.",
                };
            });
        } else {
            validationErrors.username = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    username: "",
                };
            });
        }



        if (addedUser.email.trim() === '') {
            validationErrors.email = true;

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    email: "Wpisz email.",
                };
            });
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(addedUser.email.trim())) {
            validationErrors.email = true;

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    email: "Wpisz poprawny email.",
                };
            });
        } else {
            validationErrors.email = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    email: "",
                };
            });
        }

        if (addedUser.password.trim() === '') {
            validationErrors.password = true;

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "Wpisz hasło.",
                };
            });
        } else if (!/^.{6,12}$/.test(addedUser.password.trim())) {
            validationErrors.password = true;

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "Hasło musi mieć od 6 do 12 znaków.",
                };
            });
        } else if (/\s/.test(addedUser.password.trim())) {
            validationErrors.password = true;

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "Hasło nie może zawierać pustych znaków.",
                };
            });
        } else if (!/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(addedUser.password.trim())) {
            validationErrors.password = true;

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "Hasło musi zawierać przynajmniej jeden znak specjalny.",
                };
            });
        } else if (!/^(?=.*[0-9]).*$/.test(addedUser.password.trim())) {
            validationErrors.password = true;

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "Hasło musi zawierać przynajmniej jedną cyfrę.",
                };
            });
        } else if (!/^(?=.*[A-Z]).*$/.test(addedUser.password.trim())) {
            validationErrors.password = true;

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "Hasło musi zawierać przynajmniej jedną wielką literę.",
                };
            });
        } else if (!/^(?=.*[a-z]).*$/.test(addedUser.password.trim())) {
            validationErrors.password = true;

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "Hasło musi zawierać przynajmniej jedną małą literę.",
                };
            });
        } else {
            validationErrors.password = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "",
                };
            });
        }

        if (addedUser.confirmPassword.trim() !== addedUser.password.trim()) {
            validationErrors.confirmPassword = true;

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    confirmPassword: "Powtórz poprawnie hasło.",
                };
            });
        } else {
            validationErrors.confirmPassword = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    confirmPassword: "",
                };
            });
        }

        return (
            validationErrors.username ||
            validationErrors.email ||
            validationErrors.password ||
            validationErrors.confirmPassword
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            return;
        }

        console.log('Użytkownik dodany')

        saveUser();
        resetForm();

    };


    return (
        <div className="singnupForm">
            {signup === true && <Navigate to="/users/login" />}
            <form onSubmit={handleSubmit}>
                {signUpMessage && <h2>{signUpMessage}</h2>}
                <div>
                    <label htmlFor="username">User name</label>
                    <input type="text" id="username" name="username" onChange={handleInputChange} value={addedUser.username} />
                </div>
                {errors.username && <p>{errors.username}</p>}
                <div>
                    <label htmlFor="email">User email</label>
                    <input type="email" id="email" name="email" onChange={handleInputChange} value={addedUser.email} />
                </div>
                {errors.email && <p>{errors.email}</p>}
                <div>
                    <label htmlFor="password">User password</label>
                    <input type={type.password} id="password" name="password" onChange={handleInputChange} value={addedUser.password} />
                    <span class="flex justify-around items-center" name="password" onClick={handleToggle}>
                  <Icon class="absolute mr-10" icon={icon.password} size={25} name="password"/>
              </span>
                </div>
                {errors.password && <p>{errors.password}</p>}
                <div>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input type={type.confirmPassword} id="confirmPassword" name="confirmPassword" onChange={handleInputChange} value={addedUser.confirmPassword} />
                    <span class="flex justify-around items-center" name="confirmPassword" onClick={handleToggle}>
                  <Icon class="absolute mr-10" icon={icon.confirmPassword} size={25} name="confirmPassword"/>
              </span>
                </div>
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUp;
import './AddActionForm.css'
import axios from "axios";
import config from "../config";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { pl } from 'date-fns/locale/pl';
import Select from "./Select";
import { X } from 'lucide-react';
registerLocale('pl', pl)

const AddActionForm = (props) => {
    const [date, setDate] = useState(new Date());
    const [actionType, setActionType] = useState({ key: '', val: '' })

    const choicesActions = [
        ['', '---'],
        ['telephone', 'Kontakt telefoniczny'],
        ['meeting', 'Spotkanie z klientem'],
        ['email', 'Kontakt e-mail']
    ]

    const modalRef = useRef()

    const closeModal = (e) =>{
        console.log(modalRef.current)
            console.log(e.target)
        if(modalRef.current === e.target){
            
            props.setShowModal(false)
        }
    }
    const handleChangeAction = (e) => {
        setActionType({
            key: e.target.value,
            val: e.target.options[e.target.selectedIndex].innerText
        })
        handleInputChangeAction(e)

    }

    const handleChangeDate = (date) => {
        setDate(date);
        handleInputChangeDate(date)

    }

    const params = useParams();
    const id = params.id;



    const [addedAction, setAddedAction] = useState({
        date: "",
        actionType: "",
        description: "",
        specificClient: ""
    });

    const [errors, setErrors] = useState({
        date: "",
        actionType: "",
        description: "",
    })

    const handleClientChange = () => {

        setAddedAction({
            ...addedAction,
            specificClient: id,
        });

    };

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setAddedAction({
            ...addedAction,
            [name]: target.value,
        });

    };

    const handleInputChangeAction = (e) => {
        const target = e.target;
        const options = target.options
        setAddedAction({
            ...addedAction,
            actionType: options[target.selectedIndex].innerText,
        });

    }

    const handleInputChangeDate = (newDate) => {

        setAddedAction({
            ...addedAction,
            date: newDate,
        });

    }


    useEffect(() => {
        if (id) {

            handleClientChange()
        }

        return () => {
            resetForm()
        }
    }, [id]);
    // useEffect(() => {
    //     getSingleClient();
    // }, [])

    const saveAction = (actionObj) => {
        console.log('test');
        axios
            .post(config.api.url + "/actions/add", actionObj, { mode: "cors" })
            .then((res) => {
                console.log(res);
                console.log(props);
                props.setShowModal(false)
                props.getSingleClient()
            })
            .catch((err) => {
                console.error(err);
            });
            

    };


    const resetForm = () => {
        setAddedAction({
            date: "",
            actionType: "",
            description: "",
            specificClient: ""
        });
        setErrors({
            date: "",
            actionType: "",
            description: "",
        });
    };

    const validateForm = (e) => {
        let validationErrors = {
            date: false,
            actionType: false,
            description: false,
        };

        if (addedAction.date.toString().trim() === '') {
            validationErrors.date = true;

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    date: "Wybierz datę.",
                };
            });
        } else {
            validationErrors.date = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    date: "",
                };
            });
        }

        if (addedAction.actionType.trim() === '') {
            validationErrors.actionType = true;

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    actionType: "Wybierz akcję.",
                };
            });
        } else {
            validationErrors.actionType = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    actionType: "",
                };
            });
        }

        if (addedAction.description.trim() === '') {
            validationErrors.description = true;

            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    description: "Dodaj opis.",
                };
            });
        } else {
            validationErrors.description = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    description: "",
                };
            });
        }
        return (
            validationErrors.date ||
            validationErrors.actionType ||
            validationErrors.description
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            return;
        }

        console.log('Akcja zapisana')
        saveAction(addedAction);     
        resetForm();

    };

    
    const height = (e) => {
        let scHeight = e.target.scrollHeight;
        console.log(scHeight)
        e.target.style.height = `${scHeight}px`
    }

    return (
        <div ref={modalRef} className="formBackground" onClick={closeModal}>
            <div className="modalContainer">
                <span className='closeX' onClick={()=> props.setShowModal(false)}><X /></span>
                <div className="formContainer">
                    <form onSubmit={handleSubmit}>
                        <div className="wrapper">
                            <label htmlFor="date">Data</label>
                            <DatePicker wrapperClassName="datepicker" className='formFields' dateFormat='dd-MM-yyyy' locale="pl" id="date" name="date" selected={date} onChange={handleChangeDate} />
                        </div>
                        {errors.date && <p>{errors.date}</p>}
                        <div>
                            <label htmlFor="actiontype">Typ akcji</label>
                            <Select  values={choicesActions} selectedValue={actionType.key} OnValueChange={handleChangeAction} name="actionType" />
                        </div>
                        {errors.actionType && <p>{errors.actionType}</p>}
                        <div>
                            <label htmlFor="description">Opis</label>
                            <textarea onKeyUp={height} className='formFields' type="text" id="description" name="description" value={addedAction.description} onChange={handleInputChange}></textarea>
                        </div>
                        {errors.description && <p>{errors.description}</p>}
                        <div>
                            <button type="submit" onChange={handleInputChange}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default AddActionForm; 

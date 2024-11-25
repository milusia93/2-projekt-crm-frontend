import axios from "axios";
import config from "../config";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SingleClientTable from "../components/SingleClientTable";
import AddActionForm from "../components/AddActionForm";

const AddAction = (props) => {
    const params = useParams();
    const id = params.id;

    const [singleClient, setSingleClient] = useState({
        name: "",
        address: {
            street: "",
            zipCode: "",
            city: "",
        },
        nip: "",
    });

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
        console.log(addedAction)
    };

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setAddedAction({
            ...addedAction,
            [name]: target.value,
        });
        console.log(addedAction)
        console.log(id)
    };

    const handleInputChangeAction = (e) => {
        const target = e.target;
        const options = target.options
        setAddedAction({
            ...addedAction,
            actionType: options[target.selectedIndex].innerText,
        });
        console.log(target)
    }

    const handleInputChangeDate = (newDate) => {

        setAddedAction({
            ...addedAction,
            date: newDate,
        });
        console.log(addedAction)
    }

    const getSingleClient = () => {
        axios
            .get(`http://localhost:3005/clients/${id}`)
            .then((res) => {
                setSingleClient(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        if (id) {
            getSingleClient();
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
        console.log(actionObj)
        axios
            .post(config.api.url + "/actions/add", actionObj, { mode: "cors" })
            .then((res) => {
                console.log(res);
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
        console.log(addedAction)
        if (validateForm()) {
            return;
        }
       
        console.log('Akcja zapisana')
        saveAction(addedAction);
        resetForm();

    };

    return (
        <div>
            <div className="tableContainer">
                <SingleClientTable client={singleClient} />
            </div>
            <div className="formContainer">
                <AddActionForm handleSubmit={handleSubmit} errors={errors} handleInputChange={handleInputChange} addedAction={addedAction} handleInputChangeAction={handleInputChangeAction} handleInputChangeDate={handleInputChangeDate} />
            </div>
        </div>

    )
}

export default AddAction;
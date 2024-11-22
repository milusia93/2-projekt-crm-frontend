import axios from "axios";
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

    // const [addedAction, setAddedAction] = useState({
    //     date: "",
    //     actionType: "",
    //     description: "",
    // });
    
    // const [errors, setErrors] = useState({
    //     date: "",
    //     actionType: "",
    //     description: "",
    // })

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
        }

        return () => {
            resetForm()
        }
    }, [id]);

    const resetForm = () => {
        setSingleClient({
            name: "",
            address: {
                street: "",
                zipCode: "",
                city: "",
            },
            nip: "",
        });
    };
    return (
        <div>
            <div className="tableContainer">
                <SingleClientTable client={singleClient} />
            </div>
            <div className="formContainer">
                <AddActionForm />
            </div>
        </div>

    )
}

export default AddAction;
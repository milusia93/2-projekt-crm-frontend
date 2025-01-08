import './SingleClient.css'
import axios from "axios";
import config from "../config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SingleClientTable from "../components/SingleClientTable";
import ActionsTable from "../components/ActionsTable";
import AddActionForm from "../components/AddActionForm";


const SingleClient = () => {
    const [client, setClient] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const params = useParams();
    const id = params.id
    // console.log(id);

    const getSingleClient = () => {


        axios.get(`http://localhost:3005/clients/${id}`)
            .then((res) => {
                setClient(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        getSingleClient();

    }, [id])

    const deleteAction = (actionId) => {
        if(window.confirm('Usunąć Akcję?')){
            axios
                .delete(config.api.url + '/actions/delete/' + actionId, {mode: 'cors'})
                .then((res)=>{
                    console.log(res)
                    getSingleClient();
                })
                .catch((err)=> {
                    console.error(err)
                })
        }
    }

    // return <h2>Show details</h2>;
    return (
        <div className="tableContainer">
            <div>
                <SingleClientTable client={client} />
            </div>

            <div>
                <ActionsTable client={client} deleteAction={deleteAction}/>
            </div>
            <div>
                <button onClick={()=> setShowModal(true)}>Dodaj Akcję</button>
            </div>
            {showModal  && <div >  
                <AddActionForm setShowModal={setShowModal} getSingleClient={getSingleClient}/>
            </div>}
           
        </div>
    )
}

export default SingleClient;
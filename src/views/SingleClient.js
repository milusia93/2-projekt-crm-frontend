import axios from "axios";
import config from "../config";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import SingleClientTable from "../components/SingleClientTable";
import ActionsTable from "../components/ActionsTable";

const SingleClient = () => {
    const [client, setClient] = useState(null)
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

    }, [])

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
                <Link className='btn edit' to={`/clients/addaction/${client?._id}`}>Dodaj Akcję</Link>
            </div>
        </div>
    )
}

export default SingleClient;
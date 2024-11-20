import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import SingleClientTable from "../components/SingleClientTable";

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


    // return <h2>Show details</h2>;
    return (
        <div className="tableContainer">
            <SingleClientTable client={client}/>
            <div>
            <Link className='btn edit' to={`/clients/addaction/${client?._id}`}>Dodaj Akcję</Link>
            </div>
        </div>
    )
}

export default SingleClient;
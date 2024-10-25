import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SingleClientTable from "../components/SingleClientTable";

const SingleClient = () => {
    const [client, setClient] = useState([])
    

    const getSingleClient = () => {
        axios.get('http://localhost:3005/clients/:id')
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
    console.log(client);
    
    return <h2>Show details</h2>;
    // return (
    //     <div className="tableContainer">
    //         <SingleClientTable client={client}/>
    //     </div>
    // )
}

export default SingleClient;
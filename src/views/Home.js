import axios from "axios";
import { useEffect, useState } from "react";
import ClientsTable from "../components/ClientsTable";

const Home = () => {
    const [clients, setClients] = useState([])

    const getAllClients = () => {
        axios.get('http://localhost:3005/clients')
            .then((res) => {
                setClients(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    useEffect(() => {
        getAllClients();
    }, [])
    
    return (
        <div className="tableContainer">
            <ClientsTable clients={clients}/>
        </div>
    )
}

export default Home;
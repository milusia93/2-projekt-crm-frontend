import axios from "axios";
import config from "../config";
import { useEffect, useState } from "react";
import ClientsTable from "../components/ClientsTable";


const Home = () => {
    const [clients, setClients] = useState([])

    const getAllClients = () => {
        axios.get(config.api.url + '/clients')
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

    const deleteClient = (clientId) => {
        if(window.confirm('Usunąć Klienta?')){
            axios
                .delete(config.api.url + '/clients/delete/' + clientId, {mode: 'cors'})
                .then((res)=>{
                    console.log(res)
                    getAllClients()
                })
                .catch((err)=> {
                    console.error(err)
                })
        }
    }

    
    
    return (
        <div className="tableContainer">
            <ClientsTable clients={clients} deleteClient={deleteClient} />
        </div>
    )
}

export default Home;
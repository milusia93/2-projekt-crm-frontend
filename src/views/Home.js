import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../components/Table";

const Home = () => {
    const [clients, setClients] = useState([])

    useEffect(() => {
        getAllClients();
    }, [])

    const getAllClients = () => {
        axios.get('http://localhost:3005/clients')
            .then((res) => {
                setClients(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <div className="tableContainer">
            <Table clients={clients}/>
        </div>
    )
}

export default Home;
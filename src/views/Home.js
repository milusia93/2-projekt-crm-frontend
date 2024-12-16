import axios from "axios";
import config from "../config";
import { useEffect, useState } from "react";
import ClientsTable from "../components/ClientsTable";



const Home = () => {
    const [clients, setClients] = useState([])
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    
    const getAllClients = () => {
        axios.get(config.api.url + `/clients?page=${page}`)
            .then((res) => {
                setClients(res.data.data)
                setPageCount(res.data.pages)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const handlePrevious = () => {
        setPage((p) => {
            if (p === 1) return p;
            return p - 1;
        });
    }

    const handleNext = () => {
        setPage((p) => {
            if (p === pageCount) return p;
            return p + 1;
        });
    }


    useEffect(() => {
        getAllClients();
    }, [page])

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
            <ClientsTable clients={clients} page={page} handleNext={handleNext} handlePrevious={handlePrevious} deleteClient={deleteClient} />
        </div>
    )
}

export default Home;
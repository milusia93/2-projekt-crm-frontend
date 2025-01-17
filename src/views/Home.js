import axios from "axios";
import config from "../config";
import { useEffect, useState } from "react";
import ClientsTable from "../components/ClientsTable";



const Home = () => {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [limit, setLimit] = useState(0)
    const [sortState, setSortState] = useState("ascending");
    const [sortCategory, setSortCategory] = useState("name");
    


    const getAllClients = async () => {
        setLoading(true);
        await axios.get(config.api.url + `/clients?page=${page}&direction=${sortState}&category=${sortCategory}`)
            .then((res) => {
                setClients(res.data.data)
                console.log(res.data.data)
                setPageCount(res.data.pages)
                setLimit(res.data.limit)
            })
            .catch((err) => {
                console.error(err)
            })
        setLoading(false);
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
    }, [page, sortState, sortCategory])

    const deleteClient = (clientId) => {
        if (window.confirm('Usunąć Klienta?')) {
            axios
                .delete(config.api.url + '/clients/delete/' + clientId, { mode: 'cors' })
                .then(() => {
                    getAllClients()
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }
    const paginate = (pageNumber) => setPage(pageNumber)



    return (
        <div className="main">
        <select defaultValue={'DEFAULT'} onChange={(e) => {setSortState(e.target.value.split(',')[0]);
            setSortCategory(e.target.value.split(',')[1]); console.log(sortState)} 
        }>
          <option value="ascending,name" disabled>None</option>
          <option value="ascending,name" >Ascending name</option>
          <option value="descending,name" >Descending name</option>
          <option value="ascending,address.city" >Ascending city</option>
          <option value="descending,address.city" >Descending city</option>
        </select>
        <div className="tableContainer">
            <ClientsTable limit={limit} paginate={paginate} clients={clients} pageCount={pageCount} loading={loading} page={page} handleNext={handleNext} handlePrevious={handlePrevious} deleteClient={deleteClient} />
        </div>
      </div>
     
    )
}

export default Home;
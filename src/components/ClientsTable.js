
import { Link } from 'react-router-dom';
import './ClientsTable.css';

const ClientsTable = (props) => {
    
    return (
        <div className='tableWrapper'>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nazwa</th>
                    <th>Adres</th>
                    <th>NIP</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                {props.clients.map((client, index)=> {
                    return (
                        <tr key={client._id}>
                            <td>{index}</td>
                            <td>{client.name}</td>
                            <td>{client.address.city}, {client.address.zipCode}, {client.address.street}</td>
                            <td>{client.nip}</td>
                            <td>
                                <Link className='btn edit' to={`/clients/edit/${client._id}`}>Edytuj</Link>
                                <Link className='btn showMore' to={`clients/${client._id}`}>Zobacz więcej</Link>
                                <button className='btn delete' onClick={()=>{props.deleteClient(client._id)}}>Usuń</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            <tfoot>
                <button disabled= {props.page === 1} onClick={props.handlePrevious}>Previous</button>
                <button onClick={props.handleNext}>Next</button>
            </tfoot>
        </table>
        <Link className='btn add' to={`/clients/add`}>Dodaj Klienta</Link>
        </div>
        
    )
}
export default ClientsTable;
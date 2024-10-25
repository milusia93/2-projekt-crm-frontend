
import { Link } from 'react-router-dom';
import './ClientsTable.css';

const ClientsTable = (props) => {
    
    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Imię i nazwisko</th>
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
                                <button className='edit'>Edytuj</button>
                                <Link className='showMore' to={`clients/${client._id}`}>Zobacz więcej</Link>
                                <button className='delete'>Usuń</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
export default ClientsTable;
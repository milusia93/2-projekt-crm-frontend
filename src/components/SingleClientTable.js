
import './ClientsTable.css';

const SingleClientTable = (props) => {
    
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
                
                   
                        {/* <tr key={client._id}>
                            <td>{index}</td>
                            <td>{client.name}</td>
                            <td>{client.address.city}, {client.address.zipCode}, {client.address.street}</td>
                            <td>{client.nip}</td>
                       
                        </tr> */}
                    
                
            </tbody>
        </table>
    )
}
export default SingleClientTable;
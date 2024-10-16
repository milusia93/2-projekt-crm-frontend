import './Table.css';

const Table = (props) => {
    
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
                                <button className='showMore'>Zobacz więcej</button>
                                <button className='delete'>Usuń</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
export default Table;
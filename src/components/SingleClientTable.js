
// import './SingleClientTable.css';

const SingleClientTable = (props) => {

    return (
        <table>
            <tbody>
                <tr>
                    <th>Nazwa</th>
                    <td>{props.client?.name}</td>
                </tr>
                <tr>
                    <th>Adres</th>
                    <td>{props.client?.address.city}, {props.client?.address.zipCode}, {props.client?.address.street}</td>
                </tr>
                <tr>
                    <th>NIP</th>
                    <td>{props.client?.nip}</td>
                </tr>
                <tr>
                    <th>Akcje</th>
                    <td></td>
                </tr>
            </tbody>
        </table>
    )
}
export default SingleClientTable;
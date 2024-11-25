import { Link } from 'react-router-dom';
const ActionsTable = (props) => {

    return (
        <div className="tableWrapper">
            <table> 
            <thead>
                <tr>
                    <th>#</th>
                    <th>Data</th>
                    <th>Typ Akcji</th>
                    <th>Opis</th>
                    <th>Usuń/Edytuj</th>
                </tr>
            </thead>
            <tbody>
                {props.client?.actions.map((action, index)=> {
                    return (
                        <tr key={action._id}>
                            <td>{index}</td>
                            <td>{action.date}</td>
                            <td>{action.actionType}</td>
                            <td>{action.description}</td>
                            <td>
                                <Link className='btn edit' to={`/clients/edit/${props.client?._id}`}>Edytuj</Link>
                                <Link className='btn showMore' to={`clients/${props.client?._id}`}>Zobacz więcej</Link>
                                <button className='btn delete' onClick={()=>{props.deleteAction(action._id)}}>Usuń</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
        </div>
    )
}

export default ActionsTable;
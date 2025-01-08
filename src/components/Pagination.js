
import './Pagination.css'
const Pagination = (props) => {
    const pageNumbers = []

for(let i = 1; i <= props.pageCount; i++){
    pageNumbers.push(i)
}

    return (
       <nav className="pagination">
        <ul className="pagination">
            {pageNumbers.map(number => (
                <li className="noMarker" key={number} >
                    <button className="pageItem pageNumber pageLink" onClick={() => props.paginate(number)}  >
                        {number}
                    </button>
                </li>
            ))}
        </ul>
       </nav>
    )
}
export default Pagination;

const Pagination = (props) => {
    const pageNumbers = []

for(let i = 1; i <= props.pageCount; i++){
    pageNumbers.push(i)
}

    return (
       <nav className="pagination">
        <ul className="pagination">
            {pageNumbers.map(number => (
                <li key={number} className="pageItem pageNumber">
                    <a onClick={() => props.paginate(number)}  className="pageLink">
                        {number}
                    </a>
                </li>
            ))}
        </ul>
       </nav>
    )
}
export default Pagination;
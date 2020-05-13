import React from 'react'
import '../Pagination/Pagination.css'
import {Link} from 'react-router-dom'


interface PaginationProps {
    pageNumbers: number[]
    totalTodos: number
    todosPerPage: number
    currentPage: number
    paginate(pageNum: number): void
    nextPage(): void
    prevPage(): void
    location?: {
        hash: string
        pathname: string
        search: string
    };
}

const Pagination: React.FC<PaginationProps> = (props: PaginationProps) => {

    const {pageNumbers, todosPerPage, totalTodos, paginate, nextPage, prevPage, location, currentPage} = props;
    for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
        pageNumbers.push(i);
    }

    // const search: any = location?.search
    // const parsed = queryString.parse(search)
    //console.log(parsed.page);
    //const pathname: string = queryString(location?.pathname);
    // console.log('this.props queryString --: ', pathname);
    //console.log('this.props queryString --: ', typeof queryString);

    return(
        <nav>
            <ul className="pagination justify-content-center pag">
                 <li className="page-item ">
                    <a className="page-link" href='#' onClick={() => prevPage()}>Previous</a>
                </li>

                {pageNumbers.map(num => (
                    <li className="page-item" key={num}>
                       <Link to = {`${location?.pathname}?page=${num}`} onClick={() => paginate(num)} className="page-link">{num}</Link>
                        </li>
                        
                    ))}

                <li className="page-item">
                <Link to = {`${location?.pathname}?page=${currentPage}`} className="page-link"  onClick={() => nextPage()}>Next</Link>
                </li>
            </ul>

        </nav>
    )
}

export default Pagination




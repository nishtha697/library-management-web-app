import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBooksThunk } from "../../services/books-thunks.js";

const Home = () => {

    const dispatch = useDispatch();

    const { allBooks, loading } = useSelector(state => state.booksData)

    useEffect(() => {
        dispatch(getAllBooksThunk())
    }, [])


    return (
        <div>
            {loading && <li className="list-group-item"> Loading... </li>}
                <div className="row mx-auto align-items-stretch">
                    <div className="mb-2 text-muted">Total Books: {allBooks.length}</div>

                    {allBooks
                        .map((book, idx) => <div className="col" key={idx}>
                            <div className="card" style={{ height: "400px", minWidth: "300px", maxWidth: "400px", border: "0px" }}>
                                <img src={book.book_image} className="card-img-top" style={{ height: "200px", width: "auto" }} alt={book.title} />
                                <div className="card-body">
                                    <Link
                                        className="wd-user"
                                        to={`/books/${book.isbn}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <h6 className="card-title" style={{ maxHeight: "80px", overflow: "hidden" }}>{book.title}</h6>
                                        <p className="card-text"><small className="text-muted">Author: {book.author}</small></p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        )}
                </div>
        </div>
    );
}

export default Home;
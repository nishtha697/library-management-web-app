import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "antd/es/card/Card";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotReturnedBooksThunk,
  getAllTransactionsForUser,
  markBookAsReturnedThunk,
} from "../../services/loan-thunks.js";
import { getAllBooksThunk } from "../../services/books-thunks.js";

const Loans = () => {
  const [loading, setLoading] = useState(false);
  const [allLoanBooks, setLoanBooks] = useState([]);
  const { profile } = useSelector((state) => state.user);
  const { loan, transaction } = useSelector((state) => state.loanData);
  const { allBooks } = useSelector((state) => state.booksData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotReturnedBooksThunk(profile.username));
    dispatch(getAllTransactionsForUser(profile.username));
    dispatch(getAllBooksThunk());

    let arr = [];

    allBooks.forEach((b) => {
      if (loan.find((bk) => bk === b.isbn)) {
        arr.push(b);
      }
    });

    setLoanBooks(arr);
  }, []);

  const handleReturnBook = (isbn) => {
    transaction.forEach((t) => {
      let arr = t.allUnreturnedBooks;
      arr.forEach((b) => {
        if (b === isbn) {
          dispatch(
            markBookAsReturnedThunk({ transactionId: t.transactionId, isbn: b })
          );
        }
      });
    });
  };

  return (
    <div>
      {loading && <li className="list-group-item"> Loading... </li>}
      <div className="row mx-auto align-items-stretch">
        <div className="mb-2 text-muted">
          Total Books: {allLoanBooks.length}
        </div>

        {allLoanBooks.length > 0 &&
          allLoanBooks.map((book, idx) => (
            <div className="col" key={idx}>
              <Card style={{ minWidth: "200px", maxWidth: "300px" }}>
                <img
                  src={book.image}
                  className="card-img-top"
                  style={{ height: "300px", width: "auto" }}
                  alt={book.name}
                />
                <div className="card-body">
                  {/* <Link
                  className="wd-user"
                  to={`/books/${book.isbn}`}
                  style={{ textDecoration: "none" }}> */}
                  <h6
                    className="card-title mt-2"
                    style={{ maxHeight: "80px", overflow: "hidden" }}>
                    {book.name}
                  </h6>
                  <p
                    className="card-text"
                    style={{ maxHeight: "70px", overflow: "hidden" }}>
                    <small className="text-muted">{book.description}</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Author: {book.authorName}
                    </small>
                  </p>

                  <Button
                    onClick={() => handleReturnBook(book.isbn)}
                    type="primary">
                    Return Book
                  </Button>
                  {/* </Link> */}
                </div>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Loans;

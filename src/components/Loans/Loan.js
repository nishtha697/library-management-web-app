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

let booksData = [
  {
    isbn: 9780132350884,
    name: "Clean Code: A Handbook of Agile Software Craftsmanship",
    description:
      "This book provides practical advice and examples for writing clean, maintainable, and readable code.",
    image:
      "https://m.media-amazon.com/images/I/41xShlnTZTL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
    inventory: 20,
    authorName: "Robert C. Martin",
  },
  {
    isbn: 9780321125217,
    name: "The Pragmatic Programmer",
    description:
      "A classic on software development and craftsmanship, this book gives practical advice on how to write better software and work well in a team.",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/41uPjEenkFL._SX385_BO1,204,203,200_.jpg",
    inventory: 50,
    authorName: "Andrew Hunt, David Thomas",
  },
  {
    isbn: 9781491978917,
    name: "Python for Data Analysis: Data Wrangling with Pandas, NumPy, and IPython",
    description:
      "This book provides an introduction to data analysis with Python, covering the Pandas and NumPy libraries, IPython, and Jupyter notebooks.",
    image:
      "https://m.media-amazon.com/images/I/51HuYEwAl2L._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
    inventory: 15,
    authorName: "Wes McKinney",
  },
  {
    isbn: 9781593275846,
    name: "Eloquent JavaScript: A Modern Introduction to Programming",
    description:
      "This book provides an introduction to programming with JavaScript, covering the language itself and the basics of web development.",
    image: "https://m.media-amazon.com/images/I/91asIC1fRwL.jpg",
    inventory: 30,
    authorName: "Marijn Haverbeke",
  },
];

const Loans = () => {
  const [loading, setLoading] = useState(false);
  const { profile } = useSelector((state) => state.user);
  const { loan, transaction } = useSelector((state) => state.loanData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotReturnedBooksThunk(profile.username));
    dispatch(getAllTransactionsForUser(profile.username));
  }, []);

  const handleReturnBook = (isbn) => {
    console.log("loan data is: " + isbn);
    transaction.forEach((t) => {
      for (let key in t) {
        console.log(" key is: " + key + ", value is: " + t[key]);
      }
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
        <div className="mb-2 text-muted">Total Books: {booksData.length}</div>

        {loan.map((book, idx) => (
          <div className="col" key={idx}>
            <Card style={{ minWidth: "200px", maxWidth: "300px" }}>
              <img
                src={book.image}
                className="card-img-top"
                style={{ height: "300px", width: "auto" }}
                alt={book.title}
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
                  <small className="text-muted">Author: {book}</small>
                </p>

                <Button onClick={() => handleReturnBook(book)} type="primary">
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

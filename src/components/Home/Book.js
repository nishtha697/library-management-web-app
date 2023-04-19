import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getBookByIsbnThunk} from "../../services/books-thunks";
import {useDispatch, useSelector} from "react-redux";
// import {shoppingCartAddBookThunk} from "../../services/cart-thunks";
import {toast, ToastContainer} from "react-toastify";

// Reload the book using api call to have up to date inventory
const Book = () => {

    const dispatch = useDispatch()
    const {isbn} = useParams()

    let {currentBook} = useSelector(state => state.booksData);
    const [book, setBook] = useState({...currentBook})

    const {profile, type} = useSelector(state => state.user);
    const isLoggedIn = () => profile && Object.keys(profile).length > 0 && type;

    useEffect(() => {
        dispatch(getBookByIsbnThunk(isbn))
    }, [])

    useEffect(() => {
        setBook({...currentBook})
    }, [currentBook])

    const handleAddToCart = () => {
        //TODO: Thunks
        // dispatch(shoppingCartAddBookThunk(
        //     {
        //         username: profile.username,
        //         book: {
        //             bookId: book.book_id,
        //             quantity: quantity
        //         }
        //     }))
        toast.success("Book successfully added to Shopping cart!", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
        });
    }

    return (<div className="container">
            {!book ? <li className="list-group-item"> Loading... </li>
                   : <div className="card-body">


                 {/* Title */}
                 <h4 className="card-title mb-2">{book.title}</h4>

                 {/* Book Tags & Author */}
                 <div className="mb-3">
                     {/*{book.category && book.category*/}
                     {/*    .filter(c => c !== 'Other')*/}
                     {/*    .map(c =>*/}
                     {/*        <span key={c}*/}
                     {/*            style={{ background: "coral" }}*/}
                     {/*            className="badge badge-pill badge-warning me-3 mb-2"*/}
                     {/*        >*/}
                     {/*            {c}*/}
                     {/*        </span>*/}
                     {/*    )}*/}
                     {isLoggedIn() && type === "buyer" && <p className="card-text text-muted">Sold
                         by {book.authorName}</p>}
                 </div>


                 {/* Image */}
                 {book.image &&
                  <div className="mb-3">
                      <img
                          src={book.image}
                          style={{width: "auto", height: "300px"}}
                          className="card-img-top mt-2 mb-1"
                          alt={book.title}
                      />
                  </div>
                 }

                 {/* Description */}
                 <div className="mb-3">
                     <h5>Description</h5>
                     <p className="card-text">{book.description}</p>
                 </div>

                 {/* Highlights */}
                 <div className="mb-3">
                     <h5>Highlights</h5>
                     <p className="card-text">{book.highlights}</p>

                 </div>


                 {/* Add to Cart */}
                 <div className="mb-3">
                     <button className="btn btn-outline-success" style={{display: "inline"}}
                             disabled={!isLoggedIn()} onClick={handleAddToCart}>
                         Add to Cart (Loan)
                     </button>
                     {!isLoggedIn() && <div><i style={{color: "red"}}>Login to loan book</i></div>}
                 </div>


                 {/* Stock Level */}
                 <div className="mb-3">
                     <h5>Inventory Level</h5>
                     <p className="card-text text-muted">{book.inventory} qty</p>
                 </div>
                 }

                 <br/>

             </div>
            }
            <ToastContainer/>
        </div>
    )

}

export default Book;
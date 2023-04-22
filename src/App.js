import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { useSelector } from "react-redux";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from "./components/Login/Login.js";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home.js";
import Book from "./components/Home/Book.js";
import Cart from "./components/Cart/Cart";
// import Profile from "./components/Profile/Profile";
// import Cart from "./components/Cart/Cart";


function App() {

    const user = useSelector(state => state.user)
    return (
        <div style={{ width: "100%" }}>
            <BrowserRouter>
                <Navbar />
                <div className="m-5" style={{ minHeight: "50vh" }}>
                    <Routes>
                        <Route path="/books/:isbn" element={<Book />} />
                        <Route index element={<Home />} />
                        <Route path="/cart" element={<div><Cart /></div>} />
                        <Route path="/loans" element={<div>TODO LOANS</div>} />
                        <Route path="/returns" element={<div>TODO RETURNS</div>} />
                        <Route path="/profile" element={<div>TODO PROFILE</div>} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<div>INVALID PAGE</div>} />
                    </Routes>
                </div>
            </BrowserRouter>

        </div>
    );
}

export default App;
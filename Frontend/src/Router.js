import React from 'react';
import { Route, Routes } from 'react-router-dom';

//import Navbar from './components/Navbar';
import Home from './components/Home';
//import Footer from './components/Footer';
import AddProduct from './components/Product/AddProduct';
import Products from './components/Product/Products';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Cart from './components/Cart/Cart';

const PrivateRoute = (props) => {
    const token = localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : null;
    if (token) {
        return <Route exact={true} path={props.path} element={props.component} />
    } else {
        return <Login {...props} />
    }
}

const Router = (props) => {
    return (
        <Routes>
            {
                ["/home", "/"].map((path, i) => (
                    <Route exact path={path} element={<Home />} key={i} />
                ))
            }
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Register" element={<Register />} />

            <PrivateRoute path="/AddProduct" element={<AddProduct />} />
            <PrivateRoute path="/Cart" element={<Cart />} />

        </Routes>
    )
}

export default Router;
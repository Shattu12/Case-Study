import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
//import Router from './Router';
import Home from './components/Home';
import AddProduct from './components/Product/AddProduct';
import Products from './components/Product/Products';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Cart from './components/Cart/Cart';
import PaymentApp from './components/PaymentApp';
//import "./assets/css/style.css";
//import "./assets/css/responsive.css";
//import { useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(localStorage.getItem("profile") ? JSON.parse(localStorage.getItem("profile")) : null);
  //const [isLogedin, setIsLogedin] = useState(user ? false : true);

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <div className='main_content'>
          {/* <Router /> */}
          <Routes>
            {["/home", "/"].map((path, i) => (
              <Route exact path={path} element={<Home />} key={i} />
            ))
            }
            {user && (
              <>
                <Route exact path="/AddProduct" element={<AddProduct />} />
                <Route exact path="/Cart" element={<Cart />} />
                <Route exact path="/checkout" element={<PaymentApp />} />
              </>
            )}
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import CartItem from "./CartItem";
import EmptyCart from "../../assets/images/empty_cart.png";

const Cart = () => {
    const [items, setItems] = useState([]);
    const [address, setAddress] = useState();
    const user = JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        GetCartItems();
    }, [])

    const GetCartItems = () => {
        user && fetch('http://localhost:8093/api/user/cart/' + user.id)
            .then(response => response.json())
            .then(data => {
                setItems(data);
                console.log(data);
            });
    }
    const TotalPrice = (items) => {
        //console.log("Total");
        const saloTotal = items.reduce((AlltotalPrice, m) => AlltotalPrice + parseInt(m.totalPrice), 0);
        //console.log(saloTotal);
        return (saloTotal);
    }
    const Checkout = () => {
        if (address && address !== "") {
            const isConfirm = window.confirm("Do you want to continue for checkout..");
            if (isConfirm) {
                //console.log(address);
                localStorage.removeItem("OrderAddress");
                localStorage.setItem("OrderAddress", address);
                window.location.href = "/checkout";
            }
        } else {
            alert("Please enter shipping address to continue !");
        }
    }
    const AddToCart = (product) => {
        user && fetch('http://localhost:8093/api/user/cart/add/' + user.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
            .then(response => response.json())
            .then((data) => {
                //console.log(data);
                //alert("Item sucsessfully added to cart");
                window.location.href = "/Cart";
                //GetCartItems();
            })
            .catch((error) => {
                console.log({ error });
            });
    }
    const RemoveFromCart = (product) => {
        console.log(product);

        user && fetch('http://localhost:8093/api/user/cart/remove/' + user.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
            .then(response => response.json())
            .then((data) => {
                //console.log(data);
                //alert("Item sucsessfully added to cart");
                window.location.href = "/Cart";
                //GetCartItems();
            })
            .catch((error) => {
                console.log({ error });
            });
    }
    const DeleteFromCart = (product) => {
        console.log(product);

        user && fetch('http://localhost:8093/api/user/cart/removeItem/' + user.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
            .then(response => response.json())
            .then((data) => {
                //console.log(data);
                //alert("Item sucsessfully added to cart");
                window.location.href = "/Cart";
                //GetCartItems();
            })
            .catch((error) => {
                console.log({ error });
            });
    }

    return (
        <div className='container-fluid'>
            <div className="shopping--cart" >
                <div className="container">
                    <div className="shopping--cart--container">
                        <div className="row ">
                            <div className="col text-center">
                                <div className="section_title new_arrivals_title" >
                                    <h2>Your Shopping Cart</h2>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="col-lg-9" data-aos="fade-up">
                                {/* <CartItem items={items || {}} /> item.status != "Payment Done" && */}
                                {items && items.map((item, index) => (
                                    <CartItem item={item} key={index} AddToCart={AddToCart} RemoveFromCart={RemoveFromCart} DeleteFromCart={DeleteFromCart} />
                                ))}
                            </div>
                            {items ? (
                                <div className="col-lg-3 bg-light p-3" >
                                    <div class="mb-3">
                                        <label for="itemDesc" class="form-label">Shipping Address</label>
                                        <textarea class="form-control" required name='address' id="address" rows="3" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                                    </div>
                                    <div className="d-flex flex-column justify-content-end align-items-end">
                                        <p>
                                            Shipping : <span style={{ color: "#FE4C50" }}>Free</span>
                                        </p>
                                        <h3 style={{ textAlign: "center" }}>
                                            Total:
                                            <span style={{ color: "#FE4C50" }}>
                                                ₹ {items ? TotalPrice(items) : 0}
                                            </span>
                                        </h3>
                                        <hr />

                                        <button onClick={Checkout} className='btn btn-success' >
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ textAlign: "center" }}>
                                    <img
                                        src={EmptyCart}
                                        alt=""
                                        style={{ maxHeight: 400, maxWidth: 400 }}
                                        className="img-fluid"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart

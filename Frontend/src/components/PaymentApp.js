import React, { useState, useRef, useEffect } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

const PaymentApp = () => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");
  const { id } = JSON.parse(localStorage.getItem("profile"));
  const address = localStorage.getItem("OrderAddress") ? localStorage.getItem("OrderAddress") : "";

  useEffect(() => {
    ref.current.focus();
  }, []);

  const ref = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (number !== "" && name !== "" && expiry !== "" && cvc !== "") {
      const isConfirm = window.confirm("Do you want to continue..");
      if (isConfirm) {
        ChangeCartStatus();
      }
    } else {
      alert("Please provide Card Details to continue!");
    }
  }
  const ChangeCartStatus = () => {
    fetch('http://localhost:8093/api/user/cart/payment/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: address,
    })
      .then(response => response.json())
      .then(data => {
        alert("payment Successfull.Thank you for shopping!!");
        localStorage.removeItem("OrderAddress");
        window.location.href = "/";
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <Cards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focus}
          />
        </div>
        <div className="col-lg-6">
          <form className='container card bg-dark'>
            <div className="row m-3 card-body">
              <div className="col-lg-12">
                <div class="form-floating mb-3">
                  <input
                    className="form-control"
                    id="CardNumber"
                    type="tel"
                    name="number"
                    placeholder="Card Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    onFocus={(e) => setFocus(e.target.name)}
                    ref={ref}
                    required
                  />
                  <label for="CardNumber">Card Number</label>
                </div>
              </div>
              <div className="col-lg-12">
                <div class="form-floating mb-3">
                  <input
                    className="form-control"
                    id="CardNumber"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={(e) => setFocus(e.target.name)}
                    required
                  />
                  <label for="CardNumber">Name</label>
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-floating mb-3">
                  <input
                    className="form-control"
                    id="expiry"
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    onFocus={(e) => setFocus(e.target.name)}
                    required
                  />
                  <label for="expiry">Expiry</label>
                </div>
              </div>
              <div className="col-lg-6">
                <div class="form-floating mb-3">
                  <input
                    className="form-control"
                    id="cvc"
                    type="tel"
                    name="cvc"
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    onFocus={(e) => setFocus(e.target.name)}
                    required
                  />
                  <label for="cvc">CVC</label>
                </div>
              </div>
              <div className="col-lg-12">
                <button onClick={handleSubmit} className="btn btn-outline-info btn-wave">Pay</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type="text"
          name="expiry"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
        <input
          type="tel"
          name="cvc"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        /> */}
    </div>
  );
}
export default PaymentApp;
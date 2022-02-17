import React from "react";

function CartItem({ item, AddToCart, RemoveFromCart, DeleteFromCart }) {
  const quantity = item.quantity;
  const totalPrice = item.totalPrice;
  const { itemImage, itemName, itemPrice, itemSize } = item.item;

  return (
    <div className="row shopping--cart--item m-2 shopping_cart_item" data-aos="fade-up">
      <div className="col-sm-2">
        <div className="cart--item--img">
          <img
            src={itemImage}
            alt="itemName"
            className="img-fluid"
          />
        </div>
      </div>
      <div className="col-sm-5">
        <div
          className="basket--item--title"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          {itemName}
          <p>{itemSize}</p>
        </div>
        <div
          className="basket--item--quantity"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          Quantity: <span>{quantity}</span>
        </div>
        <div
          className="basket--item--price"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          Price: <span>₹{itemPrice}</span>
        </div>
      </div>
      <div className="col-sm-5">
        <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
          <span>Quantity:</span>
          <div className="quantity_selector">
            <span className="minus" onClick={() => RemoveFromCart(item.item)}>
              <i className="fa fa-minus" aria-hidden="true"></i>
            </span>
            <span id="quantity_value">{quantity}</span>
            <span className="plus" onClick={() => AddToCart(item.item)}>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
          <span>SubTotal Price of Product:</span>
          <div className="quantity_selector">
            <span id="quantity_value">₹ {totalPrice}</span>
          </div>
        </div>
        <div className="mt-2 d-flex flex-column flex-sm-row align-items-sm-center">
          <button className="btn btn-outline-danger" onClick={() => DeleteFromCart(item.item)}><i className="fa fa-trash" aria-hidden="true"></i>&nbsp;Remove</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

import React from 'react'

const ItemCard = ({ product, AddToCart, user }) => {
    const { itemImage, itemName, itemDesc, itemPrice, itemSize, id, itemCategory } = product;


    return (
        <div className="col-sm-6 card m-2" id={id}>
            <img src={itemImage} className="card-img-top" alt={itemName} height='300' width='200' />
            <div className="card-body">
                <h5 className="card-title">{itemName}</h5>
                <p className="card-text">{itemDesc}</p>
                <hr />
                <div className='d-flex justify-content-between'>
                    <p className="card-text"><b>Price : </b>{itemPrice}</p>
                    <p className="card-text"><b>Size : </b>{itemSize}</p>
                </div>
                <h6><span class="badge bg-secondary">{itemCategory}</span></h6>
                <hr />
                <div className='d-flex justify-content-center'>
                    {user && (<button onClick={() => AddToCart(product)} className="btn btn-outline-secondary">Add to cart</button>)}
                </div>
            </div>

            {/*<div className="card-body"> <a href="#" className="card-link">Buy now</a> </div>*/}


        </div>
    )
}
export default ItemCard;
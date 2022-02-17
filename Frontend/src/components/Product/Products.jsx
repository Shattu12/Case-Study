import React, { useState, useEffect } from 'react'
import ItemCard from './ItemCard';

const Products = () => {
    const [Items, setItems] = useState([]);
    const [CategoryWiseItem, setCategoryWiseItem] = useState([]);

    useEffect(() => {
        const GetProducts = () => {
            fetch('http://localhost:8093/api/item/all')
                .then(response => response.json())
                .then(data => {
                    setItems(data);
                    setCategoryWiseItem(data);
                    console.log(data);
                });
        }

        GetProducts();
    }, []);


    const ChengeCategory = (event) => {
        var itemCategory = event.target.value;
        if (itemCategory !== "All") {
            setCategoryWiseItem(CategoryWiseItem?.filter((item) => item?.itemCategory.includes(itemCategory)));
        } else {
            setCategoryWiseItem(Items);
        }
    }

    const user = localStorage.getItem("profile") && JSON.parse(localStorage.getItem("profile"));

    const AddToCart = (product) => {
        //console.log(JSON.stringify(Item));
        user && fetch('http://localhost:8093/api/user/cart/add/' + user.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                alert("Item sucsessfully added to cart");
                window.location.href = "/Cart";
            })
            .catch((error) => {
                console.log({ error });
            });
    }

    return (
        <div className='container-fluid'>
            <div className='container'>
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <button className="btn nav-link" onClick={ChengeCategory}>Women</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn nav-link" onClick={ChengeCategory}>Men</button>
                    </li>
                    <li className="nav-item">
                        <button className="btn nav-link" onClick={ChengeCategory}>Kids</button>
                    </li>

                    <li className="nav-item">
                        <button className="btn nav-link" onClick={ChengeCategory}>All</button>
                    </li>
                </ul>
            </div>
            <div className='products m-2'>
                <h3>Product List</h3>
                <hr />
                <div className='row'>
                    {CategoryWiseItem.length !== 0 ? CategoryWiseItem.map((product, i) => (
                        <ItemCard product={product} key={i} AddToCart={AddToCart} user={user} />

                    )) : (<h4 className='text-center text-danger'>No Product Found !!</h4>)
                    }
                </div>
            </div></div>
    );
}

export default Products

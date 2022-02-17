import React, { useState } from 'react'

const AddProduct = () => {
    const [Item, setItem] = useState({
        itemName: "",
        itemDesc: "",
        itemPrice: "",
        itemSize: "",
        itemImage: "",
        itemCategory: "",
        itemType: ""
    });

    const ItemCategories = ["Top", "Bottom", "Winterwear"];
    const InputEvent = (event) => {
        const { name, value } = event.target;
        //console.log(name, value);
        setItem((preVal) => {
            return { ...preVal, [name]: value };
        });
    };

    const formSubmit = (e) => {
        e.preventDefault();
        //console.log(JSON.stringify(Item));
        fetch('http://localhost:8093/api/item/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Item),
        })
            //.then(response => response.json())
            .then((data) => {
                //console.log(data.status);
                alert("Product Added.");
                window.location.href = "/products";
            })
            .catch((error) => {
                console.log({ error });
            });
    }

    return (
        <div className='container'>
            <form onSubmit={formSubmit} className='m-3'>
                <div class="b-3">
                    <label for="itemName" class="form-label">Name</label>
                    <input type="text" required class="form-control" name='itemName' id="itemName" value={Item.itemName} onChange={InputEvent} />
                </div>
                <div class="mb-3">
                    <label for="itemDesc" class="form-label">Description</label>
                    <textarea class="form-control" required name='itemDesc' id="itemDesc" rows="3" value={Item.itemDesc} onChange={InputEvent}></textarea>
                </div>
                <div class="mb-3">
                    <label for="itemPrice" class="form-label">Price</label>
                    <input type="text" required class="form-control" name="itemPrice" id="itemPrice" value={Item.itemPrice} onChange={InputEvent} />
                </div>
                <div class="mb-3">
                    <label for="itemsize" class="form-label">Size</label>
                    <input type="text" required class="form-control" name="itemSize" id="itemSize" value={Item.itemSize} onChange={InputEvent} />
                </div>
                <div class="mb-3">
                    <label for="itemImage" class="form-label">Image</label>
                    <input type="text" required class="form-control" name="itemImage" id="itemImage" value={Item.itemImage} onChange={InputEvent} />
                </div>
                <div class="mb-3">
                    <label for="itemCategory" class="form-label">Category</label>
                    {/* <input type="text" class="form-control" name="itemCategory" id="itemCategory" value={Item.itemCategory} onChange={InputEvent} /> */}
                    <select class="form-select" required name="itemCategory" id="itemCategory" onChange={InputEvent} value={Item.itemCategory}>
                        <option selected>Select Category</option>
                        {ItemCategories.map((category, index) => (<option key={index} value={category}>{category}</option>))}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="itemType" class="form-label">Type</label>
                    <input type="text" required class="form-control" name="itemType" id="itemType" value={Item.itemType} onChange={InputEvent} />
                </div>
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-success mx-auto">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct

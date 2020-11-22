import React from "react";

function AddItem() {
    return (
        <div className="addition">
            <input id="name" type="text"/>
            <label htmlFor="name">Name</label>
            <input id="description" type="text"/>
            <label htmlFor="description">Description</label>
            <input id="amount" type="text"/>
            <label htmlFor="amount">Amount</label>
            <button type="button" className="btn btn-dark" onClick={addProduct}>Add new product</button>
        </div>
    );
}

function addProduct(){
    fetch("http://localhost:8080/add", {
        method: 'POST',
        headers: {
            'Content-Type': 'text/json'
        },
        body: JSON.stringify(
            {
                name: document.getElementById("name").value,
                description: document.getElementById("description").value,
                amount: document.getElementById("amount").value
            })
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data)
    });
}

export default AddItem;
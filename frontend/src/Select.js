import React from "react";

class SelectItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            arr:[],
            search:""
        }
        this.handleChange=this.handleChange.bind(this)
    }

    componentDidMount() {
        fetch("http://localhost:8080/all", {
            method: 'GET',
            headers: {
                'Content-Type': 'text/json'
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({arr:data})
        });
    }
    handleChange(event) {
        this.setState({search: event.target.value});
    }

    render() {
        let products;
        if(this.state.arr.length!==0) {
            let temp = this.state.arr
            let final = []
            if (this.state.search !== "") {
                for (let i = 0; i < temp.length; i++) {
                    if (temp[i].name.includes(this.state.search) || temp[i].description.includes(this.state.search)) {
                        final.push(temp[i])
                    }
                }
            } else {
                final = temp
            }
            products = final.map(item => <Product key={item._id} item={item} load="true"/>);
        }
        else {
            products = <p>Nothing</p>;
        }
        return (
            <div className="selection">
                <input type="text" id="search" value={this.state.search} onChange={this.handleChange} />
                <label htmlFor="search">search</label>
                <div className="row">
                        {products}
                </div>
                <div id="err" style={{display:"none"}}></div>
            </div>
        )
    }


}

function Product(props) {
    return (
        <div className="col-sm-6">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.item.name}</h5>
                    <p className="card-text">{props.item.description}</p>
                    <p className="card-text">Amount: {props.item.amount}</p>
                </div>
            </div>
        </div>
    )
}

export default SelectItem;
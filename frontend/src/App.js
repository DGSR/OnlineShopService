import './App.css';
import React from "react"
import AppHeader from "./Header"
import AddItem from "./Add"
import SelectItem from "./Select"


class App extends React.Component{
    state={
        page:true
    }
    setStateVal=(n,v)=>{
        this.setState({[n]:v})
    }
  render() {
    return (
        <>
            <AppHeader set={this.setStateVal}/>
            <div className="insideBody">
                {this.state.page && <SelectItem/>}
                {!this.state.page && <AddItem isChanged={this.state.page}/>}
            </div>
        </>
    )
  }
}

export default App;

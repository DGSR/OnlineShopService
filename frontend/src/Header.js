import logo from './logo.svg';
import './App.css';

function AppHeader(props) {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <div className="headerSwitcher">
                    <div style={{float:"left"}} onClick={()=>props.set("page",true)}>Select</div>
                    <div style={{float:"right"}} onClick={()=>props.set("page",false)}>Add</div>
                </div>
            </header>
        </div>
    );
}

export default AppHeader;

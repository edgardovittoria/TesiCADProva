import React from 'react';
import './App.css';
import {SideBar} from "./components/sideBar";
import {MyCanvas} from "./components/canvas/MyCanvas";

function App() {

    return (
        <>
                <div className="row">
                    <div className="column" style={{width: "14%", float:"left"}}>
                        <SideBar/>
                    </div>
                    <div className="column" style={{width: "86%", float:"left"}}>
                        <MyCanvas/>
                    </div>
                </div>
        </>
    );
}

export default App;

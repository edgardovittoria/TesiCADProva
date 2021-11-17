import React, {useState} from 'react';
import './App.css';
import {SideBar} from "./components/sideBar/sideBar";
import {MyCanvas} from "./components/canvas/MyCanvas";
import {MyNavBar} from "./components/navBar/navBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToolBar} from "./components/toolBar/toolBar";
import {SelectBinaryOp} from "./components/modal/selectBinaryOp";
import {WheelSpinner} from "./shared/spinners/wheelSpinner";

function App() {

    // const [sideBar, setSideBar] = useState(false);

    // const showViewElementVisibility = (element: string, visibility: boolean) => {
    //     switch (element) {
    //         case "SIDEBAR" :
    //             setSideBar(visibility)
    //             break
    //     }
    // }

    return (
        <>
            <MyNavBar />
            <div style={{margin: "0px"}}>
                <div className="canvas-width-75">
                    <WheelSpinner/>
                    <MyCanvas/>
                    <ToolBar/>
                    <SelectBinaryOp/>
                </div>
                <div className="sidebar-width-25" >
                    <SideBar/>
                </div>

            </div>
        </>

    );
}

export default App;

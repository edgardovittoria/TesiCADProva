import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {SideBar} from "./components/sideBar/sideBar";
import {MyCanvas} from "./components/canvas/MyCanvas";
import {OrbitControls} from "@react-three/drei";
import {Provider, useDispatch, useSelector} from "react-redux";
import {store} from "./store/store";
import {MyNavBar} from "./components/navBar/navBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToolBar} from "./components/toolBar/toolBar";
import {SelectBinaryOp} from "./components/modal/selectBinaryOp";
import {WheelSpinner} from "./shared/spinners/wheelSpinner";
import {binaryOperationExecution, canvasStateSelector} from "./store/canvasSlice";

function App() {

    const [sideBar, setSideBar] = useState(false);
    const showViewElementVisibility = (element: string, visibility: boolean) => {
        switch (element) {
            case "SIDEBAR" :
                setSideBar(visibility)
                break
        }
    }



    return (
        <>
            <MyNavBar setViewElementVisibility={showViewElementVisibility}/>
            <div style={{margin:"0px"}}>
                <div className={(sideBar) ? "canvas-width-75" : "canvas-width-100"}>
                    {(useSelector(binaryOperationExecution) && <WheelSpinner/>) }
                    <MyCanvas/>
                    <ToolBar/>
                    <SelectBinaryOp/>
                </div>
                <div className="sidebar-width-25" hidden={!sideBar}>
                    <SideBar/>
                </div>

            </div>
        </>

    );
}

export default App;

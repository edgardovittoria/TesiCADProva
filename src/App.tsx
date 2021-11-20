import React, {useState} from 'react';
import './App.css';
import {SideBar} from "./components/sideBar/sideBar";
import {MyCanvas} from "./components/canvas/MyCanvas";
import {MyNavBar} from "./components/navBar/navBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToolBar} from "./components/toolBar/toolBar";
import {SelectBinaryOp} from "./components/modal/selectBinaryOp";
import {WheelSpinner} from "./shared/spinners/wheelSpinner";
import {useSelector} from "react-redux";
import {binaryOperationExecution} from "./store/canvasSlice";
import {DraggableComponent} from "./components/utility/draggableComponent";

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
            <div style={{margin: "0px"}}>
                <MyNavBar setViewElementVisibility={showViewElementVisibility}/>
                <div className="canvas-width-100">
                    <WheelSpinner/>
                    <MyCanvas/>
                    <ToolBar/>
                    <SelectBinaryOp/>
                    <DraggableComponent hidden={!sideBar}>
                        <div className="sidebar-width-25" >
                            <SideBar/>
                        </div>
                    </DraggableComponent>
                </div>

            </div>
        </>

    );
}

export default App;

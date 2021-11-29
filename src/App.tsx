import React, {useState} from 'react';
import './App.css';
import './index.css'
import {SideBar} from "./components/sideBar/sideBar";
import {MyCanvas} from "./components/canvas/MyCanvas";
import {MyNavBar} from "./components/navBar/navBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToolBar} from "./components/toolBar/toolBar";
import {SelectBinaryOp} from "./components/modal/makeBinaryOperation";
import {WheelSpinner} from "./shared/spinners/wheelSpinner";
import {useSelector} from "react-redux";
import {binaryOperationExecution} from "./store/canvasSlice";
import {DraggableComponent} from "./components/utility/draggableComponent";
import { UndoRedo } from './components/canvas/undoRedo/undoRedo';

function App() {

    const [sideBar, setSideBar] = useState(false);
    const [collisions, setCollisions] = useState([]);
    const [spinnerVisibility, setSpinnerVisibility] = useState(false)

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
                    <WheelSpinner spinnerVisibility={spinnerVisibility}/>
                    <MyCanvas setModalCollisions={setCollisions}/>
                    <ToolBar/>
                    <UndoRedo />
                    <SelectBinaryOp collisions={collisions} setCollisions={setCollisions} setSpinnerVisibility={setSpinnerVisibility} spinnerVisibility={spinnerVisibility}/>
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

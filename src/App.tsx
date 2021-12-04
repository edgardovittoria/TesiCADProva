import {useState} from 'react';
import './App.css';
import './GlobalColors.css'
import {SideBar} from "./components/sideBar/sideBar";
import {MyCanvas} from "./components/canvas/MyCanvas";
import {MyNavBar} from "./components/navBar/navBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToolBar} from "./components/toolBar/toolBar";
import {DraggableComponent} from "./components/utility/draggableComponent";
import { UndoRedo } from './components/navBar/components/undoRedo';
import { MakeBinaryOp } from './components/modal/makeBinaryOperation';

function App() {

    const [sideBar, setSideBar] = useState(false);
    const [collisions, setCollisions] = useState([]);

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
                    <MyCanvas setModalCollisions={setCollisions}/>
                    <ToolBar/>
                    <MakeBinaryOp collisions={collisions} setCollisions={setCollisions} />
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

import { useState } from 'react';
import './App.css';
import './GlobalColors.css'
import { SideBar } from "./components/sideBar/sideBar";
import { MyCanvas } from "./components/canvas/MyCanvas";
import { MyNavBar } from "./components/navBar/navBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToolBar } from "./components/toolBar/toolBar";
import { DraggableComponent } from "./components/utility/draggableComponent";
import { MakeBinaryOp } from './components/modal/makeBinaryOperation';
import { useCollisions } from './components/contexts/useCollisions';
import {KeyboardEventMapper} from "./utils/keyboardEventMapper/keyboardEventMapper";

function App() {

    const [sideBar, setSideBar] = useState(false);
    const {collisions} = useCollisions()
    const [sideBarChecked, setSideBarChecked] = useState(false)


    const showViewElementVisibility = (element: string, visibility: boolean) => {
        switch (element) {
            case "SIDEBAR":
                setSideBar(visibility)
                break
        }
    }

    return (
        <>
            <div style={{ margin: "0px" }}>
                <MyNavBar setViewElementVisibility={showViewElementVisibility} sideBarChecked={sideBarChecked} setSideBarChecked={setSideBarChecked}/>
                <KeyboardEventMapper setViewElementVisibility={showViewElementVisibility} sideBarChecked={sideBarChecked} setSideBarChecked={setSideBarChecked}/>
                <div className="canvas-width-100">
                    <MyCanvas />
                    <ToolBar />
                    {collisions.length > 0 && <MakeBinaryOp /> }
                    <DraggableComponent hidden={!sideBar}>
                        <div className="sidebar-width-25" >
                            <SideBar />
                        </div>
                    </DraggableComponent>
                </div>
            </div>
        </>

    );
}

export default App;

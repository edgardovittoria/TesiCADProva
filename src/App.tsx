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
import { KeyboardEventMapper } from "./utils/keyboardEventMapper/keyboardEventMapper";
import 'react-statusbar/dist/statusbar.css';
import * as Statusbar from 'react-statusbar';

function App() {

    const [sideBar, setSideBar] = useState(false);
    const { collisions } = useCollisions()
    const [sideBarChecked, setSideBarChecked] = useState(false)
    const [unit, setUnit] = useState("cm");


    const showViewElementVisibility = (element: string, visibility: boolean) => {
        switch (element) {
            case "SIDEBAR":
                setSideBar(visibility)
                break
        }
    }

    return (
        <>
            <div style={{ margin: "0px", height: "100vh" }}>
                <img src="axis.png" style={{position: "absolute", right: 10, top: 20}}/>
                <MyNavBar setViewElementVisibility={showViewElementVisibility} sideBarChecked={sideBarChecked} setSideBarChecked={setSideBarChecked} />
                <KeyboardEventMapper setViewElementVisibility={showViewElementVisibility} sideBarChecked={sideBarChecked} setSideBarChecked={setSideBarChecked} />
                <div className="canvas-width-100">
                    <MyCanvas />
                    <ToolBar />
                    {collisions.length > 0 && <MakeBinaryOp />}
                    <DraggableComponent hidden={!sideBar}>
                        <div className="sidebar-width-25" >
                            <SideBar />
                        </div>
                    </DraggableComponent>
                </div>
                <Statusbar.Statusbar placement='block' right={<Statusbar.Dropdown
                    options={[
                        {
                            key: 'dm',
                            label: 'dm',
                            onClick: () => setUnit("dm")
                        },
                        {
                            key: 'cm',
                            label: 'cm',
                            onClick: () => setUnit("cm")
                        },
                        {
                            key: 'separator-test',
                            type: 'separator'
                        },
                        {
                            key: 'mm',
                            label: 'mm',
                            onClick: () => setUnit("mm")
                        }
                    ]}
                >
                    units: {unit}
                </Statusbar.Dropdown>} />
            </div>
        </>

    );
}

export default App;

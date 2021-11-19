import React, {} from 'react';
import {ProSidebar} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {useDispatch, useSelector} from "react-redux";
import {canvasStateSelector, removeComponent, selectedComponentSelector} from "../../store/canvasSlice";
import "./css/outliner.css"
import {Outliner} from "./components/outliner";
import {Position} from "./components/position";
import {Rotation} from "./components/rotation";
import {Scale} from "./components/scale";
import "./css/transformation.css"
import {Color} from "./components/color";
import {Button} from "react-bootstrap";


interface SideBarProps {

}

export const SideBar: React.FC<SideBarProps> = () => {

    const canvasState = useSelector(canvasStateSelector);
    let selectedComponent = useSelector(selectedComponentSelector)
    const dispatch = useDispatch()

    return (
        <ProSidebar style={{height: "100vh", width: "100%", backgroundColor: "#212529", padding: "20px"}}>
            <Outliner canvasState={canvasState}/>
            {(canvasState.components.filter(component => component.keyComponent === canvasState.selectedComponentKey).length > 0) &&
            <div style={{height: "90%", marginTop: "20px"}}>
                <Position selectedComponent={selectedComponent} dispatch={dispatch}/>
                <Rotation selectedComponent={selectedComponent} dispatch={dispatch}/>
                <Scale selectedComponent={selectedComponent} dispatch={dispatch}/>
                <Color selectedComponent={selectedComponent} dispatch={dispatch}/>
                <Button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                        if(window.confirm(`Sei sicuro di voler eliminare il componente ${selectedComponent.name} ?`)){
                            dispatch(removeComponent(selectedComponent))
                        }
                    }}
                    style={{position: "absolute", bottom: 50, right:0}}
                >
                    Elimina
                </Button>
            </div>}

        </ProSidebar>
    )

}
import React, {} from 'react';
import {ProSidebar} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {useSelector} from "react-redux";
import {canvasStateSelector} from "../../store/canvasSlice";
import "./css/outliner.css"
import {Outliner} from "./components/outliner";
import {Position} from "./components/position";
import {Rotation} from "./components/rotation";
import {Scale} from "./components/scale";
import "./css/transformation.css"



interface SideBarProps {
    orbit: React.MutableRefObject<null>
}

export const SideBar: React.FC<SideBarProps> = ({orbit}) => {

    const canvasState = useSelector(canvasStateSelector);


    return(
        <ProSidebar style={{height: "100vh", width:"100%", backgroundColor: "#212529", padding:"20px"}}>
                <Outliner canvasState={canvasState} />
            {(canvasState.components.filter(component => component.isSelected) !== undefined)&&
            <div>
                <Position canvasState={canvasState}/>
                <Rotation canvasState={canvasState}/>
                <Scale canvasState={canvasState}/>
            </div>}
        </ProSidebar>
    )

}
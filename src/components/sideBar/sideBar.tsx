import React, {useEffect, useRef, useState} from 'react';
import {ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader} from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faCircle, faToolbox, faFileImport, faFileExport} from '@fortawesome/free-solid-svg-icons'
import 'react-pro-sidebar/dist/css/styles.css';
import {useDispatch, useSelector} from "react-redux";
import {Cube} from "../canvas/components/cube";
import {addComponent, canvasStateSelector, incrementNumberOfGeneratedKey, selectComponent} from "../../store/canvasSlice";
import {Sfera} from "../canvas/components/sfera";
import {Component} from "../canvas/components/Component";
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
            {(canvasState.selectedComponent !== null)&&
            <div>
                <Position canvasState={canvasState}/>
                <Rotation canvasState={canvasState}/>
                <Scale canvasState={canvasState}/>
            </div>}
        </ProSidebar>
    )

}
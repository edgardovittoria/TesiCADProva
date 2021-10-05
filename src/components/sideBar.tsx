import React, {useRef} from 'react';
import {ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader} from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faCircle, faToolbox, faFileImport, faFileExport} from '@fortawesome/free-solid-svg-icons'
import 'react-pro-sidebar/dist/css/styles.css';
import {useDispatch} from "react-redux";
import {Cube} from "./canvas/components/cube";
import {addComponent} from "../store/canvasSlice";
import {Sfera} from "./canvas/components/sfera";
import {Component} from "./canvas/components/Component";

interface SideBarProps {
    orbit: React.MutableRefObject<null>
}

export const SideBar: React.FC<SideBarProps> = ({orbit}) => {

    const dispatch = useDispatch();


    return(
        <ProSidebar style={{height: "100vh", backgroundColor: "#212529"}}>
            <SidebarHeader>
                <div style={{textAlign: "center"}}>
                    <h2>Editor</h2>
                </div>
            </SidebarHeader>
            <Menu iconShape="circle">
                <SubMenu key={1} title="Components" icon={<FontAwesomeIcon icon={faToolbox}/>}>
                    <MenuItem icon={<FontAwesomeIcon icon={faCube}/>} onClick={() => {
                        const cube = <Cube color="red" x={1} y={1} z={1}/>;
                        const element = <Component key={1} dispatch={dispatch} orbit={orbit} child={cube} position={[0,0,0]}/>
                        dispatch(addComponent(element));
                    }}>Cube</MenuItem>
                    <MenuItem icon={<FontAwesomeIcon icon={faCircle} />} onClick={() => {
                        const sphere = <Sfera radius={1} widthSegments={6} heightSegments={6} color="yellow"/>
                        const element = <Component key={2} dispatch={dispatch} orbit={orbit} child={sphere} position={[0,0,0]}/>
                        dispatch(addComponent(element))
                    }}>Sphere</MenuItem>
                </SubMenu>
                <MenuItem icon={<FontAwesomeIcon icon={faFileImport} />}>Import</MenuItem>
                <MenuItem icon={<FontAwesomeIcon icon={faFileExport} />}>Export</MenuItem>
            </Menu>

        </ProSidebar>
    )

}
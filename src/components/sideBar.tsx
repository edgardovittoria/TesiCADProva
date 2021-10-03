import React from 'react';
import {ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader} from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faCircle, faToolbox, faFileImport, faFileExport} from '@fortawesome/free-solid-svg-icons'
import 'react-pro-sidebar/dist/css/styles.css';
import {useDispatch} from "react-redux";
import {Cube} from "./canvas/components/cube";
import {addComponent} from "../store/canvasSlice";
import {Sfera} from "./canvas/components/sfera";
import {Keen} from "./canvas/components/Keen";

interface SideBarProps {
}

export const SideBar: React.FC<SideBarProps> = () => {

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
                        const cube = <Cube color="red" x={1} y={1} z={1} position={[0,0,0]}/>;
                        dispatch(addComponent(cube));
                    }}>Cube</MenuItem>
                    <MenuItem icon={<FontAwesomeIcon icon={faCircle} />} onClick={() => {
                        const sphere = <Keen dispatch={dispatch}/>
                        dispatch(addComponent(sphere))
                    }}>Sphere</MenuItem>
                </SubMenu>
                <MenuItem icon={<FontAwesomeIcon icon={faFileImport} />}>Import</MenuItem>
                <MenuItem icon={<FontAwesomeIcon icon={faFileExport} />}>Export</MenuItem>
            </Menu>

        </ProSidebar>
    )

}
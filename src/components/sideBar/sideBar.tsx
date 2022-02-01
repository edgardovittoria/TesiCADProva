import React, {} from 'react';
import {ProSidebar, SidebarContent, SidebarHeader} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {useDispatch, useSelector} from "react-redux";
import {Outliner} from "./components/outliner";
import {Color} from "./components/color";
import {Container} from "react-bootstrap";

import "./style/outliner.css"
import "./style/sideBar.css"
import "./style/transformation.css"
import { Transformations } from './components/transformations';
import { canvasStateSelector, removeComponent, selectedComponentSelector } from '@Draco112358/cad-library';
import { GeometryParams } from './components/geometryParams/geometryParams';


interface SideBarProps {

}

export const SideBar: React.FC<SideBarProps> = () => {

    const canvasState = useSelector(canvasStateSelector);
    let selectedComponent = useSelector(selectedComponentSelector)
    const dispatch = useDispatch()

    return (
        <ProSidebar className="proSidebar">
            <SidebarHeader className="sideBarHeader">
                <h4>Object Details</h4>
            </SidebarHeader>
            <SidebarContent className="sideBarContent">
                <div>
                    <Outliner canvasState={canvasState}/>
                    {(canvasState.components.filter(component => component.keyComponent === canvasState.selectedComponentKey).length > 0) &&
                    <Container className="sideBarContainer">
                        <Transformations transformationParams={selectedComponent.transformationParams}/>
                        <GeometryParams entity={selectedComponent}/>
                        <Color selectedComponent={selectedComponent} dispatch={dispatch}/>
                        <button
                            type="button"
                            className="btn btn-danger btn-delete"
                            onClick={() => {
                                if (window.confirm(`Sei sicuro di voler eliminare il componente ${selectedComponent.name} ?`)) {
                                    dispatch(removeComponent(selectedComponent.keyComponent));
                                }
                            }}
                        >
                            Delete
                        </button>
                    </Container>
                    }
                </div>
            </SidebarContent>


        </ProSidebar>
    )

}
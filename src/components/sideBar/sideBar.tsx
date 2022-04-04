import React, { } from 'react';
import { ProSidebar, SidebarContent, SidebarFooter, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { useDispatch, useSelector } from "react-redux";
import { Outliner } from "./components/outliner";
import { Container } from "react-bootstrap";

import "./style/outliner.css"
import "./style/sideBar.css"
import "./style/transformation.css"
import { Transformations } from './components/transformations';
import { canvasStateSelector, Material, removeComponent, removeComponentMaterial, selectedComponentSelector, setComponentMaterial } from 'cad-library';
import { GeometryParams } from './components/geometryParams/geometryParams';
import { MaterialSelection } from './components/materialSelection';


interface SideBarProps {

}

export const SideBar: React.FC<SideBarProps> = () => {

    const canvasState = useSelector(canvasStateSelector);
    let selectedComponent = useSelector(selectedComponentSelector)
    const dispatch = useDispatch()
    const setMaterial = (material: Material) => dispatch(setComponentMaterial({ key: selectedComponent.keyComponent, material: material }))
    const unsetMaterial = () => dispatch(removeComponentMaterial({ keyComponent: selectedComponent.keyComponent }))

    return (
        <ProSidebar className="proSidebar">
            <SidebarHeader className="sideBarHeader">
                <h4>OBJECT DETAILS</h4>
            </SidebarHeader>
            <SidebarContent className="sideBarContent">
                <div>
                    <Outliner canvasState={canvasState} />
                    {(canvasState.components.filter(component => component.keyComponent === canvasState.selectedComponentKey).length > 0) &&
                        <Container className="sideBarContainer">
                            <SidebarHeader ><h6 style={{ textAlign: "center" }}>Transformation Params</h6></SidebarHeader>
                            <Transformations transformationParams={selectedComponent.transformationParams} />
                            <SidebarHeader><h6 style={{ textAlign: "center" }}>Geometry Params</h6></SidebarHeader>
                            <GeometryParams entity={selectedComponent} />
                            <MaterialSelection defaultMaterial={selectedComponent.material} setMaterial={setMaterial} unsetMaterial={unsetMaterial} />
                            <SidebarFooter>
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
                            </SidebarFooter>
                        </Container>
                    }
                </div>
            </SidebarContent>


        </ProSidebar>
    )

}
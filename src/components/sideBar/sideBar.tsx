import React, {} from 'react';
import {ProSidebar, SidebarContent, SidebarHeader} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {useDispatch, useSelector} from "react-redux";
import {
    canvasStateSelector,
    removeComponent,
    selectComponent,
    selectedComponentSelector
} from "../../store/canvasSlice";
import {Outliner} from "./components/outliner";
import {Position} from "./components/position";
import {Rotation} from "./components/rotation";
import {Scale} from "./components/scale";
import {Color} from "./components/color";
import {Col, Container, Row} from "react-bootstrap";

import "./style/outliner.css"
import "./style/sideBar.css"
import "./style/transformation.css"


interface SideBarProps {

}

export const SideBar: React.FC<SideBarProps> = () => {

    const canvasState = useSelector(canvasStateSelector);
    let selectedComponent = useSelector(selectedComponentSelector)
    const dispatch = useDispatch()

    return (
        <ProSidebar className="proSidebar">
            <SidebarHeader className="sideBarHeader">
                <h4>SideBar</h4>
            </SidebarHeader>
            <SidebarContent className="sideBarContent">
                <div>
                    <Outliner canvasState={canvasState}/>
                    {(canvasState.components.filter(component => component.keyComponent === canvasState.selectedComponentKey).length > 0) &&
                    <Container className="sideBarContainer">
                        <Row>
                            <Col className="col-2">
                                <span className="textSideBar">Position</span>
                            </Col>
                            <Col>
                                <Position selectedComponent={selectedComponent} dispatch={dispatch}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-2">
                                <span className="textSideBar">Rotation</span>
                            </Col>
                            <Col>
                                <Rotation selectedComponent={selectedComponent} dispatch={dispatch}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-2">
                                <span className="textSideBar">Scale</span>
                            </Col>
                            <Col>
                                <Scale selectedComponent={selectedComponent} dispatch={dispatch}/>
                            </Col>
                        </Row>
                        <Color selectedComponent={selectedComponent} dispatch={dispatch}/>
                        <button
                            type="button"
                            className="btn btn-danger btn-delete"
                            onClick={() => {
                                if (window.confirm(`Sei sicuro di voler eliminare il componente ${selectedComponent.name} ?`)) {
                                    dispatch(removeComponent(selectedComponent));
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
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
import "./css/outliner.css"
import {Outliner} from "./components/outliner";
import {Position} from "./components/position";
import {Rotation} from "./components/rotation";
import {Scale} from "./components/scale";
import "./css/transformation.css"
import {Color} from "./components/color";
import {Col, Container, Row} from "react-bootstrap";


interface SideBarProps {

}

export const SideBar: React.FC<SideBarProps> = () => {

    const canvasState = useSelector(canvasStateSelector);
    let selectedComponent = useSelector(selectedComponentSelector)
    const dispatch = useDispatch()

    return (
        <ProSidebar
            style={{height: "80vh", width: "100%", backgroundColor: "#6e6a6a", padding: "10px", borderRadius: "10px", boxShadow: "-5px 10px 15px #000000"}}>
            <SidebarHeader style={{textAlign: "center", backgroundColor: "#6e6a6a",}}>
                <h4 style={{color: "#ffffff"}}>SideBar</h4>
            </SidebarHeader>
            <SidebarContent style={{padding: "10px", backgroundColor: "#6e6a6a"}}>
                <div>
                    <Outliner canvasState={canvasState}/>
                    {(canvasState.components.filter(component => component.keyComponent === canvasState.selectedComponentKey).length > 0) &&
                    <Container style={{marginTop: "20px", padding: 0}}>
                        <Row>
                            <Col className="col-2">
                                <span className="Text"
                                      style={{cursor: "default", display: "inline-block"}}>Position</span>
                            </Col>
                            <Col>
                                <Position selectedComponent={selectedComponent} dispatch={dispatch}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-2">
                                <span className="Text"
                                      style={{cursor: "default", display: "inline-block"}}>Rotation</span>
                            </Col>
                            <Col>
                                <Rotation selectedComponent={selectedComponent} dispatch={dispatch}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-2">
                                <span className="Text"
                                      style={{cursor: "default", display: "inline-block"}}>Scale</span>
                            </Col>
                            <Col>
                                <Scale selectedComponent={selectedComponent} dispatch={dispatch}/>
                            </Col>
                        </Row>
                        <Color selectedComponent={selectedComponent} dispatch={dispatch}/>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                                if (window.confirm(`Sei sicuro di voler eliminare il componente ${selectedComponent.name} ?`)) {
                                    dispatch(selectComponent(0))
                                    dispatch(removeComponent(selectedComponent));
                                }
                            }}
                            style={{position: "absolute", bottom: 50, right: 10, boxShadow: "-2px 2px 5px #000000"}}
                        >
                            Elimina
                        </button>
                    </Container>
                        }
                        </div>
                        </SidebarContent>


                        </ProSidebar>
                        )

                    }
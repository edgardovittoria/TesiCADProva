import React, { useEffect, useRef } from 'react';
import { Container, Nav, Navbar, NavDropdown, NavItem, NavLink } from "react-bootstrap";
import { faCircle, faCube, faRing } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDefaultCube } from "../canvas/components/cube";
import { addComponent, canvasStateSelector } from "../../store/canvasSlice";
import { useDispatch, useSelector } from "react-redux";
import { getDefaultSphere } from '../canvas/components/sphere';
import { store } from '../../store/store';
import './style/navBar.css';
import { importFrom, importProjectFrom } from "../../auxiliaryFunctionsForImportAndExport/importFunctions";
import { exportProjectFrom, exportToSTLFormatFrom } from "../../auxiliaryFunctionsForImportAndExport/exportFunctions";
import { getDefaultCylinder } from '../canvas/components/cylinder';
import { getDefaultTorus } from '../canvas/components/torus';

interface NavBarProps {
}


export const MyNavBar: React.FC<NavBarProps> = () => {
    const dispatch = useDispatch();
    const canvasState = useSelector(canvasStateSelector);
    const inputRefProject = useRef(null)
    const inputRefSTL = useRef(null)

    const onImportProjectClick = () => {
        let input = inputRefProject.current
        if (input) {
            (input as HTMLInputElement).click()
        }

    };

    const onImportSTLClick = () => {
        let input = inputRefSTL.current
        if (input) {
            (input as HTMLInputElement).click()
        }

    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        {/*Start Components Dropdown*/}
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Components"
                            menuVariant="dark"
                        >
                            <Nav.Link onClick={() => {
                                let cube = getDefaultCube(canvasState, dispatch);
                                dispatch(addComponent(cube))

                            }}>
                                <div className="dropdownItem">
                                    <FontAwesomeIcon icon={faCube} style={{ marginRight: "5px" }} />
                                    <span>Cube</span>
                                </div>

                            </Nav.Link>
                            <Nav.Link onClick={() => {
                                let sphere = getDefaultSphere(canvasState, dispatch);
                                dispatch(addComponent(sphere))

                            }}>
                                <div className="dropdownItem">
                                    <FontAwesomeIcon icon={faCircle} style={{ marginRight: "5px" }}
                                        className="dropdownItem" />
                                    <span>Sphere</span>
                                </div>
                            </Nav.Link>
                            <Nav.Link onClick={() => {
                                let cylinder = getDefaultCylinder(canvasState, dispatch);
                                dispatch(addComponent(cylinder))

                            }}>
                                <div className="dropdownItem">
                                    {/* <FontAwesomeIcon icon={faCircle} style={{marginRight: "5px"}}/> */}
                                    <span>Cylinder</span>
                                </div>

                            </Nav.Link>
                            <Nav.Link onClick={() => {
                                let torus = getDefaultTorus(canvasState, dispatch);
                                dispatch(addComponent(torus))

                            }}>
                                <div className="dropdownItem">
                                    <FontAwesomeIcon icon={faRing} style={{marginRight: "5px"}}/>
                                    <span>Torus</span>
                                </div>

                            </Nav.Link>
                        </NavDropdown>
                        {/*End Components Dropdown*/}

                        {/*Start Import Dropdown*/}
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Import"
                            menuVariant="dark"
                        >
                            <button className="dropdownItem" onClick={onImportProjectClick}>
                                Project
                                <input
                                    type="file"
                                    ref={inputRefProject}
                                    style={{ display: "none" }}
                                    accept="application/json"
                                    onChange={(e) => {
                                        let files = e.target.files;
                                        (files) && importProjectFrom(files[0], dispatch)
                                    }} />
                            </button>
                            <hr />
                            <button className="dropdownItem" onClick={onImportSTLClick}>
                                STL file
                                <input
                                    type="file"
                                    ref={inputRefSTL}
                                    style={{ display: "none" }}
                                    accept=".stl"
                                    onChange={(e) => {
                                        let STLFiles = e.target.files;
                                        (STLFiles) && importFrom(STLFiles[0], canvasState, dispatch)
                                    }} />
                            </button>
                        </NavDropdown>
                        {/*End Import Dropdown*/}

                        {/*Start Export Dropdown*/}
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Export"
                            menuVariant="dark"
                        >
                            <Nav.Link
                                href={`data:application/json;charset=utf-8,${encodeURIComponent(
                                    exportProjectFrom(store)
                                )}`}
                                download="project.json">
                                <span className="dropdownItem">Project</span>
                            </Nav.Link>
                            <hr />
                            <Nav.Link
                                href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                                    exportToSTLFormatFrom(canvasState)
                                )}`}
                                download="model.stl">
                                <span className="dropdownItem">STL Format</span>
                            </Nav.Link>
                        </NavDropdown>
                        {/*End Export Dropdown*/}
                    </Nav>
                </Container>
            </Navbar>
        </>
    )

}




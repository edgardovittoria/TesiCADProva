import React, {useEffect, useRef, useState} from 'react';
import {Container, InputGroup, Nav, Navbar, NavDropdown, NavItem, NavLink, Tooltip} from "react-bootstrap";
import {faBars, faCaretDown, faCircle, faCube, faRing, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getDefaultCube} from "../canvas/components/cube";
import {addComponent, canvasStateSelector} from "../../store/canvasSlice";
import {useDispatch, useSelector} from "react-redux";
import {getDefaultSphere} from '../canvas/components/sphere';
import {store} from '../../store/store';
import './style/navBar.css';
import {importFrom, importProjectFrom} from "../../auxiliaryFunctionsForImportAndExport/importFunctions";
import {exportProjectFrom, exportToSTLFormatFrom} from "../../auxiliaryFunctionsForImportAndExport/exportFunctions";
import {getDefaultCylinder} from '../canvas/components/cylinder';
import {getDefaultTorus} from '../canvas/components/torus';
import {getDefaultCone} from '../canvas/components/cone';

interface NavBarProps {
    setViewElementVisibility: Function
}


export const MyNavBar: React.FC<NavBarProps> = ({setViewElementVisibility}) => {

    const [navBarOpen, setNavBarOpen] = useState(false);

    const dispatch = useDispatch();
    const canvasState = useSelector(canvasStateSelector);
    const inputRefProject = useRef(null)
    const inputRefSTL = useRef(null)
    const [sideBarChecked, setSideBarChecked] = useState(false)


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

    if (!navBarOpen) {
        return (
            <div className="burgerMenu">
                <Tooltip title="Open Navbar" onClick={() => setNavBarOpen(!navBarOpen)}>
                    <FontAwesomeIcon icon={faBars} size="2x"/>
                </Tooltip>
            </div>

        )
    } else {
        return (
            <>
                <Navbar variant="dark">
                    <div className="closeNavBar">
                        <Tooltip title="Close NavBar" onClick={() => setNavBarOpen(!navBarOpen)}>
                            <FontAwesomeIcon icon={faTimes} size="1x"/>
                        </Tooltip>
                    </div>
                    <Container>
                        <Nav className="me-auto">
                            {/*Start View Dropdown*/}
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="View"
                                menuVariant="dark"
                            >
                                <Nav.Link>
                                    <div className="dropdownItem form-check" onClick={() => {
                                        setSideBarChecked(!sideBarChecked)
                                        setViewElementVisibility("SIDEBAR", !sideBarChecked)
                                    }}>
                                        <input id="1" className="form-check-input" type="checkbox"
                                               checked={sideBarChecked}
                                               onChange={() => {}}
                                        />

                                        <label className="form-check-label">SideBar</label>
                                    </div>
                                </Nav.Link>
                            </NavDropdown>
                            {/*End View Dropdown*/}
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
                                        <FontAwesomeIcon icon={faCube} style={{marginRight: "5px"}}/>
                                        <span>Cube</span>
                                    </div>

                                </Nav.Link>
                                <Nav.Link onClick={() => {
                                    let sphere = getDefaultSphere(canvasState, dispatch);
                                    dispatch(addComponent(sphere))

                                }}>
                                    <div className="dropdownItem">
                                        <FontAwesomeIcon icon={faCircle} style={{marginRight: "5px"}}
                                                         className="dropdownItem"/>
                                        <span>Sphere</span>
                                    </div>
                                </Nav.Link>
                                <Nav.Link onClick={() => {
                                    let cylinder = getDefaultCylinder(canvasState, dispatch);
                                    dispatch(addComponent(cylinder))

                                }}>
                                    <div className="dropdownItem">
                                        <FontAwesomeIcon icon={faCircle} style={{marginRight: "5px"}}/>
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
                                <Nav.Link onClick={() => {
                                    let cone = getDefaultCone(canvasState, dispatch);
                                    dispatch(addComponent(cone))

                                }}>
                                    <div className="dropdownItem">
                                        {/* <FontAwesomeIcon icon={faRing} style={{marginRight: "5px"}}/> */}
                                        <FontAwesomeIcon icon={faCaretDown} size="lg" style={{marginRight: "5px"}}/>
                                        <span>Cone</span>
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
                                        style={{display: "none"}}
                                        accept="application/json"
                                        onChange={(e) => {
                                            let files = e.target.files;
                                            (files) && importProjectFrom(files[0], dispatch)
                                        }}/>
                                </button>
                                <hr/>
                                <button className="dropdownItem" onClick={onImportSTLClick}>
                                    STL file
                                    <input
                                        type="file"
                                        ref={inputRefSTL}
                                        style={{display: "none"}}
                                        accept=".stl"
                                        onChange={(e) => {
                                            let STLFiles = e.target.files;
                                            (STLFiles) && importFrom(STLFiles[0], canvasState, dispatch)
                                        }}/>
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
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = `data:application/json;charset=utf-8,${encodeURIComponent(
                                            exportProjectFrom(store)
                                        )}`
                                        link.download = "project.json"
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}>
                                    <span className="dropdownItem">Project</span>
                                </Nav.Link>
                                <hr/>
                                <Nav.Link
                                    id="exportSTL"
                                    onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = `data:model/stl;charset=utf-8,${encodeURIComponent(
                                            exportToSTLFormatFrom(canvasState)
                                        )}`
                                        link.download = "model.stl"
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                    }}
                                >
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


}




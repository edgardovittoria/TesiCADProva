import React, {useRef, useState} from 'react';
import {Container, Form, Nav, Navbar, NavDropdown, Tooltip} from "react-bootstrap";
import {
    faBars,
    faCaretDown,
    faCircle,
    faCube,
    faRing,
    faTimes,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getDefaultCube} from "../canvas/components/cube";
import {addComponent, numberOfGeneratedKeySelector, resetState} from "../../store/canvasSlice";
import {useDispatch, useSelector} from "react-redux";
import {getDefaultSphere} from '../canvas/components/sphere';
import {store} from '../../store/store';
import './style/navBar.css';
import {importFrom, importProjectFrom} from "../../auxiliaryFunctionsForImportAndExport/importFunctions";
import {exportProjectFrom, exportToSTLFormatFrom} from "../../auxiliaryFunctionsForImportAndExport/exportFunctions";
import {getDefaultCylinder} from '../canvas/components/cylinder';
import {getDefaultTorus} from '../canvas/components/torus';
import {getDefaultCone} from '../canvas/components/cone';
import {UndoRedo} from "./components/undoRedo";
import { ActionCreators } from 'redux-undo';
import { useMeshes } from '../contexts/useMeshes';
import {Mesh} from "three";

interface NavBarProps {
    setViewElementVisibility: Function,
    sideBarChecked: boolean,
    setSideBarChecked: Function
}

export const exportJSONProject = () => {
    const link = document.createElement('a');
    link.href = `data:application/json;charset=utf-8,${encodeURIComponent(
        exportProjectFrom(store)
    )}`
    link.download = "project.json"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export const exportToSTLFormat = (meshes: Mesh[]) => {
    const link = document.createElement('a');
    link.href = `data:model/stl;charset=utf-8,${encodeURIComponent(
        exportToSTLFormatFrom(meshes)
    )}`
    link.download = "model.stl"
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


export const MyNavBar: React.FC<NavBarProps> = ({setViewElementVisibility, sideBarChecked, setSideBarChecked}) => {
    const {meshes} = useMeshes()
    const [navBarOpen, setNavBarOpen] = useState(false);

    const dispatch = useDispatch();
    const numberOfGeneratedKey = useSelector(numberOfGeneratedKeySelector)
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

    if (!navBarOpen) {
        return (

                <Tooltip title="Open Navbar" className="burgerMenu" onClick={() => setNavBarOpen(!navBarOpen)}>
                    <FontAwesomeIcon className="navbarBeforeOpenIcon" icon={faBars} size="2x"/>
                </Tooltip>


        )
    } else {
        return (
            <>
                <Navbar variant="light">
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
                                menuVariant="light"
                            >
                                <Nav.Link onClick={() => {
                                    setSideBarChecked(!sideBarChecked)
                                    setViewElementVisibility("SIDEBAR", !sideBarChecked)
                                }}>
                                    <div id="viewDropdown">
                                        <div className="row">
                                            <div className="col-8">
                                                <Form.Check
                                                    type="switch"
                                                    id="custom-switch"
                                                    label="Object Details"
                                                    checked={sideBarChecked}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="col-4">
                                                <span className="keyboardShortcut">Ctrl + d</span>
                                            </div>

                                        </div>
                                    </div>
                                </Nav.Link>
                            </NavDropdown>
                            {/*End View Dropdown*/}
                            {/*Start Edit Menu*/}
                            <NavDropdown
                                title="Edit"
                                menuVariant="dark"
                            >
                                <div id="editDropdown">
                                    <UndoRedo/>
                                    <Nav.Link onClick={() => {
                                        dispatch(resetState())
                                        dispatch(ActionCreators.clearHistory())
                                    }}>
                                        <div className="row">
                                            <div className="dropdownItem col-8">
                                                <FontAwesomeIcon icon={faTrash} style={{marginRight: "5px"}}/>
                                                <span>Clear All</span>
                                            </div>
                                            <div className="keyboardShortcut  col-4">
                                                <span>Ctrl + Alt + r</span>
                                            </div>
                                        </div>
                                    </Nav.Link>
                                </div>

                            </NavDropdown>
                            {/*End Edit Menu*/}
                            {/*Start Components Dropdown*/}
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Components"
                                menuVariant="dark"
                            >
                                <Nav.Link onClick={() => {
                                    let cube = getDefaultCube(numberOfGeneratedKey, dispatch);
                                    dispatch(addComponent(cube))

                                }}>
                                    <div className="dropdownItemCube dropdownItem">
                                        <FontAwesomeIcon icon={faCube} style={{marginRight: "5px"}}/>
                                        <span>Cube</span>
                                    </div>

                                </Nav.Link>
                                <Nav.Link onClick={() => {
                                    let sphere = getDefaultSphere(numberOfGeneratedKey, dispatch);
                                    dispatch(addComponent(sphere))

                                }}>
                                    <div className="dropdownItemSphere dropdownItem">
                                        <FontAwesomeIcon icon={faCircle} style={{marginRight: "5px"}}/>
                                        <span>Sphere</span>
                                    </div>
                                </Nav.Link>
                                <Nav.Link onClick={() => {
                                    let cylinder = getDefaultCylinder(numberOfGeneratedKey, dispatch);
                                    dispatch(addComponent(cylinder))

                                }}>
                                    <div className="dropdownItemCylinder dropdownItem">
                                        <FontAwesomeIcon icon={faCircle} style={{marginRight: "5px"}}/>
                                        <span>Cylinder</span>
                                    </div>

                                </Nav.Link>
                                <Nav.Link onClick={() => {
                                    let torus = getDefaultTorus(numberOfGeneratedKey, dispatch);
                                    dispatch(addComponent(torus))

                                }}>
                                    <div className="dropdownItemTorus dropdownItem">
                                        <FontAwesomeIcon icon={faRing} style={{marginRight: "5px"}}/>
                                        <span>Torus</span>
                                    </div>

                                </Nav.Link>
                                <Nav.Link onClick={() => {
                                    let cone = getDefaultCone(numberOfGeneratedKey, dispatch);
                                    dispatch(addComponent(cone))

                                }}>
                                    <div className="dropdownItemCone dropdownItem">
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
                                <button className="btn-export" onClick={onImportProjectClick}>
                                    <span className="dropdownItem">Project</span>
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
                                <button className="btn-export" onClick={onImportSTLClick}>
                                    <span className="dropdownItem">STL file</span>
                                    <input
                                        type="file"
                                        ref={inputRefSTL}
                                        style={{display: "none"}}
                                        accept=".stl"
                                        onChange={(e) => {
                                            let STLFiles = e.target.files;
                                            (STLFiles) && importFrom(STLFiles[0], numberOfGeneratedKey, dispatch)
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
                                        exportJSONProject()
                                    }}>
                                    <div id="exportDropdown">
                                        <div className="row">
                                            <div className="col-6 dropdownItem">
                                                <span>Project</span>
                                            </div>
                                            <div className="col-6 keyboardShortcut">
                                                <span>Ctrl + s</span>
                                            </div>
                                        </div>
                                    </div>
                                </Nav.Link>
                                <hr/>
                                <Nav.Link
                                    id="exportSTL"
                                    onClick={() => {
                                        exportToSTLFormat(meshes)
                                    }}
                                >
                                    <div className="row">
                                        <div className="col-6 dropdownItem">
                                            <span>STL Format</span>
                                        </div>
                                        <div className="col-6 keyboardShortcut">
                                            <span>Ctrl + Alt + s</span>
                                        </div>
                                    </div>
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




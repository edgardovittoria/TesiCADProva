import React, {useRef} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {faCircle, faCube} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getDefaultCube} from "../canvas/components/cube";
import {addComponent, CanvasState, canvasStateSelector, importStateCanvas} from "../../store/canvasSlice";
import {useDispatch, useSelector} from "react-redux";
import {getDefaultSphere} from '../canvas/components/sphere';
import {RootState, store} from '../../store/store';
import {ActionCreators} from 'redux-undo';

interface NavBarProps {
}


export const MyNavBar: React.FC<NavBarProps> = () => {
    const dispatch = useDispatch();
    const canvasState = useSelector(canvasStateSelector);
    const inputRef = useRef(null)
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="Components"
                            menuVariant="dark"
                        >
                            <Nav.Link onClick={() => {
                                let cube = getDefaultCube(canvasState, dispatch);
                                dispatch(addComponent(cube))

                            }}>
                                <FontAwesomeIcon icon={faCube} style={{marginRight: "5px"}}/>
                                Cube
                            </Nav.Link>
                            <Nav.Link onClick={() => {
                                let sphere = getDefaultSphere(canvasState, dispatch);
                                dispatch(addComponent(sphere))

                            }}>
                                <FontAwesomeIcon icon={faCircle} style={{marginRight: "5px"}}/>
                                Sphere
                            </Nav.Link>
                        </NavDropdown>
                        <input type="file" onChange={(e) => {
                            let files = e.target.files;
                            (files) && files[0].text().then((value) => {
                                let storeState: RootState = JSON.parse(value)
                                dispatch(importStateCanvas(storeState.canvas.present))
                            })
                        }}/> Import
                        <Nav.Link
                            href={`data:text/json;charset=utf-8,${encodeURIComponent(
                                JSON.stringify(store.getState())
                            )}`}
                            download="canvasState.json">Export</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )

}
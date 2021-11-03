import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { faCircle, faCube } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {getDefaultCube} from "../canvas/components/cube";
import {addComponent, canvasStateSelector} from "../../store/canvasSlice";
import { useDispatch, useSelector } from "react-redux";
import { getDefaultSphere } from '../canvas/components/sphere';


interface NavBarProps {
}


export const MyNavBar: React.FC<NavBarProps> = () => {
    const dispatch = useDispatch();
    const canvasState = useSelector(canvasStateSelector);
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
                                <FontAwesomeIcon icon={faCube} style={{ marginRight: "5px" }} />
                                Cube
                            </Nav.Link>
                            <Nav.Link onClick={() => {
                                let sphere = getDefaultSphere(canvasState, dispatch);
                                dispatch(addComponent(sphere))

                            }}>
                                <FontAwesomeIcon icon={faCircle} style={{ marginRight: "5px" }} />
                                Sphere
                            </Nav.Link>
                        </NavDropdown>
                        <Nav.Link>Import</Nav.Link>
                        <Nav.Link>Export</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )

}
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { faCircle, faCube } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Cube } from "../canvas/components/cube";
import { Component } from "../canvas/components/Component";
import { addComponent, canvasStateSelector, incrementNumberOfGeneratedKey } from "../../store/canvasSlice";
import { useDispatch, useSelector } from "react-redux";
import { Sfera } from "../canvas/components/sfera";

interface NavBarProps {
    orbit: React.MutableRefObject<null>
}

export const MyNavBar: React.FC<NavBarProps> = ({ orbit }) => {
    const dispatch = useDispatch();
    const canvasState = useSelector(canvasStateSelector);

    const getNewKey = () => {
        const newKey = canvasState.numberOfGeneratedKey + 1;
        dispatch(incrementNumberOfGeneratedKey())
        return newKey;
    }

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
                                const cube = <Cube color="red" x={1} y={1} z={1} />;
                                const element = <Component name="Cube" keyComponent={getNewKey()} orbit={orbit}
                                    children={cube}
                                    position={[0, 0, 0]} rotation={[0, 0, 0]}
                                    scale={[1, 1, 1]} />
                                dispatch(addComponent(element));
                            }}>
                                <FontAwesomeIcon icon={faCube} style={{ marginRight: "5px" }} />
                                Cube
                            </Nav.Link>
                            <Nav.Link onClick={() => {
                                const sphere = <Sfera radius={1} widthSegments={6} heightSegments={6} color="yellow" />
                                const element = <Component name="Sphere" keyComponent={getNewKey()} orbit={orbit}
                                    children={sphere} position={[0, 0, 0]} rotation={[0, 0, 0]}
                                    scale={[1, 1, 1]} />
                                dispatch(addComponent(element))
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
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { faCircle, faCube } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Cube, getCube} from "../canvas/components/cube";
import { Component } from "../canvas/components/Component";
import {addComponent, CanvasState, canvasStateSelector, incrementNumberOfGeneratedKey} from "../../store/canvasSlice";
import { useDispatch, useSelector } from "react-redux";
import { Sfera } from "../canvas/components/sfera";
import {Dispatch} from "@reduxjs/toolkit";
import {
    BoxGeometryProps,
    BufferGeometryProps,
    Euler,
    MeshBasicMaterialProps,
    MeshProps,
    Vector3
} from "@react-three/fiber";
import {ComponentEntity} from "../../model/ComponentEntity";
import {BufferGeometry, Material} from "three";
import {Geometry} from "three/examples/jsm/deprecated/Geometry";
import {useGetDefaultComponentByType} from "../../hooks/useGetDefaultComponentByType";
import * as THREE from "three";


interface NavBarProps {

}


export const MyNavBar: React.FC<NavBarProps> = ({  }) => {
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
                                let cube = getCube(canvasState, dispatch);
                                dispatch(addComponent(cube))
                            }}>
                                <FontAwesomeIcon icon={faCube} style={{ marginRight: "5px" }} />
                                Cube
                            </Nav.Link>
                            <Nav.Link onClick={() => {


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
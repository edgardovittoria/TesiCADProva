import React, { ChangeEvent, useEffect, useState } from 'react';
import { ComponentEntity } from "../../../model/ComponentEntity";
import { Dispatch } from "@reduxjs/toolkit";
import { manageTransformation } from '../../canvas/MyCanvas';

interface RotationProps {
    selectedComponent: ComponentEntity
    dispatch: Dispatch
}


function InputElement(props: any) {

    function getValue(): number {
        if (props.axisName === "x") {
            return props.x
        } else if (props.axisName === "y") {
            return props.y
        } else {
            return props.z
        }
    }


    function onChangeInputValueRotation(e: ChangeEvent<HTMLInputElement>) {

        if (props.axisName === "x") {
            manageTransformation(
                'rotate',
                [parseFloat(e.target.value), props.y, props.z],
                props.dispatch
            )

        } else if (props.axisName === "y") {
            manageTransformation(
                'rotate',
                [props.x, parseFloat(e.target.value), props.z],
                props.dispatch
            )

        } else {
            manageTransformation(
                'rotate',
                [props.x, props.y, parseFloat(e.target.value)],
                props.dispatch
            )

        }
    }

    return (
        <input type="number"
            id={props.id}
            step="0.1"
            className="Number"
            autoComplete="off"
            value={getValue()}
            onChange={(e) => {
                onChangeInputValueRotation(e);
            }}
        />
    )
}

export const Rotation: React.FC<RotationProps> = ({ selectedComponent, dispatch }) => {

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [z, setZ] = useState(0);
    useEffect(() => {
        if (selectedComponent !== undefined) {
            let rotation = selectedComponent?.rotation as [number, number, number]
            setX(rotation[0])
            setY(rotation[1])
            setZ(rotation[2])
        }
    }, [selectedComponent, selectedComponent?.rotation]);

    return (
        <>
            <div className="Row transformation" style={{ width: "100%" }}>
                <InputElement id="rotationX" axisName="x" x={x} y={y} z={z} dispatch={dispatch} />
                <InputElement id="rotationY" axisName="y" x={x} y={y} z={z} dispatch={dispatch} />
                <InputElement id="rotationY" axisName="z" x={x} y={y} z={z} dispatch={dispatch} />
            </div>

        </>
    )

}
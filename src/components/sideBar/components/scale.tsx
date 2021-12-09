import React, { ChangeEvent, useEffect, useState } from 'react';
import { ComponentEntity } from "../../../model/ComponentEntity";
import { Dispatch } from "@reduxjs/toolkit";
import { manageTransformation } from '../../canvas/MyCanvas';

interface ScaleProps {
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


    function onChangeInputValue(e: ChangeEvent<HTMLInputElement>) {

        if (props.axisName === "x") {
            manageTransformation(
                'scale',
                [parseFloat(e.target.value), props.y, props.z],
                props.dispatch
            )

        } else if (props.axisName === "y") {
            manageTransformation(
                'scale',
                [props.x, parseFloat(e.target.value), props.z],
                props.dispatch
            )

        } else {
            manageTransformation(
                'scale',
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
                onChangeInputValue(e);
            }}
        />
    )
}

export const Scale: React.FC<ScaleProps> = ({ selectedComponent, dispatch }) => {

    const [x, setX] = useState(1);
    const [y, setY] = useState(1);
    const [z, setZ] = useState(1);
    useEffect(() => {
        if (selectedComponent !== undefined) {
            let scale = selectedComponent?.transformationParams.scale;
            setX(scale[0])
            setY(scale[1])
            setZ(scale[2])
        }
    }, [selectedComponent, selectedComponent?.transformationParams.scale]);

    return (
        <>
            <div className="Row transformation" style={{ width: "100%" }}>
                <InputElement id="scaleX" axisName="x" x={x} y={y} z={z} dispatch={dispatch} />
                <InputElement id="scaleY" axisName="y" x={x} y={y} z={z} dispatch={dispatch} />
                <InputElement id="scaleZ" axisName="z" x={x} y={y} z={z} dispatch={dispatch} />
            </div>

        </>
    )

}
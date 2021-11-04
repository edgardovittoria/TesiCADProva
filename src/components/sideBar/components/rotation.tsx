import React, {ChangeEvent, useEffect, useState} from 'react';
import {CanvasState} from "../../../store/canvasSlice";
import {useDispatch} from "react-redux";
import {manageTransformation} from "../../../hooks/useTransformations";
import {ComponentEntity} from "../../../model/ComponentEntity";
import {Dispatch} from "@reduxjs/toolkit";

interface RotationProps {
    selectedComponent: ComponentEntity
    dispatch: Dispatch
}


function InputElement(props: any){

    function getValue(): number{
        if(props.axisName === "x"){
            return props.x
        }else if(props.axisName === "y"){
            return props.y
        }else{
            return props.z
        }
    }

    function onChangeInputValueRotation (e: ChangeEvent<HTMLInputElement>){
        if(props.axisName === "x"){
            manageTransformation(
                'rotate',
                [parseFloat(e.target.value),props.y, props.z],
                props.dispatch
            )
            
        }else if(props.axisName === "y"){
            manageTransformation(
                'rotate',
                [props.x,parseFloat(e.target.value),props.z],
                props.dispatch
            )
            
        }else{
            manageTransformation(
                'rotate',
                [props.x,props.y,parseFloat(e.target.value)],
                props.dispatch
            )
            
        }
    }

    return(
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

export const Rotation: React.FC<RotationProps> = ({selectedComponent, dispatch}) => {
    let rotation: [number,number,number] = [0,0,0]
    const [x,setX] = useState(0);
    const [y,setY] = useState(0);
    const [z,setZ] = useState(0);
    useEffect(() => {
        if(selectedComponent !== undefined){
            let rotation = selectedComponent?.rotation as [number, number, number]
            setX(rotation[0])
            setY(rotation[1])
            setZ(rotation[2])
        }
    }, [rotation]);

    return(
        <>
            <div className="Row transformation">
                <span className="Text" style={{cursor: "default", display: "inline-block", width: "90px"}}>Rotation</span>
                <InputElement id="rotationX" axisName="x" x={x} y={y} z={z} dispatch={dispatch}/>
                <InputElement id="rotationY" axisName="y" x={x} y={y} z={z} dispatch={dispatch}/>
                <InputElement id="rotationY" axisName="z" x={x} y={y} z={z} dispatch={dispatch}/>
            </div>

        </>
    )

}
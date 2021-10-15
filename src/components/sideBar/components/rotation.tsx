import React, {ChangeEvent, useEffect, useState} from 'react';
import {CanvasState, updatePosition, updateRotation} from "../../../store/canvasSlice";
import {useDispatch} from "react-redux";

interface RotationProps {
    canvasState: CanvasState
}


function InputElement(props: any){
    const dispatch = useDispatch()
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
            dispatch(updateRotation([parseFloat(e.target.value),props.y, props.z]))
        }else if(props.axisName === "y"){
            dispatch(updateRotation([props.x,parseFloat(e.target.value),props.z]))
        }else{
            dispatch(updateRotation([props.x,props.y,parseFloat(e.target.value)]))
        }
    }

    return(
        <input type="number"
               id={props.id}
               style={{cursor: "ns-resize", backgroundColor: "transparent", width: "50px"}}
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

export const Rotation: React.FC<RotationProps> = ({canvasState}) => {
    const [x,setX] = useState(canvasState.selectedComponent?.props.rotation[0]);
    const [y,setY] = useState(canvasState.selectedComponent?.props.rotation[1]);
    const [z,setZ] = useState(canvasState.selectedComponent?.props.rotation[2]);
    useEffect(() => {
        if(canvasState.selectedComponent !== null){
            setX(canvasState.selectedComponent?.props.rotation[0])
            setY(canvasState.selectedComponent?.props.rotation[1])
            setZ(canvasState.selectedComponent?.props.rotation[2])
        }
    }, [canvasState.selectedComponent?.props.rotation]);

    return(
        <>
            <div className="Row">
                <span className="Text" style={{cursor: "default", display: "inline-block", width: "90px"}}>Rotation</span>
                <InputElement id="rotationX" axisName="x" x={x} y={y} z={z}/>
                <InputElement id="rotationY" axisName="y" x={x} y={y} z={z}/>
                <InputElement id="rotationY" axisName="z" x={x} y={y} z={z}/>
            </div>

        </>
    )

}
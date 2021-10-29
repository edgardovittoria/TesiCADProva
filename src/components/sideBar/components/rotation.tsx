import React, {ChangeEvent, useEffect, useState} from 'react';
import {CanvasState} from "../../../store/canvasSlice";
import {useDispatch} from "react-redux";
import {manageTransformation} from "../../../hooks/useTransformations";

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
            manageTransformation(
                'rotate',
                [parseFloat(e.target.value),props.y, props.z],
                dispatch
            )
            
        }else if(props.axisName === "y"){
            manageTransformation(
                'rotate',
                [props.x,parseFloat(e.target.value),props.z],
                dispatch
            )
            
        }else{
            manageTransformation(
                'rotate',
                [props.x,props.y,parseFloat(e.target.value)],
                dispatch
            )
            
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
    let selectedComponent = canvasState.components.filter(component => component.isSelected)[0]
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
            <div className="Row">
                <span className="Text" style={{cursor: "default", display: "inline-block", width: "90px"}}>Rotation</span>
                <InputElement id="rotationX" axisName="x" x={x} y={y} z={z}/>
                <InputElement id="rotationY" axisName="y" x={x} y={y} z={z}/>
                <InputElement id="rotationY" axisName="z" x={x} y={y} z={z}/>
            </div>

        </>
    )

}
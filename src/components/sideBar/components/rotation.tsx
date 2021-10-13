import React, {ChangeEvent, useEffect, useState} from 'react';
import {CanvasState, updatePosition, updateRotation} from "../../../store/canvasSlice";
import {useDispatch} from "react-redux";
import "../css/position.css";

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
            dispatch(updateRotation([parseInt(e.target.value),props.y, props.z]))
        }else if(props.axisName === "y"){
            dispatch(updateRotation([props.x,parseInt(e.target.value),props.z]))
        }else{
            dispatch(updateRotation([props.x,props.y,parseInt(e.target.value)]))
        }
    }

    return(
        <input type="number"
               id={props.id}
               style={{cursor: "ns-resize", backgroundColor: "transparent", width: "50px"}}
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
    let selectedComponent: JSX.Element = <div/>
    if(canvasState.selectedComponent !== -1){
        selectedComponent = canvasState.components.filter(component => component.props.keyComponent === canvasState.selectedComponent)[0];
    }
    const [x,setX] = useState(selectedComponent.props.rotation[0]);
    const [y,setY] = useState(selectedComponent.props.rotation[1]);
    const [z,setZ] = useState(selectedComponent.props.rotation[2]);
    useEffect(() => {
        if(canvasState.selectedComponent !== -1){
            setX(selectedComponent.props.rotation[0])
            setY(selectedComponent.props.rotation[1])
            setZ(selectedComponent.props.rotation[2])
        }
    }, [canvasState.selectedComponent, selectedComponent.props.rotation]);

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
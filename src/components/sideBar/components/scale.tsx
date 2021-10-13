import React, {ChangeEvent, useEffect, useState} from 'react';
import {CanvasState, updateScale} from "../../../store/canvasSlice";
import {useDispatch} from "react-redux";
import "../css/position.css";

interface ScaleProps {
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

    function onChangeInputValue (e: ChangeEvent<HTMLInputElement>){
        if(props.axisName === "x"){
            dispatch(updateScale([parseInt(e.target.value),props.y, props.z]))
        }else if(props.axisName === "y"){
            dispatch(updateScale([props.x,parseInt(e.target.value),props.z]))
        }else{
            dispatch(updateScale([props.x,props.y,parseInt(e.target.value)]))
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
                   onChangeInputValue(e);
               }}
        />
    )
}

export const Scale: React.FC<ScaleProps> = ({canvasState}) => {
    let selectedComponent: JSX.Element = <div/>
    if(canvasState.selectedComponent !== -1){
        selectedComponent = canvasState.components.filter(component => component.props.keyComponent === canvasState.selectedComponent)[0];
    }
    const [x,setX] = useState(selectedComponent.props.scale[0]);
    const [y,setY] = useState(selectedComponent.props.scale[1]);
    const [z,setZ] = useState(selectedComponent.props.scale[2]);
    useEffect(() => {
        if(canvasState.selectedComponent !== -1){
            setX(selectedComponent.props.scale[0])
            setY(selectedComponent.props.scale[1])
            setZ(selectedComponent.props.scale[2])
        }
    }, [canvasState.selectedComponent, selectedComponent.props.scale]);

    return(
        <>
            <div className="Row">
                <span className="Text" style={{cursor: "default", display: "inline-block", width: "90px"}}>Scale</span>
                <InputElement id="scaleX" axisName="x" x={x} y={y} z={z}/>
                <InputElement id="scaleY" axisName="y" x={x} y={y} z={z}/>
                <InputElement id="scaleZ" axisName="z" x={x} y={y} z={z}/>
            </div>

        </>
    )

}
import React, {ChangeEvent, useEffect, useState} from 'react';
import {CanvasState, updateScale} from "../../../store/canvasSlice";
import {useDispatch} from "react-redux";

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
            dispatch(updateScale([parseFloat(e.target.value),props.y, props.z]))
        }else if(props.axisName === "y"){
            dispatch(updateScale([props.x,parseFloat(e.target.value),props.z]))
        }else{
            dispatch(updateScale([props.x,props.y,parseFloat(e.target.value)]))
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
                   onChangeInputValue(e);
               }}
        />
    )
}

export const Scale: React.FC<ScaleProps> = ({canvasState}) => {
    const [x,setX] = useState(canvasState.selectedComponent?.props.scale[0]);
    const [y,setY] = useState(canvasState.selectedComponent?.props.scale[1]);
    const [z,setZ] = useState(canvasState.selectedComponent?.props.scale[2]);
    useEffect(() => {
        if(canvasState.selectedComponent !== null){
            setX(canvasState.selectedComponent?.props.scale[0])
            setY(canvasState.selectedComponent?.props.scale[1])
            setZ(canvasState.selectedComponent?.props.scale[2])
        }
    }, [canvasState.selectedComponent?.props.scale]);

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
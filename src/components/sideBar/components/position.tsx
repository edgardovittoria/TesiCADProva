import React, {ChangeEvent, useEffect, useState} from 'react';
import {CanvasState, updatePosition} from "../../../store/canvasSlice";
import {useDispatch} from "react-redux";
import "../css/position.css";

interface PositionProps {
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
            dispatch(updatePosition([parseInt(e.target.value),0, 0]))
        }else if(props.axisName === "y"){
            dispatch(updatePosition([props.x,parseInt(e.target.value),props.z]))
        }else{
            dispatch(updatePosition([props.x,props.y,parseInt(e.target.value)]))
        }
    }

    return(
        <input type="number"
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

export const Position: React.FC<PositionProps> = ({canvasState}) => {
    let selectedComponent: JSX.Element = <div/>
    if(canvasState.selectedComponent !== -1){
        selectedComponent = canvasState.components.filter(component => component.props.keyComponent === canvasState.selectedComponent)[0];
    }
    const [x,setX] = useState(selectedComponent.props.position.x);
    const [y,setY] = useState(selectedComponent.props.position.y);
    const [z,setZ] = useState(selectedComponent.props.position.z);
    useEffect(() => {
        if(canvasState.selectedComponent !== -1){
            setX(selectedComponent.props.position.x)
            setY(selectedComponent.props.position.y)
            setZ(selectedComponent.props.position.z)
        }
    }, [canvasState]);

    return(
        <>
            <div className="Row">
                <span className="Text" style={{cursor: "default", display: "inline-block", width: "90px"}}>Position</span>
                <InputElement axisName="x" x={x} y={y} z={z}/>
                <InputElement axisName="y" x={x} y={y} z={z}/>
                <InputElement axisName="z" x={x} y={y} z={z}/>
            </div>

        </>
    )

}
import React, {ChangeEvent, useEffect, useState} from 'react';
import {CanvasState} from "../../../store/canvasSlice";
import {useDispatch} from "react-redux";
import {ComponentEntity} from "../../../model/ComponentEntity";
import {manageTransformation} from "../../../hooks/useTransformations";

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
            manageTransformation(
                'translate',
                [parseFloat(e.target.value),props.y, props.z],
                dispatch
            )
            
        }else if(props.axisName === "y"){
            manageTransformation(
                'translate',
                [props.x,parseFloat(e.target.value),props.z],
                dispatch
            )
            
        }else{
            manageTransformation(
                'translate',
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
                   onChangeInputValue(e);
               }}
        />
    )
}

export const Position: React.FC<PositionProps> = ({canvasState}) => {
    let selectedComponent: ComponentEntity = canvasState.components.filter(component => component.isSelected)[0]
    let position: [number, number, number] = [0,0,0];
    const [x,setX] = useState(0);
    const [y,setY] = useState(0);
    const [z,setZ] = useState(0);
    useEffect(() => {
        if(selectedComponent !== undefined){
            position = selectedComponent?.position as [number, number, number]
             setX(position[0])
             setY(position[1])
             setZ(position[2])
        }
    }, [canvasState.components]);

    return(
        <>
            <div className="Row">
                <span className="Text" style={{cursor: "default", display: "inline-block", width: "90px"}}>Position</span>
                <InputElement id="translateX" axisName="x" x={x} y={y} z={z}/>
                <InputElement id="translateY" axisName="y" x={x} y={y} z={z}/>
                <InputElement id="translateZ" axisName="z" x={x} y={y} z={z}/>
            </div>

        </>
    )

}
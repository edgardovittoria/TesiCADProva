import React, {ChangeEvent, useEffect, useState} from 'react';
import {CanvasState, selectComponent, updatePosition} from "../../../store/canvasSlice";
import {useDispatch} from "react-redux";
import {ComponentEntity} from "../../../model/ComponentEntity";

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
            dispatch(updatePosition([parseFloat(e.target.value),props.y, props.z]))
        }else if(props.axisName === "y"){
            dispatch(updatePosition([props.x,parseFloat(e.target.value),props.z]))
        }else{
            dispatch(updatePosition([props.x,props.y,parseFloat(e.target.value)]))
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
            //console.log(selectedComponent)
            console.log(selectedComponent)
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
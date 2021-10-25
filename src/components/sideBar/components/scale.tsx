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
    let selectedComponent = canvasState.components.filter(component => component.isSelected)[0]
    let scale : [number,number,number] = [1,1,1]
    const [x,setX] = useState(1);
    const [y,setY] = useState(1);
    const [z,setZ] = useState(1);
    useEffect(() => {
        if(selectedComponent !== undefined){
            let scale = selectedComponent?.scale as [number, number, number];
            setX(scale[0])
            setY(scale[1])
            setZ(scale[2])
        }
    }, [scale]);

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
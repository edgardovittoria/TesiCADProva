import React, {ChangeEvent, useEffect, useState} from 'react';
import {CanvasState} from "../../../store/canvasSlice";
import {useDispatch, useSelector} from "react-redux";
import {ComponentEntity} from "../../../model/ComponentEntity";
import {Dispatch} from "@reduxjs/toolkit";
import { manageTransformation } from '../../canvas/MyCanvas';
import { useThree } from '@react-three/fiber';
import { keySelectedComponenteSelector } from '../../../store/canvasSlice.old';
import { meshWithcomputedGeometryBoundingFrom } from '../../../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings.old.old';

interface PositionProps {
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

    
    function onChangeInputValue (e: ChangeEvent<HTMLInputElement>){
        if(props.axisName === "x"){
            manageTransformation(
                'translate',
                [parseFloat(e.target.value),props.y, props.z],
                props.dispatch
            )
            
        }else if(props.axisName === "y"){
            manageTransformation(
                'translate',
                [props.x,parseFloat(e.target.value),props.z],
                props.dispatch
            )
            
        }else{
            manageTransformation(
                'translate',
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
                   onChangeInputValue(e);
               }}
        />
    )
}

export const Position: React.FC<PositionProps> = ({selectedComponent, dispatch}) => {
    
    const [x,setX] = useState(0);
    const [y,setY] = useState(0);
    const [z,setZ] = useState(0);
    useEffect(() => {
        if(selectedComponent !== undefined){
           let position = selectedComponent?.position as [number, number, number]
             setX(position[0])
             setY(position[1])
             setZ(position[2])
        }
    }, [selectedComponent, selectedComponent?.position]);

    return(
        <>
            <div className="Row transformation" style={{ width: "100%", right: 0}}>
                <InputElement id="translateX" axisName="x" x={x} y={y} z={z} dispatch={dispatch}/>
                <InputElement id="translateY" axisName="y" x={x} y={y} z={z} dispatch={dispatch}/>
                <InputElement id="translateZ" axisName="z" x={x} y={y} z={z} dispatch={dispatch}/>
            </div>

        </>
    )

}
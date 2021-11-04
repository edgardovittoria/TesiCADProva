import React from 'react';
import {ComponentEntity} from "../../../model/ComponentEntity";
import {Dispatch} from "@reduxjs/toolkit";
import {updateColor} from "../../../store/canvasSlice";

interface ColorProps {
    selectedComponent: ComponentEntity
    dispatch: Dispatch
}

export const Color: React.FC<ColorProps> = ({selectedComponent, dispatch}) => {
    return (
        <div className="Row" style={{marginTop: "20px"}}>
            <span className="Text" style={{cursor: "default", display: "inline-block", width: "90px"}}>Color</span>
            <input type="Color"
                   style={{cursor: "ns-resize", backgroundColor: "transparent", width: "50px"}}
                   autoComplete="off"
                   value={selectedComponent.color}
                   onChange={(e) => {
                       e.preventDefault()
                       dispatch(updateColor({key: selectedComponent.keyComponent, color: e.target.value}))
                   }}
            />
        </div>
    )

}
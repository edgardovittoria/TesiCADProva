import React from 'react';
import {ComponentEntity} from "../../../model/ComponentEntity";
import {Dispatch} from "@reduxjs/toolkit";
import {updateColor} from "../../../store/canvasSlice";

import "../style/color.css"

interface ColorProps {
    selectedComponent: ComponentEntity
    dispatch: Dispatch
}

export const Color: React.FC<ColorProps> = ({selectedComponent, dispatch}) => {
    return (
        <div className="Row colorRow">
            <span className="colorText">Color</span>
            <input type="Color"
                   className="colorInput"
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
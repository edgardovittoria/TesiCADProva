import React from 'react';
import {Dispatch} from "@reduxjs/toolkit";
import "../style/color.css"
import { ComponentEntity, updateColor } from '@Draco112358/cad-library';

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
import React, { useEffect, useState } from 'react';
import { CanvasState, selectComponent } from "../../../store/canvasSlice";
import { useDispatch } from "react-redux";

interface OutlinerProps {
    canvasState: CanvasState,
}

export const Outliner: React.FC<OutlinerProps> = ({ canvasState }) => {

    const [optionActive, setOptionActive] = useState("");
    useEffect(() => {
        let selectedComponent = canvasState.components.filter(component => component.isSelected)[0]
        if (selectedComponent !== undefined) {
            setOptionActive(selectedComponent.keyComponent.toString())
        }
    }, [canvasState.components]);

    const dispatch = useDispatch();

    return (
        <>
            <div id="outliner" className="Outliner" tabIndex={0}>
                <div className={(optionActive === "Scene") ? "option active" : "option"} draggable={false} onClick={() => { setOptionActive("Scene") }}>
                    <span className="type Scene" />
                    Scene
                </div>
                {canvasState.components.map(component => {
                    return (
                        <div
                            key={component.keyComponent}
                            className={(component.isSelected) ? "option active" : "option"}
                            onClick={() => {
                                dispatch(selectComponent(component.keyComponent))
                            }}>
                            <span className="opener" />
                            <span className="type Mesh" />
                            {component.name + component.keyComponent}
                        </div>
                    )
                })}
            </div>
        </>
    )

}
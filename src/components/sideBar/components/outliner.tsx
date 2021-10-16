import React, { useEffect, useState } from 'react';
import { CanvasState, selectComponent } from "../../../store/canvasSlice";
import { useDispatch } from "react-redux";

interface OutlinerProps {
    canvasState: CanvasState,
}

export const Outliner: React.FC<OutlinerProps> = ({ canvasState }) => {

    const [optionActive, setOptionActive] = useState("");
    useEffect(() => {
        let selectedComponent = canvasState.components.filter(component => component.props.isSelected)[0]
        if (selectedComponent !== undefined) {
            setOptionActive(selectedComponent.props.keyComponent.toString())
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
                            className={(component.props.isSelected) ? "option active" : "option"}
                            onClick={() => {
                                dispatch(selectComponent(component.props.keyComponent))
                            }}>
                            <span className="opener" />
                            <span className="type Mesh" />
                            {component.props.name + component.props.keyComponent}
                        </div>
                    )
                })}
            </div>
        </>
    )

}
import React, {useEffect, useState} from 'react';
import {CanvasState} from "../../../store/canvasSlice";
import { OutlinerItem } from './outlinerItem';

interface OutlinerProps {
    canvasState: CanvasState,
}

export const Outliner: React.FC<OutlinerProps> = ({canvasState}) => {

    const [optionActive, setOptionActive] = useState("");
    useEffect(() => {
        let selectedComponent = canvasState.components.filter(component => component.keyComponent === canvasState.selectedComponentKey)[0]
        if (selectedComponent !== undefined) {
            setOptionActive(selectedComponent.keyComponent.toString())
        }
    }, [canvasState.components]);

    return (
        <>
            <div id="outliner" className="Outliner" tabIndex={0}>
                <div className={(optionActive === "Scene") ? "option active" : "option"} draggable={false}
                     onClick={() => {
                         setOptionActive("Scene")
                     }}>
                    <span className="type Scene"/>
                    Scene
                </div>
                {canvasState.components.map(component => {
                    return (
                        <OutlinerItem key={component.keyComponent + component.name} keyComponent={component.keyComponent} nameComponent={component.name} isSelelctedComponent={component.keyComponent === canvasState.selectedComponentKey} />
                    )
                })}
            </div>
        </>
    )

}
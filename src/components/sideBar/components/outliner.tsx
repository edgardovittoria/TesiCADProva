import React, {useEffect, useState} from 'react';
import {CanvasState, selectComponent, updateName} from "../../../store/canvasSlice";
import {useDispatch} from "react-redux";

interface OutlinerProps {
    canvasState: CanvasState,
}

export const Outliner: React.FC<OutlinerProps> = ({canvasState}) => {

    const [optionActive, setOptionActive] = useState("");
    useEffect(() => {
        let selectedComponent = canvasState.components.filter(component => component.isSelected)[0]
        if (selectedComponent !== undefined) {
            setOptionActive(selectedComponent.keyComponent.toString())
        }
    }, [canvasState.components]);

    const dispatch = useDispatch();

    const [outlinerItemVisibility, setOutlinerItemVisibility] = useState(true);
    const [inputItemVisibility, setInputItemVisibility] = useState(false);

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
                        <>
                            <div
                                key={component.keyComponent}
                                className={(component.isSelected) ? "option active" : "option"}
                                onClick={() => {
                                    dispatch(selectComponent(component.keyComponent))
                                }}
                                onDoubleClick={() => {
                                    setOutlinerItemVisibility(false)
                                    setInputItemVisibility(true)
                                }}
                                hidden={!outlinerItemVisibility}
                            >
                                <span className="opener"/>
                                <span className="type Mesh"/>
                                {component.name}
                            </div>
                            <div hidden={!inputItemVisibility}>
                                <input
                                    type="text"
                                    defaultValue={component.name + component.keyComponent}
                                    onBlur={(e) => {
                                        dispatch(updateName({key: component.keyComponent, name: e.currentTarget.value}))
                                        setInputItemVisibility(false)
                                        setOutlinerItemVisibility(true)
                                    }}
                                />
                            </div>
                        </>

                    )
                })}
            </div>
        </>
    )

}
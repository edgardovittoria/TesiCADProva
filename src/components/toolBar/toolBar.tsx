import React from 'react';
import "./toolbar.css";
import {useDispatch, useSelector} from "react-redux";
import {setTransformationActive, toolbarTransformationStateSelector} from "../../store/toolbarTransformationSlice";

interface ToolBarProps {
}

export const ToolBar: React.FC<ToolBarProps> = () => {
    const toolbarTransformationState = useSelector(toolbarTransformationStateSelector);
    const dispatch = useDispatch();
    return(
        <>
            <div id="toolbar" className="Panel">
                {toolbarTransformationState.transformation.map((transformation, index) => {
                    return(
                        <button key={index} className={(transformation.active) ? "Button selected" : "Button"} onClick={() => dispatch(setTransformationActive(transformation.type))}>
                            {transformation.type}
                        </button>
                    )
                })}
            </div>
        </>
    )

}
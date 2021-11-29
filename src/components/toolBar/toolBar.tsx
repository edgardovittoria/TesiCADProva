import React from 'react';
import "./toolbar.css";
import {useDispatch, useSelector} from "react-redux";
import {setTransformationActive, toolbarTransformationStateSelector} from "../../store/toolbarTransformationSlice";
import {Image, Tooltip} from "react-bootstrap";

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
                        <Tooltip title={transformation.type} key={index}>
                            <button  className={(transformation.active) ? "Button selected" : "Button"} onClick={() => dispatch(setTransformationActive(transformation.type))}>
                                <Image src={transformation.icon} alt={transformation.type} width={30} height={30}/>
                            </button>
                        </Tooltip>

                    )
                })}
            </div>
        </>
    )

}
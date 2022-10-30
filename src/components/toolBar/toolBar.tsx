import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setTransformationActive, toolbarTransformationStateSelector} from "../../store/toolbarTransformationSlice";

interface ToolBarProps {
}

export const ToolBar: React.FC<ToolBarProps> = () => {
    const toolbarTransformationState = useSelector(toolbarTransformationStateSelector);
    const dispatch = useDispatch();
    return(
        <>
            <div className="absolute left-[15px] top-[40px] w-[50px] text-center shadow">
                {toolbarTransformationState.transformation.map((transformation, index) => {
                    return(
                        <div className={`relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group hover:bg-gray-300 hover:cursor-pointer
                             ${transformation.active ? 'bg-gray-300' : 'bg-white'}`}
                             onClick={() => dispatch(setTransformationActive(transformation.type))}
                        >
                            <img src={transformation.icon} alt={transformation.type}
                                 className="text-black w-7 h-7"
                            />
                            <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
                                <span className="relative z-10 p-2 text-xl leading-none uppercase text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">{transformation.type}</span>
                            </div>
                        </div>

                    )
                })}
            </div>
        </>
    )

}
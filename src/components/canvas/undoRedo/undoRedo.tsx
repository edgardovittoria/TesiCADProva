import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Image, Tooltip } from "react-bootstrap";
import { ActionCreators } from "redux-undo"
import { canvasAllStateSelector } from '../../../store/canvasSlice';

interface UndoRedoProps {
}

export const UndoRedo: React.FC<UndoRedoProps> = () => {
    const dispatch = useDispatch();
    const canvasAllStates = useSelector(canvasAllStateSelector)
    return (
        <>
            <div id="undoredo" >

                <Tooltip title="Undo last action">
                    <button onClick={() => dispatch(ActionCreators.undo())}>
                        <Image src="" alt="undo last action" width={30} height={30} />
                    </button>
                </Tooltip>
                <Tooltip title="Redo last action">
                    <button onClick={() => dispatch(ActionCreators.redo())}>
                        <Image src="" alt="redo last action" width={30} height={30} />
                    </button>
                </Tooltip>

            </div>
        </>
    )

}
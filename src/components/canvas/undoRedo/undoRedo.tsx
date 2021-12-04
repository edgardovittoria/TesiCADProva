import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Image, Tooltip } from "react-bootstrap";
import { ActionCreators } from "redux-undo"
import { lastActionTypeSelector, lengthFutureStateSelector, lengthPastStateSelector } from '../../../store/canvasSlice';

import './style/undoRedo.css'

interface UndoRedoProps {
}

export const UndoRedo: React.FC<UndoRedoProps> = () => {
    const dispatch = useDispatch();
    const pastStateLength = useSelector(lengthPastStateSelector)
    const futureStateLength = useSelector(lengthFutureStateSelector)
    const lastActionType = useSelector(lastActionTypeSelector)
    const [undoActions, setundoActions] = useState<string[]>([])
    return (
        <>
            <div className="container-undo-redo">

                <Tooltip title="Undo last action" className="shadow-undo-redo">
                    {pastStateLength > 0 ?
                        <button className="btn-undo-redo" onClick={() => {

                            if (lastActionType === 'canvas/subtraction'
                                || lastActionType === 'canvas/union'
                                || lastActionType === 'canvas/intersection'
                            ) {
                                dispatch(ActionCreators.jump(-2))
                                setundoActions([...undoActions, lastActionType])

                            } else {
                                setundoActions([...undoActions, lastActionType])
                                dispatch(ActionCreators.undo())

                            }
                        }}>
                            <Image src="/undo.png" alt="undo last action" width={45} height={30} />
                        </button>
                        :
                        <button className="btn-undo-redo-disabled" disabled>
                            <Image src="/undoDisabled.png" alt="undo last action" width={45} height={30} />
                        </button>
                    }
                </Tooltip>
                <Tooltip title="Redo last action" className="shadow-undo-redo">
                    {futureStateLength > 0 ?
                        <button className="btn-undo-redo" onClick={() => {
                            let newUndoActions = [...undoActions]
                            newUndoActions.pop()
                            if (undoActions[undoActions.length - 1] === 'canvas/subtraction'
                                || undoActions[undoActions.length - 1] === 'canvas/union'
                                || undoActions[undoActions.length - 1] === 'canvas/intersection') {

                                setundoActions(newUndoActions)
                                dispatch(ActionCreators.jump(2))

                            } else {

                                setundoActions(newUndoActions)
                                dispatch(ActionCreators.redo())
                            }
                        }}>
                            <Image src="/redo.png" alt="redo last action" width={45} height={30} />
                        </button>
                        :
                        <button className="btn-undo-redo-disabled" disabled>
                            <Image src="/redoDisabled.png" alt="redo last action" width={45} height={30} />
                        </button>
                    }
                </Tooltip>

            </div>
        </>
    )

}
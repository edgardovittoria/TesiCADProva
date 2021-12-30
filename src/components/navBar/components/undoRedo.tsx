import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Nav} from "react-bootstrap";
import { ActionCreators } from "redux-undo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedo, faUndo} from "@fortawesome/free-solid-svg-icons";
import {Dispatch} from "@reduxjs/toolkit";
import { lastActionTypeSelector, lengthFutureStateSelector, lengthPastStateSelector } from '@Draco112358/cad-library';

interface UndoRedoProps {
}

export const undoFunction = (lastActionType: string, undoActions: string[], setundoActions: Function, dispatch: Dispatch) => {
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
}

export const redoFunction = (undoActions: string[], setundoActions: Function, dispatch: Dispatch) => {
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
}

export const UndoRedo: React.FC<UndoRedoProps> = () => {
    const dispatch = useDispatch();
    const pastStateLength = useSelector(lengthPastStateSelector)
    const futureStateLength = useSelector(lengthFutureStateSelector)
    const lastActionType = useSelector(lastActionTypeSelector)
    const [undoActions, setundoActions] = useState<string[]>([])
    return (
        <>
                    {pastStateLength > 0 ?
                        <Nav.Link onClick={() => {
                            undoFunction(lastActionType, undoActions, setundoActions, dispatch)
                        }}>
                            <div className="row">
                                <div className="dropdownItem col-8">
                                    <FontAwesomeIcon icon={faUndo} style={{marginRight: "5px"}}/>
                                    <span>Undo Last Action</span>
                                </div>
                                <div className="keyboardShortcut  col-4">
                                    <span>Ctrl + z</span>
                                </div>

                            </div>
                        </Nav.Link>
                        :
                        <Nav.Link>
                            <div className="dropdownItemDisabled">
                                <FontAwesomeIcon icon={faUndo} style={{marginRight: "5px"}}/>
                                <span>Undo Last Action</span>
                            </div>
                        </Nav.Link>
                    }

                    {futureStateLength > 0 ?
                        <Nav.Link onClick={() => {
                            redoFunction(undoActions, setundoActions, dispatch)
                        }}>
                            <div className="row">
                                <div className="dropdownItem col-8">
                                    <FontAwesomeIcon icon={faRedo} style={{marginRight: "5px"}}/>
                                    <span>Redo Last Action</span>
                                </div>
                                <div className="keyboardShortcut  col-4">
                                    <span>Ctrl + x</span>
                                </div>
                            </div>
                        </Nav.Link>
                        :
                        <Nav.Link>
                            <div className="dropdownItemDisabled">
                                <FontAwesomeIcon icon={faRedo} style={{marginRight: "5px"}}/>
                                <span>Redo Last Action</span>
                            </div>
                        </Nav.Link>
                    }

        </>
    )

}
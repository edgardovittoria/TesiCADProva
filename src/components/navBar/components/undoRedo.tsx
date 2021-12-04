import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Nav} from "react-bootstrap";
import { ActionCreators } from "redux-undo"
import { lastActionTypeSelector, lengthFutureStateSelector, lengthPastStateSelector } from '../../../store/canvasSlice';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedo, faUndo} from "@fortawesome/free-solid-svg-icons";

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
                    {pastStateLength > 0 ?
                        <Nav.Link onClick={() => {

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
                            <div className="dropdownItem">
                                <FontAwesomeIcon icon={faUndo} style={{marginRight: "5px"}}/>
                                <span>Undo Last Action</span>
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
                            <div className="dropdownItem">
                                <FontAwesomeIcon icon={faRedo} style={{marginRight: "5px"}}/>
                                <span>Redo Last Action</span>
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
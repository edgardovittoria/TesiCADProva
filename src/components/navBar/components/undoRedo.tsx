import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Nav} from "react-bootstrap";
import {ActionCreators} from "redux-undo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedo, faUndo} from "@fortawesome/free-solid-svg-icons";
import {Dispatch} from "@reduxjs/toolkit";
import {
    lastActionTypeSelector,
    lengthFutureStateSelector,
    lengthPastStateSelector,
} from "cad-library";

interface UndoRedoProps {
}

export const undoFunction = (
    lastActionType: string,
    undoActions: string[],
    setundoActions: Function,
    dispatch: Dispatch
) => {
    setundoActions([...undoActions, lastActionType]);
    dispatch(ActionCreators.undo());
};

export const redoFunction = (
    undoActions: string[],
    setundoActions: Function,
    dispatch: Dispatch
) => {
    let newUndoActions = [...undoActions];
    newUndoActions.pop();
    setundoActions(newUndoActions);
    dispatch(ActionCreators.redo());
};

export const UndoRedo: React.FC<UndoRedoProps> = () => {
    const dispatch = useDispatch();
    const pastStateLength = useSelector(lengthPastStateSelector);
    const futureStateLength = useSelector(lengthFutureStateSelector);
    const lastActionType = useSelector(lastActionTypeSelector);
    const [undoActions, setundoActions] = useState<string[]>([]);
    return (
        <>
            {pastStateLength > 0 ? (
                <div
                    onClick={() => {
                        undoFunction(lastActionType, undoActions, setundoActions, dispatch);
                    }}
                >

                    <div className="-m-3 flex items-center rounded-lg p-2 hover:bg-gray-50">
                        <FontAwesomeIcon icon={faUndo} className="text-gray-900 mr-5"/>
                        <span className="text-base font-medium text-gray-900">Undo Last Action</span>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="-m-3 flex items-center rounded-lg p-2 hover:bg-gray-50">
                        <FontAwesomeIcon icon={faUndo} className="text-gray-300 mr-5"/>
                        <span>Undo Last Action</span>
                    </div>
                </div>
            )}

            {futureStateLength > 0 ? (
                <div
                    onClick={() => {
                        redoFunction(undoActions, setundoActions, dispatch);
                    }}
                >

                        <div className="-m-3 flex items-center rounded-lg p-2 hover:bg-gray-50">
                            <FontAwesomeIcon icon={faRedo} className="text-gray-900 mr-5"/>
                            <span className="text-base font-medium text-gray-900">Redo Last Action</span>
                        </div>
                </div>
            ) : (
                <div>
                    <div className="-m-3 flex items-center rounded-lg p-2 hover:bg-gray-50">
                        <FontAwesomeIcon icon={faRedo} className="text-gray-300 mr-5"/>
                        <span className="text-base font-medium text-gray-300">Redo Last Action</span>
                    </div>
                </div>
            )}
        </>
    );
};

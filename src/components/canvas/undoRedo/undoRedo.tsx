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
            <div className="absolute top-5 right-5 flex flex-row">

                <Tooltip title="Undo last action" className="shadow-cad">
                    {canvasAllStates.past.length > 0 ?
                        <button className="hover:bg-navbarPrimary" onClick={() => {
                            if(localStorage.getItem('lastAction') === 'subtraction' || 'union' || 'intersection'){
                                dispatch(ActionCreators.jump(-2))
                            }
                            dispatch(ActionCreators.undo())
                        }}>
                            <Image src="/undo.png" alt="undo last action" width={45} height={30}/>
                        </button>
                        :
                        <button className="disabled:opacity-90" disabled>
                            <Image src="/undoDisabled.png" alt="undo last action" width={45} height={30}/>
                        </button>
                    }
                </Tooltip>
                <Tooltip title="Redo last action" className="shadow-cad hover:bg-white">
                    {canvasAllStates.future.length > 0 ?
                        <button className="hover:bg-navbarPrimary" onClick={() => {
                            if(localStorage.getItem('lastAction') === 'subtraction' || 'union' || 'intersection'){
                                dispatch(ActionCreators.jump(2))
                            }
                            dispatch(ActionCreators.redo())
                        }}>
                            <Image src="/redo.png" alt="redo last action" width={45} height={30}/>
                        </button>
                        :
                        <button className="disabled:opacity-90" disabled>
                            <Image src="/redoDisabled.png" alt="redo last action" width={45} height={30}/>
                        </button>
                    }
                </Tooltip>

            </div>
        </>
    )

}
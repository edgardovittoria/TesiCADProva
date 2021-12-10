import React, {useEffect, useState} from 'react';
import {FormSelect, Modal, Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    CanvasState,
    findComponentByKey, intersection,
    subtraction, union
} from "../../store/canvasSlice";
import {canvasStateSelector} from '../../store/canvasSlice';
import {ComponentEntity, CompositeEntity} from '../../model/ComponentEntity';
import {getNewKeys} from '../canvas/components/cube';
import {Dispatch} from '@reduxjs/toolkit';

import './style/makeBinaryOperation.css'

interface MakeBinaryOpProps {
    collisions: [number, number][],
    setCollisions: Function,
}


export const MakeBinaryOp: React.FC<MakeBinaryOpProps> = (
    {
        collisions,
        setCollisions,
    }) => {
    const dispatch = useDispatch();


    const [selectedOperation, setSelectedOperation] = useState("SUBTRACTION");
    const [spinner, setSpinner] = useState(false);
    const canvas = useSelector(canvasStateSelector)


    useEffect(() => {
        if (spinner) {
            makeBinaryOperation(selectedOperation, collisions, canvas, dispatch)
            setCollisions([])
            setSpinner(false)
        }
    }, [spinner, selectedOperation, collisions, canvas, dispatch, setCollisions])

    return (
            <Modal show={true}>
                <div className="modalContent">
                    <Modal.Header>
                        <Modal.Title>BINARY OPERATIONS</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p>Select the binary operation you'd like to be made</p>
                        </div>
                        <FormSelect
                            onChange={(event) => setSelectedOperation(event.currentTarget.value)}
                            defaultValue={(selectedOperation) ? selectedOperation : "SUBTRACTION"}
                            className="selectOperation"
                        >
                            <option value="SUBTRACTION">SUBTRACTION</option>
                            <option value="INTERSECTION">INTERSECTION</option>
                            <option value="UNION">UNION</option>
                        </FormSelect>
                    </Modal.Body>
                    <Modal.Footer>
                        {spinner
                            ?
                            <button type="button"
                                    className="btn-modal"
                                    disabled>
                                <Spinner className="spinner-modal" animation="border" size="sm"/>
                                Processing
                            </button>
                            :
                            <button className="btn-modal"
                                    onClick={() => {
                                        setSpinner(true)
                                    }}>
                                Proceed
                            </button>
                        }
                    </Modal.Footer>
                </div>

            </Modal>
    )

}

const compositeEntityFromOperationBetweenTwoEntities = (elementA: ComponentEntity, elementB: ComponentEntity, operation: string, newKeys: number[], offsetKeys: number) => {
    let compositeEntity: CompositeEntity = {
        ...elementA,
        baseElements: {
            elementA: {...elementA, keyComponent: newKeys[offsetKeys]},
            elementB: {...elementB, keyComponent: newKeys[1 + offsetKeys]}
        },
        type: operation,
        keyComponent: newKeys[2 + offsetKeys]
    }
    return compositeEntity
}

const makeBinaryOperation = (operation: string, collisions: [number, number][], canvasState: CanvasState, dispatch: Dispatch) => {
    let newKeysSub = getNewKeys(canvasState.numberOfGeneratedKey, dispatch, 4 * collisions.length)
    switch (operation) {
        case "UNION":
            let result = collisions.reduce((componentResult: CompositeEntity, [, elementB], index) => {
                let entityB = findComponentByKey(canvasState.components, elementB)
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(componentResult, entityB, operation, newKeysSub, indexKey)
            }, findComponentByKey(canvasState.components, collisions[0][0]) as CompositeEntity)
            let elementsToRemoveUnion: number[] = [collisions[0][0]]
            collisions.map(([, elementB]) => {
                elementsToRemoveUnion.push(elementB)
                return null
            })
            dispatch(union({elementsToRemove: elementsToRemoveUnion, newEntity: result}))
            break;
        case "SUBTRACTION":
            let resultSUB = collisions.map(([elementA, elementB], index) => {
                let entityA = findComponentByKey(canvasState.components, elementA)
                let entityB = findComponentByKey(canvasState.components, elementB)
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(entityB, entityA, operation, newKeysSub, indexKey)
            })
            let elementACopy: ComponentEntity = {
                ...findComponentByKey(canvasState.components, collisions[0][0]),
            }
            elementACopy.keyComponent = newKeysSub[newKeysSub.length - 1];
            elementACopy.transformationParams = elementACopy.previousTransformationParams
            let elementsToRemove: number[] = [collisions[0][0]]
            collisions.map(([, elementB]) => {
                elementsToRemove.push(elementB)
                return null
            })
            dispatch(subtraction({
                elementsToRemove: elementsToRemove,
                newEntity: resultSUB,
                selectedEntityCopy: elementACopy
            }))
            break;
        case "INTERSECTION":
            let resultINT = collisions.map(([elementA, elementB], index) => {
                let entityA = findComponentByKey(canvasState.components, elementA)
                let entityB = findComponentByKey(canvasState.components, elementB)
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(entityB, entityA, operation, newKeysSub, indexKey)
            })
            let elementsToRemoveIntersection: number[] = [collisions[0][0]]
            collisions.map(([, elementB]) => {
                elementsToRemoveIntersection.push(elementB)
                return null
            })
            dispatch(intersection({elementsToRemove: elementsToRemoveIntersection, newEntity: resultINT}))
            break;
    }
    return "operation completed"
}
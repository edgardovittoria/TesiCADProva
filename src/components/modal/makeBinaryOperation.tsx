import React, {useEffect, useState} from 'react';
import {FormSelect, Modal, Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from '@reduxjs/toolkit';
import './style/makeBinaryOperation.css'
import { useCollisions } from '../contexts/useCollisions';
import { BinaryOperationType, CanvasState, canvasStateSelector, ComponentEntity, ComponentTypes, CompositeEntity, findComponentByKey, GeometryAttributes, getNewKeys, intersection, lastActionTypeSelector, subtraction, union } from '@Draco112358/cad-library';

interface MakeBinaryOpProps {
}


export const MakeBinaryOp: React.FC<MakeBinaryOpProps> = () => {
    const dispatch = useDispatch();
    const {collisions, resetCollisions} = useCollisions()
    const lastActionType = useSelector(lastActionTypeSelector)


    const [selectedOperation, setSelectedOperation] = useState("SUBTRACTION");
    const [spinner, setSpinner] = useState(false);
    const canvas = useSelector(canvasStateSelector)


    useEffect(() => {
        if (spinner) {
            makeBinaryOperation(selectedOperation as BinaryOperationType, collisions, canvas, dispatch, lastActionType)
            resetCollisions()
            setSpinner(false)
        }
    }, [spinner, selectedOperation, collisions, canvas, dispatch, resetCollisions, lastActionType])

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

const compositeEntityFromOperationBetweenTwoEntities = (elementA: ComponentEntity, elementB: ComponentEntity, type: ComponentTypes, newKeys: number[], offsetKeys: number) => {
    let compositeEntity: CompositeEntity = {
        ...elementA,
        baseElements: {
            elementA: {...elementA, keyComponent: newKeys[offsetKeys]},
            elementB: {...elementB, keyComponent: newKeys[1 + offsetKeys]}
        },
        type: type,
        keyComponent: newKeys[2 + offsetKeys],
        geometryAttributes: {} as GeometryAttributes
    }
    return compositeEntity
}

const makeBinaryOperation = (operation: BinaryOperationType, collisions: [number, number][], canvasState: CanvasState, dispatch: Dispatch, lastActionType: string) => {
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
            if(lastActionType === "canvas/updateTransformationParams"){
                elementACopy.transformationParams = elementACopy.previousTransformationParams
            }
            else if(elementACopy.previousGeometryAttributes !== undefined){
                elementACopy.geometryAttributes = elementACopy.previousGeometryAttributes
            }
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
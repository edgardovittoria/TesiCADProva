import React, {useEffect, useState} from 'react';
import {FormSelect, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    addComponent,
    CanvasState,
    findComponentByKey, intersection,
    removeComponent,
    selectComponent,
    subtraction, union
} from "../../store/canvasSlice";
import * as THREE from "three"
import {canvasStateSelector} from '../../store/canvasSlice';
import {ComponentEntity, CompositeEntity} from '../../model/ComponentEntity';
import {getNewKeys} from '../canvas/components/cube';
import {Dispatch} from '@reduxjs/toolkit';

import './style/makeBinaryOperation.css'

interface MakeBinaryOpProps {
    collisions: [THREE.Mesh, THREE.Mesh][],
    setCollisions: Function,
}


export const MakeBinaryOp: React.FC<MakeBinaryOpProps> = (
    {
        collisions,
        setCollisions,
    }) => {
    const dispatch = useDispatch();


    const [selectedOperation, setSelectedOperation] = useState("SUBTRACTION");
    const [show, setShow] = useState(false)
    const [spinner, setSpinner] = useState(false);
    const canvas = useSelector(canvasStateSelector)


    const handleClose = () => {
        setSpinner(true)
    };

    useEffect(() => {
        setShow(collisions.length > 0)
    }, [collisions])

    useEffect(() => {
        if (spinner) {
            makeBinaryOperation(selectedOperation, collisions, canvas, dispatch)
            setCollisions([])
            setSpinner(false)
        }
    }, [spinner])

    return (
        <>
            <Modal show={show}>
                <div className="modalContent">
                    <Modal.Header>
                        <Modal.Title>Select Operation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                            <button type="button" className="bg-navbarSecondary hover:bg-navbarPrimary flex flex-row text-white rounded-sm" disabled>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                </svg>
                                Processing
                            </button>
                            :
                            <button className="bg-navbarSecondary hover:bg-navbarPrimary text-white rounded-sm" onClick={() => {
                                handleClose()
                            }}>
                                Proceed
                            </button>
                        }
                    </Modal.Footer>
                </div>

            </Modal>
        </>
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
        keyComponent: newKeys[2 + offsetKeys],
        lastTransformationType: undefined
    }
    return compositeEntity
}

const makeBinaryOperation = (operation: string, collisions: [THREE.Mesh, THREE.Mesh][], canvasState: CanvasState, dispatch: Dispatch) => {
    let newKeysSub = getNewKeys(canvasState, dispatch, 4 * collisions.length)
    switch (operation) {
        case "UNION":
            let result = collisions.reduce((componentResult: CompositeEntity, [, elementB], index) => {
                let entityB = findComponentByKey(canvasState.components, parseInt(elementB.name))
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(componentResult, entityB, operation, newKeysSub, indexKey)
            }, findComponentByKey(canvasState.components, parseInt(collisions[0][0].name)) as CompositeEntity)
            let elementsToRemoveUnion : number[] = [parseInt(collisions[0][0].name)]
            collisions.map(([, elementB]) => {
                elementsToRemoveUnion.push(parseInt(elementB.name))
            })
            dispatch(union({elementsToRemove: elementsToRemoveUnion, newEntity: result}))
            break;
        case "SUBTRACTION":
            let resultSUB = collisions.map(([elementA, elementB], index) => {
                let entityA = findComponentByKey(canvasState.components, parseInt(elementA.name))
                let entityB = findComponentByKey(canvasState.components, parseInt(elementB.name))
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(entityB, entityA, operation, newKeysSub, indexKey)
            })
            let elementACopy: ComponentEntity = {
                ...findComponentByKey(canvasState.components, parseInt(collisions[0][0].name)),
                box3Min: undefined,
                box3Max: undefined
            }
            elementACopy.keyComponent = newKeysSub[newKeysSub.length - 1];
            if (elementACopy.lastTransformationType === "TRANSLATE") {
                elementACopy.position = elementACopy.previousPosition
            } else if (elementACopy.lastTransformationType === "ROTATE") {
                elementACopy.rotation = elementACopy.previousRotation
            } else {
                elementACopy.scale = elementACopy.previousScale
            }
            let elementsToRemove : number[] = [parseInt(collisions[0][0].name)]
            collisions.map(([, elementB]) => {
                elementsToRemove.push(parseInt(elementB.name))
            })
            dispatch(subtraction({elementsToRemove: elementsToRemove, newEntity: resultSUB, selectedEntityCopy: elementACopy}))
            break;
        case "INTERSECTION":
            let resultINT = collisions.map(([elementA, elementB], index) => {
                let entityA = findComponentByKey(canvasState.components, parseInt(elementA.name))
                let entityB = findComponentByKey(canvasState.components, parseInt(elementB.name))
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(entityB, entityA, operation, newKeysSub, indexKey)
            })
            let elementsToRemoveIntersection : number[] = [parseInt(collisions[0][0].name)]
            collisions.map(([, elementB]) => {
                elementsToRemoveIntersection.push(parseInt(elementB.name))
            })
            dispatch(intersection({elementsToRemove: elementsToRemoveIntersection, newEntity: resultINT}))
            break;
    }
    return "operation completed"
}
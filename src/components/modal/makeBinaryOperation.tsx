import React, { useEffect, useState } from 'react';
import { FormSelect, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    modalStateSelector
} from "../../store/modalSlice";
import { addComponent, CanvasState, findComponentByKey, removeComponent, selectComponent } from "../../store/canvasSlice";
import * as THREE from "three"
import { canvasStateSelector } from '../../store/canvasSlice';
import { ComponentEntity, CompositeEntity } from '../../model/ComponentEntity';
import { getNewKeys } from '../canvas/components/cube';
import { Dispatch } from '@reduxjs/toolkit';

interface SelectBinaryOpProps {
    collisions: [THREE.Mesh, THREE.Mesh][],
    setCollisions: Function,
    spinnerVisibility: boolean,
    setSpinnerVisibility: Function
}



export const SelectBinaryOp: React.FC<SelectBinaryOpProps> = ({ collisions, setCollisions, setSpinnerVisibility, spinnerVisibility }) => {
    const NAME = "BINARY_OP";
    const dispatch = useDispatch();



    const modalState = useSelector(modalStateSelector);
    let modal = modalState.modals.filter(modal => modal.name === NAME)[0];
    const [selectedOperation, setSelectedOperation] = useState(modal.lastValue);
    const [show, setShow] = useState(false)
    const canvas = useSelector(canvasStateSelector)






    const handleClose = () => {
        setShow(false)
        setSpinnerVisibility(true)

    };

    useEffect(() => {
        setShow(collisions.length > 0)
    },[collisions])

    useEffect(() => {
        if (spinnerVisibility) {
            dispatch(selectComponent(0))
            makeBinaryOperation(selectedOperation, collisions, canvas, dispatch)
            setCollisions([])
            setSpinnerVisibility(false)
        }
    }, [spinnerVisibility])

    return (
        <>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Select Operation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormSelect
                        onChange={(event) => setSelectedOperation(event.currentTarget.value)}
                        defaultValue={modal.lastValue}
                    >
                        <option value="SUBTRACTION">SUBTRACTION</option>
                        <option value="INTERSECTION">INTERSECTION</option>
                        <option value="UNION">UNION</option>
                    </FormSelect>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => {
                        handleClose()

                    }}>
                        Procedi
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

const compositeEntityFromOperationBetweenTwoEntities = (elementA: ComponentEntity, elementB: ComponentEntity, operation: string, newKeys: number[], offsetKeys: number) => {
    let compositeEntity: CompositeEntity = {
        ...elementA,
        baseElements: { elementA: { ...elementA, keyComponent: newKeys[offsetKeys] }, elementB: { ...elementB, keyComponent: newKeys[1 + offsetKeys] } },
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
            dispatch(removeComponent(findComponentByKey(canvasState.components, parseInt(collisions[0][0].name))))
            collisions.map(([, elementB]) => {
                dispatch(removeComponent(findComponentByKey(canvasState.components, parseInt(elementB.name))))
            })
            dispatch(addComponent(result))
            break;
        case "SUBTRACTION":
            let resultSUB = collisions.map(([elementA, elementB], index) => {
                let entityA = findComponentByKey(canvasState.components, parseInt(elementA.name))
                let entityB = findComponentByKey(canvasState.components, parseInt(elementB.name))
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(entityB, entityA, operation, newKeysSub, indexKey)
            })
            let elementACopy: ComponentEntity = { ...findComponentByKey(canvasState.components, parseInt(collisions[0][0].name)), box3Min: undefined, box3Max: undefined }
            elementACopy.keyComponent = newKeysSub[newKeysSub.length - 1];
            if (elementACopy.lastTransformationType === "TRANSLATE") { elementACopy.position = elementACopy.previousPosition }
            else if (elementACopy.lastTransformationType === "ROTATE") { elementACopy.rotation = elementACopy.previousRotation }
            else { elementACopy.scale = elementACopy.previousScale }
            dispatch(removeComponent(findComponentByKey(canvasState.components, parseInt(collisions[0][0].name))))
            collisions.map(([, elementB]) => {
                dispatch(removeComponent(findComponentByKey(canvasState.components, parseInt(elementB.name))))
            })
            resultSUB.map(result => dispatch(addComponent(result)))
            dispatch(addComponent(elementACopy))
            break;
        case "INTERSECTION":
            let resultINT = collisions.map(([elementA, elementB], index) => {
                let entityA = findComponentByKey(canvasState.components, parseInt(elementA.name))
                let entityB = findComponentByKey(canvasState.components, parseInt(elementB.name))
                let indexKey = 3 * index
                return compositeEntityFromOperationBetweenTwoEntities(entityB, entityA, operation, newKeysSub, indexKey)
            })
            dispatch(removeComponent(findComponentByKey(canvasState.components, parseInt(collisions[0][0].name))))
            collisions.map(([, elementB]) => {
                dispatch(removeComponent(findComponentByKey(canvasState.components, parseInt(elementB.name))))
            })
            resultINT.map(result => dispatch(addComponent(result)))
            break;
    }
    return "operation completed"
}
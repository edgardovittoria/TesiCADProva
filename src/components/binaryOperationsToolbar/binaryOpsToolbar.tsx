import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    binaryOpEntitiesKeysSelector,
    binaryOpSelector,
    setBinaryOp,
    unsetBinaryOp,
} from "./binaryOperationsToolbarSlice";
import {CadmiaModality} from "../../models/cadmiaModality";
import unionIcon from "./style/unionIcon.png";
import intersectionIcon from "./style/intersectionIcon.png";
import subtractionIcon from "./style/subtractionIcon.png";
import {
    binaryOperation,
    BinaryOperationType,
    CanvasState,
    canvasStateSelector,
    ComponentEntity,
    ComponentTypes,
    CompositeEntity,
    findComponentByKey,
    GeometryAttributes,
    getNewKeys,
    setComponentsOpacity,
} from "cad-library";
import {Dispatch} from "@reduxjs/toolkit";
import {useCadmiaModality} from "../contexts/useCadmiaModality";
import {CheckIcon, XCircleIcon} from "@heroicons/react/20/solid";

interface BinaryOpsToolbarProps {
}

export const BinaryOpsToolbar: React.FC<BinaryOpsToolbarProps> = () => {
    const dispatch = useDispatch();
    const {modality, setModality} = useCadmiaModality();
    const binaryOp = useSelector(binaryOpSelector);
    const entityKeysForBinaryOperations = useSelector(
        binaryOpEntitiesKeysSelector
    );
    const canvasState = useSelector(canvasStateSelector);
    const [temporaryEntitiesForBinaryOp, setTemporaryEntitiesForBinaryOp] =
        useState(entityKeysForBinaryOperations);

    const makeBinaryOperation = (
        operation: BinaryOperationType,
        entityKeys: number[],
        canvasState: CanvasState,
        dispatch: Dispatch
    ) => {
        let mainEntitykey = entityKeys[0];
        let result = entityKeys
            .slice(1)
            .reduce((temporaryResult: CompositeEntity, elementB) => {
                let entityB = findComponentByKey(canvasState.components, elementB);
                return compositeEntityFromOperationBetweenTwoEntities(
                    temporaryResult,
                    entityB,
                    operation,
                    getNewKeys(canvasState.numberOfGeneratedKey, dispatch)[0]
                );
            }, findComponentByKey(canvasState.components, mainEntitykey) as CompositeEntity);
        let elementsToRemove = [];
        switch (operation) {
            case "UNION":
                elementsToRemove = entityKeys;
                break;
            case "SUBTRACTION":
                elementsToRemove = [mainEntitykey];
                break;
            case "INTERSECTION":
                elementsToRemove = entityKeys;
                break;
        }
        dispatch(
            binaryOperation({
                elementsToRemove: elementsToRemove,
                newEntity: result,
            })
        );
        return "operation completed";
    };

    const compositeEntityFromOperationBetweenTwoEntities = (
        elementA: ComponentEntity,
        elementB: ComponentEntity,
        type: ComponentTypes,
        newKey: number
    ) => {
        let compositeEntity: CompositeEntity = {
            ...elementA,
            baseElements: {
                elementA: {...elementA},
                elementB: {...elementB},
            },
            type: type,
            keyComponent: newKey,
            geometryAttributes: {} as GeometryAttributes,
        };
        return compositeEntity;
    };

    useEffect(() => {
        if (
            temporaryEntitiesForBinaryOp.length > entityKeysForBinaryOperations.length
        ) {
            let elements = temporaryEntitiesForBinaryOp.filter(
                (el) => !entityKeysForBinaryOperations.includes(el)
            );
            dispatch(setComponentsOpacity({keys: elements, opacity: 0.3}));
        } else {
            let elements = entityKeysForBinaryOperations.filter(
                (el) => !temporaryEntitiesForBinaryOp.includes(el)
            );
            dispatch(setComponentsOpacity({keys: elements, opacity: 1}));
        }
        setTemporaryEntitiesForBinaryOp(entityKeysForBinaryOperations);
    }, [entityKeysForBinaryOperations]);

    useEffect(() => {
        let componentKeys = canvasState.components.reduce(
            (keys: number[], component) => {
                keys.push(component.keyComponent);
                return keys;
            },
            []
        );
        if (modality === CadmiaModality.BinaryOperation) {
            dispatch(setComponentsOpacity({keys: componentKeys, opacity: 0.3}));
        } else if (modality === CadmiaModality.NormalSelection) {
            dispatch(setComponentsOpacity({keys: componentKeys, opacity: 1}));
        }
    }, [modality]);

    return (
        <>
            <div className="absolute left-[15px] top-[200px] w-[50px] text-center shadow">
                <div className={`relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300
             ${binaryOp === "UNION" ? 'bg-gray-400' : 'bg-white'}
            `}
                     onClick={() => {
                         setModality(CadmiaModality.BinaryOperation);
                         dispatch(setBinaryOp("UNION"));
                     }}
                >
                    <img src={unionIcon} alt="Union operation"/>
                    <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
                        <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">UNION</span>
                    </div>
                </div>
                <div className={`relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300
             ${binaryOp === "INTERSECTION" ? 'bg-gray-300' : 'bg-white'}
            `}
                     onClick={() => {
                         setModality(CadmiaModality.BinaryOperation);
                         dispatch(setBinaryOp("INTERSECTION"));
                     }}
                >
                    <img src={intersectionIcon} alt="Intersection operation"/>
                    <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
                        <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">INTERSECTION</span>
                    </div>
                </div>
                <div className={`relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300
             ${binaryOp === "SUBTRACTION" ? 'bg-gray-300' : 'bg-white'}
            `}
                     onClick={() => {
                         setModality(CadmiaModality.BinaryOperation);
                         dispatch(setBinaryOp("SUBTRACTION"));
                     }}
                >
                    <img src={subtractionIcon} alt="Subtraction operation"/>
                    <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
                        <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">SUBTRACTION</span>
                    </div>
                </div>
                <div
                    className={`relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300`}>
                    {binaryOp === undefined ? (
                        <XCircleIcon className="text-gray-300 w-8 h-8"/>
                    ) : (
                        <XCircleIcon className="text-red-600 w-8 h-8"
                                     onClick={() => {
                                         setModality(CadmiaModality.NormalSelection);
                                         dispatch(unsetBinaryOp());
                                     }}
                        />
                    )}
                    <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
                        <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">EXIT</span>
                    </div>
                </div>
                <div
                    className={`relative flex flex-col items-center justify-center h-[50px] w-[50px] p-1 group bg-white hover:bg-gray-300`}>
                    {entityKeysForBinaryOperations.length > 1  ? (
                        <CheckIcon className="text-green-600 w-8 h-8"
                                   onClick={() => {
                                       binaryOp &&
                                       makeBinaryOperation(
                                           binaryOp as BinaryOperationType,
                                           entityKeysForBinaryOperations,
                                           canvasState,
                                           dispatch
                                       );
                                       setModality(CadmiaModality.NormalSelection);
                                       dispatch(unsetBinaryOp());
                                   }}
                        />
                    ) : (
                        <CheckIcon className="text-gray-300 w-8 h-8"/>
                    )}
                    <div className="absolute left-10 bottom-0 flex flex-col items-center hidden mb-10 group-hover:flex">
                        <span className="relative z-10 p-2 text-xl leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">EXECUTE OPERATION</span>
                    </div>
                </div>
            </div>
        </>
    );
};

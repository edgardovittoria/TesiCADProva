import React, { useEffect, useState } from "react";
import "./style/binaryOps.css";
import { useDispatch, useSelector } from "react-redux";
import { Image, Tooltip } from "react-bootstrap";
import {
  binaryOpEntitiesKeysSelector,
  binaryOpSelector,
  setBinaryOp,
  unsetBinaryOp,
} from "./binaryOperationsToolbarSlice";
import { CadmiaModality } from "../../models/cadmiaModality";
import unionIcon from "./style/unionIcon.png";
import intersectionIcon from "./style/intersectionIcon.png";
import subtractionIcon from "./style/subtractionIcon.png";
import closeIcon from "./style/closeRedCircleIcon.png";
import closeIconDisabled from "./style/closeRedCircleDisabledIcon.png";
import okIcon from "./style/greenCheckOkIcon.png";
import okIconDisabled from "./style/greenCheckOkDisabledIcon.png";
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
import { Dispatch } from "@reduxjs/toolkit";
import { useCadmiaModality } from "../contexts/useCadmiaModality";

interface BinaryOpsToolbarProps {}

export const BinaryOpsToolbar: React.FC<BinaryOpsToolbarProps> = ({}) => {
  const dispatch = useDispatch();
  const { modality, setModality } = useCadmiaModality();
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
        elementA: { ...elementA },
        elementB: { ...elementB },
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
      dispatch(setComponentsOpacity({ keys: elements, opacity: 0.3 }));
    } else {
      let elements = entityKeysForBinaryOperations.filter(
        (el) => !temporaryEntitiesForBinaryOp.includes(el)
      );
      dispatch(setComponentsOpacity({ keys: elements, opacity: 1 }));
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
      dispatch(setComponentsOpacity({ keys: componentKeys, opacity: 0.3 }));
    } else if (modality === CadmiaModality.NormalSelection) {
      dispatch(setComponentsOpacity({ keys: componentKeys, opacity: 1 }));
    }
  }, [modality]);

  return (
    <>
      <div id="binary-op-toolbar" className="Panel">
        <Tooltip title="UNION" key="UNION">
          <button
            className={
              binaryOp === "UNION" ? "btn-toolbar-selected" : "btn-toolbar"
            }
            onClick={() => {
              setModality(CadmiaModality.BinaryOperation);
              dispatch(setBinaryOp("UNION"));
            }}
          >
            <Image
              src={unionIcon}
              alt="Union operation"
              width={30}
              height={30}
            />
          </button>
        </Tooltip>
        <Tooltip title="INTERSECTION" key="INTERSECTION">
          <button
            className={
              binaryOp === "INTERSECTION"
                ? "btn-toolbar-selected"
                : "btn-toolbar"
            }
            onClick={() => {
              setModality(CadmiaModality.BinaryOperation);
              dispatch(setBinaryOp("INTERSECTION"));
            }}
          >
            <Image
              src={intersectionIcon}
              alt="Intersection operation"
              width={30}
              height={30}
            />
          </button>
        </Tooltip>
        <Tooltip title="SUBTRACTION" key="SUBTRACTION">
          <button
            className={
              binaryOp === "SUBTRACTION"
                ? "btn-toolbar-selected"
                : "btn-toolbar"
            }
            onClick={() => {
              setModality(CadmiaModality.BinaryOperation);
              dispatch(setBinaryOp("SUBTRACTION"));
            }}
          >
            <Image
              src={subtractionIcon}
              alt="Subtraction operation"
              width={30}
              height={30}
            />
          </button>
        </Tooltip>
        <Tooltip
          title="EXIT BYNARY OPERATIONS MODE"
          key="EXIT BYNARY OPERATIONS MODE"
        >
          {binaryOp === undefined ? (
            <button disabled className="btn-toolbar">
              <Image
                src={closeIconDisabled}
                alt="Exit binary operations mode"
                width={30}
                height={30}
              />
            </button>
          ) : (
            <button
              className="btn-toolbar"
              onClick={() => {
                setModality(CadmiaModality.NormalSelection);
                dispatch(unsetBinaryOp());
              }}
            >
              <Image
                src={closeIcon}
                alt="Exit binary operations mode"
                width={30}
                height={30}
              />
            </button>
          )}
        </Tooltip>
        <Tooltip title="EXECUTE OPERATION" key="EXECUTE OPERATION">
          {entityKeysForBinaryOperations.length > 1 ? (
            <button
              className="btn-toolbar"
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
            >
              <Image
                src={okIcon}
                alt="Execute operation"
                width={30}
                height={30}
              />
            </button>
          ) : (
            <button disabled className="btn-toolbar">
              <Image
                src={okIconDisabled}
                alt="Execute operation"
                width={30}
                height={30}
              />
            </button>
          )}
        </Tooltip>
      </div>
    </>
  );
};

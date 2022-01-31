import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    activeTransformationSelector,
    getIndexTransformationByName,
    setTransformationActive,
    toolbarTransformationStateSelector
} from "../../../store/toolbarTransformationSlice";
import { keySelectedComponenteSelector, selectComponent, TransformationParams } from '@Draco112358/cad-library';

export interface ComponentProps {
    transformationParams: TransformationParams
    keyComponent: number,
}

export const Component: React.FC<ComponentProps> = ({children, transformationParams, keyComponent}) => {
    const dispatch = useDispatch();
    const activeTransformation = useSelector(activeTransformationSelector)
    const toolbarTransformation = useSelector(toolbarTransformationStateSelector)
    const selectedComponentKey = useSelector(keySelectedComponenteSelector)


    return (
        <>
            <mesh name={keyComponent.toString()} position={transformationParams.position} rotation={transformationParams.rotation} scale={transformationParams.scale}
                  onClick={(e) => {
                      e.stopPropagation();
                      (selectedComponentKey !== keyComponent) && dispatch(selectComponent(keyComponent))
                  }}
                  onContextMenu={(e) => {
                      e.stopPropagation()
                      let index = (getIndexTransformationByName(activeTransformation.type, toolbarTransformation) + 1) % toolbarTransformation.transformation.length
                      dispatch(setTransformationActive(toolbarTransformation.transformation[index].type))
                  }}
            >
                {children}
            </mesh>
        </>



    )

}
import React, {MutableRefObject, useRef} from 'react';
import {selectComponent} from "../../../store/canvasSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    activeTransformationSelector,
    getIndexTransformationByName,
    setTransformationActive,
    toolbarTransformationStateSelector
} from "../../../store/toolbarTransformationSlice";

export interface ComponentProps {
    orbit: MutableRefObject<null>,
    position: [number, number, number],
    rotation: [number, number, number],
    scale: [number, number, number],
    keyComponent: number,
}

export const Component: React.FC<ComponentProps> = ({children, orbit, position, rotation, scale, keyComponent}) => {
    const dispatch = useDispatch();
    const meshRef = useRef<THREE.Mesh>(null)
    const activeTransformation = useSelector(activeTransformationSelector)
    const toolbarTransformation = useSelector(toolbarTransformationStateSelector)


    return (
        <>
            <mesh ref={meshRef} name={keyComponent.toString()} position={position} rotation={rotation} scale={scale}
                  onClick={(e) => {
                      e.stopPropagation()
                      dispatch(selectComponent(keyComponent))
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
import { MutableRefObject } from 'react';
import { ComponentEntity, CompositeEntity, CubeEntity } from "../../model/ComponentEntity";
import { Cube, CubeProps } from "../canvas/components/cube";
import { selectComponent } from "../../store/canvasSlice";
import { Dispatch } from '@reduxjs/toolkit';



export const FactoryComponent = (entity: ComponentEntity, dispatch: Dispatch, meshRef: MutableRefObject<null>) => {


    switch (entity.type) {
        case "CUBE":
            let cubeEntity = entity as CubeEntity

            let cubeProps: CubeProps = { color: cubeEntity.color, width: cubeEntity.width, height: cubeEntity.height, depth: cubeEntity.depth }
            return (

                Cube(cubeProps)
            )

        case "SUBTRACTION":
            let subtractionEntity = entity as CompositeEntity
            let elementToSubtract = FactoryComponent(subtractionEntity.elementKeys.componentToSubtract, dispatch, meshRef)
            return null

        default: return null

    }



}
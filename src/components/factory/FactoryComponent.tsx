import React, { MutableRefObject } from 'react';
import { ComponentEntity, CubeEntity } from "../../model/ComponentEntity";
import { Cube, CubeProps } from "../canvas/components/cube";
import { BoxGeometryProps, MeshBasicMaterialProps } from "@react-three/fiber";
import * as THREE from 'three';

import { selectComponent } from "../../store/canvasSlice";
import { Color } from "three";
import { Dispatch } from '@reduxjs/toolkit';



export const FactoryComponent = (entity: ComponentEntity , dispatch: Dispatch, meshRef: MutableRefObject<null>) => {


    switch (entity.type) {
        case "CUBE":
            let cubeEntity = entity as CubeEntity

            let cubeProps : CubeProps = {color: cubeEntity.color, width: cubeEntity.width, height: cubeEntity.height, depth: cubeEntity.depth, clickHandler: () => dispatch(selectComponent(cubeEntity.keyComponent)), meshRef: meshRef}
            return (
                Cube(cubeProps)
            )

        default: return null

    }



}
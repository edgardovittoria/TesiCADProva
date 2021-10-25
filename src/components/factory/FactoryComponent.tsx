import React from 'react';
import {ComponentEntity} from "../../model/ComponentEntity";
import {Cube} from "../canvas/components/cube";
import {BoxGeometryProps, MeshBasicMaterialProps} from "@react-three/fiber";
import * as THREE from 'three';
import {useDispatch} from "react-redux";
import {selectComponent} from "../../store/canvasSlice";
import {Color} from "three";

interface FactoryComponentProps {
    entity: ComponentEntity
}

type ComponentRepresentations = {
    storeRepresentation: ComponentEntity
    jsxRepresentation: JSX.Element
}

export const FactoryComponent: React.FC<FactoryComponentProps> = ({entity}) => {
    const dispatch = useDispatch();


        switch (entity.type) {
            case "CUBE" :

                let color = ((entity.mesh.material as MeshBasicMaterialProps).color) ? (entity.mesh.material as MeshBasicMaterialProps).color : new THREE.Color('red');
                let boxGeometry = (entity.mesh.geometry as BoxGeometryProps)
                if(boxGeometry.parameters !== undefined){
                    let width = boxGeometry.parameters.width as number
                    let height = boxGeometry.parameters.height as number
                    let depth = boxGeometry.parameters.depth as number

                    return(
                        <Cube color={color as Color} width={width} height={height} depth={depth} clickHandler={() => dispatch(selectComponent(entity.keyComponent))}/>
                    )
                }else{
                    return null
                }
            default: return null

        }



}
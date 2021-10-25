import React from 'react';
import {ComponentEntity} from "../../model/ComponentEntity";
import {Cube} from "../canvas/components/cube";
import {BoxGeometryProps} from "@react-three/fiber";
import * as THREE from 'three';

interface FactoryComponentProps {
    entity: ComponentEntity | string
}

type ComponentRepresentations = {
    storeRepresentation: ComponentEntity
    jsxRepresentation: JSX.Element
}

export const FactoryComponent: React.FC<FactoryComponentProps> = ({entity}) => {

    if(typeof entity !== "string"){

        switch (entity.type) {
            case "CUBE" :

                let color = (entity.componentDetails.propsMaterial.color) ? entity.componentDetails.propsMaterial.color : new THREE.Color('red');
                let boxGeometry = (entity.componentDetails.propsGeometry as BoxGeometryProps)
                if(boxGeometry.parameters !== undefined){
                    let width = boxGeometry.parameters.width as number
                    let height = boxGeometry.parameters.height as number
                    let depth = boxGeometry.parameters.depth as number

                    return(
                        <Cube color={color} width={width} height={height} depth={depth} />
                    )
                }else{
                    return null
                }
            default: return null


        }
    }else{
        switch (entity) {
            case 'CUBE' :
                return(
                    <Cube color='red' width={1} height={1} depth={1} />
            )
            default: return null
        }
    }


}
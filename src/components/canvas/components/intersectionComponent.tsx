import React from 'react';
import {BufferGeometry, Material} from "three";

interface IntersectionComponentProps {
    geometry: BufferGeometry,
    material: Material
}

export const IntersectionComponent: React.FC<IntersectionComponentProps> = ({geometry, material}) => {
    return(
        <>
            <primitive object={geometry}/>
            <primitive object={material}/>
        </>
    )

}
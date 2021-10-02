import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {useRotation} from "../../../hooks/useRotation";

interface SferaProps {
    radius: number,
    widthSegments: number,
    heightSegments: number,
    color: string,
    position?: number[],
    hasRotation?: boolean ,
    children?: JSX.Element[]
}

export const Sfera: React.FC<SferaProps> = (
    {radius,widthSegments,heightSegments, color, position, children, hasRotation = false }
)  => {
    const myObject = useRef<any>();

    useRotation(myObject, false, true, false, hasRotation)

   return(

        <mesh ref={myObject}>
            <sphereGeometry args={[radius,widthSegments,heightSegments]}/>
            <meshToonMaterial color={color}/>
            {
                (children === undefined) ? <mesh></mesh> : children.map(child => {
                return child;
            })}
        </mesh>
    )

}
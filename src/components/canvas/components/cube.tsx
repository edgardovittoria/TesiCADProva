import React, {MutableRefObject, useEffect, useRef} from 'react';
import {useControl} from "react-three-gui";
import * as THREE from "three";
import {BoxGeometry} from "three";

type CubeProps = {
    color: string,
    x: number,
    y: number,
    z: number
}

export const Cube: React.FC<CubeProps> = (
    {color, x, y, z}
) => {
    
    return(
        <>
            <boxGeometry args={[x, y, z]} />
            <meshStandardMaterial color={color}/>
        </>
    )
}
import React from 'react';
import {useDrag, useHover} from "react-use-gesture";
import { useSpring } from '@react-spring/web'
import {Vector3} from "@react-three/fiber";



export type BlockProps = {
    position: Vector3 | undefined
}

export const Block: React.FC<BlockProps> = ({position}) => {
    return(
        <mesh position={position}>

        </mesh>
    )
}
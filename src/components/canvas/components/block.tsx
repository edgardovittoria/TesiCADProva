import React from 'react';
import {useDrag, useHover} from "react-use-gesture";
import { useSpring } from '@react-spring/web'
import {Vector3} from "@react-three/fiber";



export type BlockProps = {
    position: Vector3 | undefined
}

export const Block: React.FC<BlockProps> = ({position}) => {
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

    const bind = useDrag(({ down, movement: [mx, my] }) => {
        api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
    })
    return(
        <mesh position={position}>

        </mesh>
    )
}
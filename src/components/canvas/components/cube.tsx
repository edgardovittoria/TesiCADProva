import React from 'react';
import {Block, BlockProps} from "./block";

type CubeProps = {
    color: string,
    x: number,
    y: number,
    z: number,
}& BlockProps

export const Cube: React.FC<CubeProps> = (
    {color, x, y, z, position}
) => {
    return(
        <Block position={position}>
            <boxGeometry args={[x, y, z]} />
            <meshStandardMaterial color={color} />
        </Block>
    )
}
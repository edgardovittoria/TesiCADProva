import React, {} from 'react';

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
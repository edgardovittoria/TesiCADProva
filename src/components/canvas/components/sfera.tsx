import React from 'react';

interface SferaProps {
    radius: number,
    widthSegments: number,
    heightSegments: number,
    color: string
}

export const Sfera: React.FC<SferaProps> = (
    {radius,widthSegments,heightSegments, color}
)  => {

   return(
        <>
            <sphereGeometry args={[radius,widthSegments,heightSegments]}/>
            <meshToonMaterial color={color}/>
        </>
    )

}
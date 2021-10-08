import React from 'react';
import {useControl} from "react-three-gui";

interface SferaProps {
    radius: number,
    widthSegments: number,
    heightSegments: number,
    color: string
}

export const Sfera: React.FC<SferaProps> = (
    {radius,widthSegments,heightSegments, color}
)  => {
    const coloreRGBA = useControl('color', {type: "color", inline: true, disableAlpha: true, picker: "chrome" })
    const colore = "rgb("+coloreRGBA.r+","+coloreRGBA.g+","+coloreRGBA.b+")";
   return(
        <>
            <sphereGeometry args={[radius,widthSegments,heightSegments]}/>
            <meshToonMaterial color={colore}/>
        </>
    )

}
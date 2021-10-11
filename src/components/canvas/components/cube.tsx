import React, {useEffect} from 'react';
import {useControl} from "react-three-gui";
import * as THREE from "three";

type CubeProps = {
    color: string,
    x: number,
    y: number,
    z: number,
}

export const Cube: React.FC<CubeProps> = (
    {color, x, y, z}
) => {
    const coloreRGBA = useControl('color', {type: "color", inline: true, disableAlpha: true, picker: "chrome" })
    const colore = "rgb("+coloreRGBA.r+","+coloreRGBA.g+","+coloreRGBA.b+")";
    return(
        <>
            <boxGeometry args={[x, y, z]} />
            <meshStandardMaterial color={colore}/>
        </>
    )
}
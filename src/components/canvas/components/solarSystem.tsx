import React, {useRef} from 'react';
import {useRotation} from "../../../hooks/useRotation";

interface SolarSystemProps {
    solarSystemFigli: JSX.Element[]
}

export const SolarSystem: React.FC<SolarSystemProps> = ({solarSystemFigli}) => {
    const myObject = useRef<any>();
    useRotation(myObject, false, true, false, true);
    return(
        <group children={solarSystemFigli} ref={myObject}/>
    )

}
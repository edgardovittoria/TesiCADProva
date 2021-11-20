import React, {useState} from 'react';
import Draggable from "react-draggable";

interface DraggableComponentProps {
    hidden: boolean
}

export const DraggableComponent: React.FC<DraggableComponentProps> = ({children,hidden}) => {

    const [activeDrags, setActiveDrags] = useState(0);
    /*const [deltaPosition, setDeltaPosition] = useState({x: 0, y:0});
    const [controlledPosition, setControlledPosition] = useState({x: 0, y:0});*/

    const onStart = () => {
        setActiveDrags(activeDrags + 1)
    }

    const onStop = () => {
        setActiveDrags(activeDrags - 1)
    }

    return hidden ? <></> : <Draggable onStart={onStart} onStop={onStop} defaultPosition={{x: 0, y: 0}}>{children}</Draggable>


}
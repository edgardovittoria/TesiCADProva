import { FC } from "react";
import { useSelector } from "react-redux";
import { useDetectComponentsCollision } from "../../../hooks/useDetectComponentsCollision";
import { useDetectComponentsCollision2 } from "../../../hooks/useDetectComponentsCollision2";
import { canvasStateSelector, findComponentByKey } from "../../../store/canvasSlice";

interface DetectCollisionProps{
    keyComponent: number,
}

export const DetectCollision: FC<DetectCollisionProps> = ({keyComponent}) => {
    const canvasState = useSelector(canvasStateSelector)
   useDetectComponentsCollision(findComponentByKey(canvasState, keyComponent), canvasState)
    //useDetectComponentsCollision2(keyComponent, canvasState)
    return null
}
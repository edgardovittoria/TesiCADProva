import { FC } from "react";
import { useSelector } from "react-redux";
import { useDetectComponentsCollision } from "../../../hooks/useDetectComponentsCollision";
import { useDetectComponentsCollision2 } from "../../../hooks/useDetectComponentsCollision2";
import { ComponentEntity } from "../../../model/ComponentEntity";
import { CanvasState, canvasStateSelector, findComponentByKey } from "../../../store/canvasSlice";

interface DetectCollisionProps{
    entity: ComponentEntity,
    canvas: CanvasState
}

export const DetectCollision: FC<DetectCollisionProps> = ({entity, canvas}) => {
   // const canvasState = useSelector(canvasStateSelector)
   useDetectComponentsCollision(entity, canvas)
    //useDetectComponentsCollision2(keyComponent, canvasState)
    return null
}
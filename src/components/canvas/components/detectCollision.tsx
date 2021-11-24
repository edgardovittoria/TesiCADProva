import { FC } from "react";
import { useSelector } from "react-redux";
import { useDetectComponentsCollision2 } from "../../../hooks/useDetectComponentsCollision2";
import { ComponentEntity } from "../../../model/ComponentEntity";
import { CanvasState, canvasStateSelector, findComponentByKey } from "../../../store/canvasSlice";

interface DetectCollisionProps{
    entity: ComponentEntity,
}

export const DetectCollision: FC<DetectCollisionProps> = ({entity}) => {
   const canvasState = useSelector(canvasStateSelector)
  // useDetectComponentsCollision(entity, canvasState)
    useDetectComponentsCollision2(entity.keyComponent, canvasState)
    return null
}
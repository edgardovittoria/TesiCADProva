import { FC } from "react";
import { useDetectComponentsCollision } from "../../../hooks/useDetectComponentsCollision";
import { ComponentEntity } from "../../../model/ComponentEntity";
import { CanvasState } from "../../../store/canvasSlice";
interface DetectCollisionProps{
    entity: ComponentEntity,
    canvasState: CanvasState
}

export const DetectCollision: FC<DetectCollisionProps> = ({entity, canvasState}) => {
    useDetectComponentsCollision(entity, canvasState)
    return null
}
import { FC } from "react";
import { useSelector } from "react-redux";
import { useDetectComponentsCollision2 } from "../../../hooks/useDetectComponentsCollision2";
import { ComponentEntity } from "../../../model/ComponentEntity";
import { CanvasState, canvasStateSelector, findComponentByKey } from "../../../store/canvasSlice";

interface DetectCollisionProps{
    entity: ComponentEntity,
    setModalCollisions: Function
}

export const DetectCollision: FC<DetectCollisionProps> = ({entity, setModalCollisions}) => {
   const canvasState = useSelector(canvasStateSelector)
  // useDetectComponentsCollision(entity, canvasState)
    useDetectComponentsCollision2(entity.keyComponent, canvasState, setModalCollisions)
    return null
}
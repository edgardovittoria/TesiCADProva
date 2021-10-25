import {ComponentEntity} from "../model/ComponentEntity";
import {useDispatch, useSelector} from "react-redux";
import {CanvasState, canvasStateSelector, incrementNumberOfGeneratedKey} from "../store/canvasSlice";
import * as THREE from 'three';
import {Vector3} from "three";
import {getCube} from "../components/canvas/components/cube";




export const useGetDefaultComponentByType = (type: string) => {
    const canvasState = useSelector(canvasStateSelector);
    const dispatch = useDispatch();

    const getNewKey = () => {
        const newKey = canvasState.numberOfGeneratedKey + 1;
        dispatch(incrementNumberOfGeneratedKey())
        return newKey;
    }

    const fromVector3ToNumberArray = (v: Vector3 | undefined) : [number, number, number] | null => {
        return (v !== undefined) ?  [v.x,v.y,v.z] : null
    }

    switch (type) {
        case 'CUBE' :
            return getCube(canvasState, dispatch);

        default:
            return getCube(canvasState, dispatch);

    }
}
import {ComponentEntity} from "../model/ComponentEntity";
import {useDispatch, useSelector} from "react-redux";
import {CanvasState, canvasStateSelector, incrementNumberOfGeneratedKey} from "../store/canvasSlice";
import * as THREE from 'three';
import {Vector3} from "three";




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
            let boxGeometry = new THREE.BoxGeometry()
            let material = new THREE.MeshBasicMaterial();
            material.color = new THREE.Color('red')
            boxGeometry.computeBoundingBox()
            const component: ComponentEntity = {
                type: type,
                name: type,
                keyComponent: getNewKey(),
                orbitEnabled: true,
                position: [0,0,0],
                rotation: [0,0,0],
                scale: [1,1,1],
                componentDetails: {
                    propsGeometry: boxGeometry,
                    propsMaterial: material
                },
                isSelected: false
            }

            return component;

        default:
            let boxGeometryDef = new THREE.BoxGeometry()
            let materialDef = new THREE.MeshBasicMaterial();
            materialDef.color = new THREE.Color('red')
            boxGeometryDef.computeBoundingBox()
            const componentDefault: ComponentEntity = {
                type: type,
                name: type,
                keyComponent: getNewKey(),
                orbitEnabled: true,
                position: [0,0,0],
                rotation: [0,0,0],
                scale: [1,1,1],
                componentDetails: {
                    propsGeometry: boxGeometryDef,
                    propsMaterial: materialDef
                },
                isSelected: false
            }

            return componentDefault;

    }
}
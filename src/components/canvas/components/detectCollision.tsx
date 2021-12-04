import {FC, useEffect} from "react";
import {useDispatch} from "react-redux";
import { ComponentEntity } from "../../../model/ComponentEntity";
import {
    removeComponent,
} from "../../../store/canvasSlice";
import {useThree} from "@react-three/fiber";
import {Dispatch} from "redux";
import {meshWithPositionRotationScaleFromOldOne} from "../../../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings";
import {thereIsCollisionBetweenMeshes} from "../../../auxiliaryFunctionsUsingThreeDirectly/thereIsCollisionBetween";

interface DetectCollisionProps{
    entity: ComponentEntity | undefined,
    setModalCollisions: Function
}

export const DetectCollision: FC<DetectCollisionProps> = ({entity, setModalCollisions}) => {
    return (
        entity !== undefined ?
            <SetCollision componentEntity={entity} setModalCollisions={setModalCollisions}/>
            : <></>
    )
}

const SetCollision: FC<{ componentEntity: ComponentEntity, setModalCollisions: Function }> = ({componentEntity, setModalCollisions}) => {
    const { scene } = useThree()
    let dispatch = useDispatch()

    useEffect(() => {
        let collisionsSet = arrayOfCollisionsBetween(componentEntity.keyComponent, scene.children.filter(el => el.type === "Mesh") as THREE.Mesh[]);
        if (collisionsSet.length > 0) {
            if (componentEntity.previousPosition.every((val, index) => val === componentEntity.position[index])
                && componentEntity.previousScale.every((val, index) => val === componentEntity.scale[index])
                && componentEntity.previousRotation.every((val, index) => val === componentEntity.rotation[index])) {
                removeEntityJustCreated(componentEntity, dispatch)
            }
            else {
                setModalCollisions(collisionsSet)
            }
        }
        return () => {collisionsSet = []}
    }, [componentEntity.position, componentEntity.rotation, componentEntity.scale, componentEntity, scene.children, dispatch, setModalCollisions])
    return <></>
}

const removeEntityJustCreated = (entity: ComponentEntity, dispatch: Dispatch) => {
    dispatch(removeComponent(entity))
    alert("Esiste già un componente nella stessa posizione. Spostalo prima di crearne uno nuovo!")
}

const arrayOfCollisionsBetween = (element: number, allElements: THREE.Mesh[]) => {
    let meshSelected = allElements.filter(el => el.name === element.toString())[0]
    return allElements
        .filter(component => component.name !== element.toString())
        .reduce((results: [THREE.Mesh, THREE.Mesh][], component) => {
            let compSelected = meshWithPositionRotationScaleFromOldOne(meshSelected,
                [meshSelected.position.x, meshSelected.position.y, meshSelected.position.z],
                [meshSelected.rotation.x, meshSelected.rotation.y, meshSelected.rotation.z],
                [meshSelected.scale.x, meshSelected.scale.y, meshSelected.scale.z],
            );
            let comp = meshWithPositionRotationScaleFromOldOne(component,
                [component.position.x, component.position.y, component.position.z],
                [component.rotation.x, component.rotation.y, component.rotation.z],
                [component.scale.x, component.scale.y, component.scale.z],
            );
            (thereIsCollisionBetweenMeshes(compSelected, comp)) && results.push([meshSelected, component])
            return results
        }, [])
}
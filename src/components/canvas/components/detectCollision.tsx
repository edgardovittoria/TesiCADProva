import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { areEquals, ComponentEntity, TransformationParams } from "../../../model/ComponentEntity";
import {
    removeComponent,
} from "../../../store/canvasSlice";
import { useThree } from "@react-three/fiber";
import { Dispatch } from "redux";
import { meshWithPositionRotationScaleFromOldOne } from "../../../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings";
import { thereIsCollisionBetweenMeshes } from "../../../auxiliaryFunctionsUsingThreeDirectly/thereIsCollisionBetween";

interface DetectCollisionProps {
    entity: ComponentEntity | undefined,
    setModalCollisions: Function
}

export const DetectCollision: FC<DetectCollisionProps> = ({ entity, setModalCollisions }) => {
    return (
        entity !== undefined ?
            <SetCollision componentEntity={entity} setModalCollisions={setModalCollisions} />
            : <></>
    )
}

const SetCollision: FC<{ componentEntity: ComponentEntity, setModalCollisions: Function }> = ({ componentEntity, setModalCollisions }) => {
    const { scene } = useThree()
    let dispatch = useDispatch()

    useEffect(() => {
        let collisionsSet = arrayOfCollisionsBetween(componentEntity.keyComponent, scene.children.filter(el => el.type === "Mesh") as THREE.Mesh[]);
        if (collisionsSet.length > 0) {
            if (areEquals(componentEntity.transformationParams, componentEntity.previousTransformationParams)) {
                removeEntityJustCreated(componentEntity, dispatch)
            }
            else {
                setModalCollisions(collisionsSet)
            }
        }
        return () => { collisionsSet = [] }
    }, [componentEntity.transformationParams.position, componentEntity.transformationParams.rotation, componentEntity.transformationParams.scale, componentEntity, scene.children, dispatch, setModalCollisions])
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
        .reduce((results: [number, number][], component) => {
            let compSelected = meshWithPositionRotationScaleFromOldOne(meshSelected,
                {
                    position: [meshSelected.position.x, meshSelected.position.y, meshSelected.position.z],
                    rotation: [meshSelected.rotation.x, meshSelected.rotation.y, meshSelected.rotation.z],
                    scale: [meshSelected.scale.x, meshSelected.scale.y, meshSelected.scale.z]
                } as TransformationParams
            );
            let comp = meshWithPositionRotationScaleFromOldOne(component,
                {
                    position: [component.position.x, component.position.y, component.position.z],
                    rotation: [component.rotation.x, component.rotation.y, component.rotation.z],
                    scale: [component.scale.x, component.scale.y, component.scale.z]
                } as TransformationParams
            );
            (thereIsCollisionBetweenMeshes(compSelected, comp)) && results.push([parseInt(meshSelected.name), parseInt(component.name)])
            return results
        }, [])
}
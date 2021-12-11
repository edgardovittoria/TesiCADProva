import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { areEquals, ComponentEntity } from "../../../model/ComponentEntity";
import {
    removeComponent,
} from "../../../store/canvasSlice";
import { useThree } from "@react-three/fiber";
import { Dispatch } from "redux";
import { thereIsCollisionBetweenMeshes } from "../../../auxiliaryFunctionsUsingThreeDirectly/thereIsCollisionBetween";

interface DetectCollisionProps {
    entity: ComponentEntity,
    setModalCollisions: Function
}

export const DetectCollision: FC<DetectCollisionProps> = ({ entity, setModalCollisions }) => {
    const { scene } = useThree()
    let dispatch = useDispatch()

    useEffect(() => {
        let [meshSelected, allMeshesButSelectedOne] = scene.children
            .filter(el => el.type === "Mesh")
            .reduce((result: [THREE.Mesh, THREE.Mesh[]], mesh) => {
                (mesh.name === entity.keyComponent.toString()) ? result[0] = mesh as THREE.Mesh : result[1].push(mesh as THREE.Mesh)
                return result
            }, [{} as THREE.Mesh, []])
        let collisionsSet = arrayOfCollisionsBetween(meshSelected, allMeshesButSelectedOne);
        if (collisionsSet.length > 0) {
            (areEquals(entity.transformationParams, entity.previousTransformationParams))
                ? removeEntityJustCreated(entity.keyComponent, dispatch)
                : setModalCollisions(collisionsSet)
        }
        return () => { collisionsSet = [] }
    }, [entity.keyComponent, setModalCollisions, entity.transformationParams, entity.previousTransformationParams, scene.children, dispatch])

    return <></>
}

const removeEntityJustCreated = (entityKey: number, dispatch: Dispatch) => {
    dispatch(removeComponent(entityKey))
    alert("Esiste già un componente nella stessa posizione. Spostalo prima di crearne uno nuovo!")
}

const arrayOfCollisionsBetween = (meshSelected: THREE.Mesh, allMeshes: THREE.Mesh[]) => {
    return allMeshes
        .reduce((results: [number, number][], mesh) => {
            (thereIsCollisionBetweenMeshes(meshSelected, mesh)) && results.push([parseInt(meshSelected.name), parseInt(mesh.name)])
            return results
        }, [])
}
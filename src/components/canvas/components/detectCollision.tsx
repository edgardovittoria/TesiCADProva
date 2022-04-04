import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useThree } from "@react-three/fiber";
import { Dispatch } from "redux";
import { useCollisions } from "../../contexts/useCollisions";
import * as THREE from "three";
import { areEquals, ComponentEntity, getObjectsFromSceneByType, meshesCollidingWithTargetMesh, removeComponent } from "cad-library";

interface DetectCollisionProps {
    entity: ComponentEntity,
}

export const DetectCollision: FC<DetectCollisionProps> = ({ entity }) => {
    const { scene } = useThree()
    let dispatch = useDispatch()
    const { setCollisions } = useCollisions()

    useEffect(() => {
        let [meshSelected, allMeshesButSelectedOne] = getObjectsFromSceneByType(scene, "Mesh")
            .reduce((result: [THREE.Mesh, THREE.Mesh[]], mesh) => {
                (mesh.name === entity.keyComponent.toString()) ? result[0] = mesh as THREE.Mesh : result[1].push(mesh as THREE.Mesh)
                return result
            }, [{} as THREE.Mesh, []])
        let collisionsSet = arrayOfCollisionsBetween(meshSelected, allMeshesButSelectedOne);
        if (collisionsSet.length > 0) {
            (areEquals(entity.transformationParams, entity.previousTransformationParams))
                ? removeEntityJustCreated(entity.keyComponent, dispatch)
                : setCollisions(collisionsSet)
        }
    }, [entity.keyComponent, setCollisions, entity.transformationParams, entity.previousTransformationParams, entity.geometryAttributes, scene, dispatch])

    return <></>
}

const removeEntityJustCreated = (entityKey: number, dispatch: Dispatch) => {
    dispatch(removeComponent(entityKey))
    alert("Esiste già un componente nella stessa posizione. Spostalo prima di crearne uno nuovo!")
}

const arrayOfCollisionsBetween = (meshSelected: THREE.Mesh, allMeshes: THREE.Mesh[]) => {
    return meshesCollidingWithTargetMesh(meshSelected, allMeshes).reduce((collisions: [number,number][], meshColliding) => {
        collisions.push([parseInt(meshSelected.name), parseInt(meshColliding.name)])
        return collisions
    },[])
 }
import * as THREE from "three";
import { meshWithcomputedGeometryBoundingFrom } from "./meshOpsAndSettings";

export const thereIsCollisionBetweenMeshes = (firstComponentEntity: THREE.Mesh, secondComponentEntity: THREE.Mesh) => {
    let mesh2 = meshWithcomputedGeometryBoundingFrom(secondComponentEntity);
    let mesh1 = meshWithcomputedGeometryBoundingFrom(firstComponentEntity)
    return (mesh1.geometry.boundingBox && mesh2.geometry.boundingBox)
        ? mesh1.geometry.boundingBox.intersectsBox(mesh2.geometry.boundingBox)
        : false

}
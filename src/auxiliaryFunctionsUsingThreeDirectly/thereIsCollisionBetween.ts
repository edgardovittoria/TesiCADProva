import * as THREE from "three";
import { meshWithcomputedGeometryBoundingFrom, meshWithPositionRotationScaleFromOldOne, transformationParamsOf } from "./meshOpsAndSettings";

export const thereIsCollisionBetweenMeshes = (firstMesh: THREE.Mesh, secondMesh: THREE.Mesh) => {
    let mesh2 = meshWithcomputedGeometryBoundingFrom(meshWithPositionRotationScaleFromOldOne(secondMesh, transformationParamsOf(secondMesh)));
    let mesh1 = meshWithcomputedGeometryBoundingFrom(meshWithPositionRotationScaleFromOldOne(firstMesh, transformationParamsOf(firstMesh)))
    return (mesh1.geometry.boundingBox && mesh2.geometry.boundingBox)
        ? mesh1.geometry.boundingBox.intersectsBox(mesh2.geometry.boundingBox)
        : false

}
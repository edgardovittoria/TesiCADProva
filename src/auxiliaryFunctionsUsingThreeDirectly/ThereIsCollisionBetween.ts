import { ComponentEntity } from "../model/ComponentEntity";
import * as THREE from "three";

export const thereIsCollisionBetween = (firstComponentEntity: ComponentEntity, secondComponentEntity: ComponentEntity) => {
    if (firstComponentEntity.box3Min !== undefined && firstComponentEntity.box3Max !== undefined && secondComponentEntity.box3Min !== undefined && secondComponentEntity.box3Max !== undefined) {
        let box3FirstComponent = new THREE.Box3(new THREE.Vector3(firstComponentEntity.box3Min[0], firstComponentEntity.box3Min[1], firstComponentEntity.box3Min[2]),
            new THREE.Vector3(firstComponentEntity.box3Max[0], firstComponentEntity.box3Max[1], firstComponentEntity.box3Max[2]))
        let box3SecondComponent = new THREE.Box3(new THREE.Vector3(secondComponentEntity.box3Min[0], secondComponentEntity.box3Min[1], secondComponentEntity.box3Min[2]),
            new THREE.Vector3(secondComponentEntity.box3Max[0], secondComponentEntity.box3Max[1], secondComponentEntity.box3Max[2]))

        return box3FirstComponent.intersectsBox(box3SecondComponent)
    }
    return false
}
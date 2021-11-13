import { ComponentEntity, CompositeEntity, CubeEntity, SphereEntity } from "../../model/ComponentEntity";
import { Cube } from "../canvas/components/cube";
import { FC, MutableRefObject } from "react";
import { Composite } from "../canvas/components/composite";
import { Sphere } from "../canvas/components/sphere";

interface FactoryComponentProps{
    entity: ComponentEntity,
    orbit: MutableRefObject<null>
}

export const FactoryComponent : FC<FactoryComponentProps> = ({entity, orbit}) => {
    switch (entity.type) {
        case "CUBE":
            let cubeEntity = entity as CubeEntity
            return <Cube color={cubeEntity.color} width={cubeEntity.width} height={cubeEntity.height} depth={cubeEntity.depth} componentProps={{isSelected: cubeEntity.isSelected, keyComponent: cubeEntity.keyComponent, position: cubeEntity.position, rotation: cubeEntity.rotation, scale: cubeEntity.scale, orbit: orbit }}/>
        case "SPHERE":
            let sphereEntity = entity as SphereEntity
            return <Sphere color={sphereEntity.color} heightSegments={sphereEntity.heightSegments} widthSegments={sphereEntity.widthSegments} radius={sphereEntity.radius} componentProps={{isSelected: entity.isSelected, keyComponent: entity.keyComponent, position: entity.position, rotation: entity.rotation, scale: entity.scale, orbit: orbit }}/>
        default:
            return <Composite entity={entity as CompositeEntity} componentProps={{isSelected: entity.isSelected, keyComponent: entity.keyComponent, position: entity.position, rotation: entity.rotation, scale: entity.scale, orbit: orbit }} />
            // let [elementA, elementB] = getOperationElementsFrom(entity as CompositeEntity)
            // let meshComposite = (elementA && elementB) ? meshFromOperationBetweenElements(entity.type, elementA, elementB) : emptyObject();
            // (meshComposite.material as THREE.MeshBasicMaterial).color.set(entity.color)
            // return meshComposite

    }
}

// const getOperationElementsFrom = (compositeEntity: CompositeEntity) => {
//     let [positionA, scaleA, rotationA] = [compositeEntity.baseElements.elementA.position, compositeEntity.baseElements.elementA.scale, compositeEntity.baseElements.elementA.rotation]
//     let [positionB, scaleB, rotationB] = [compositeEntity.baseElements.elementB.position, compositeEntity.baseElements.elementB.scale, compositeEntity.baseElements.elementB.rotation]
//     let elementA = meshWithPositionRotationScaleFromOldOne(FactoryComponent(compositeEntity.baseElements.elementA) as THREE.Mesh, positionA, rotationA, scaleA)
//     let elementB = meshWithPositionRotationScaleFromOldOne(FactoryComponent(compositeEntity.baseElements.elementB) as THREE.Mesh, positionB, rotationB, scaleB)
//     return [elementA, elementB]
// }

// const meshFromOperationBetweenElements = (operation: string, elementA: THREE.Mesh, elementB: THREE.Mesh) => {
//     let newMesh: THREE.Mesh
//     if (operation === "UNION") { newMesh = CSG.union(elementA, elementB) }
//     else if (operation === "INTERSECTION") { newMesh = CSG.intersect(elementA, elementB) }
//     else { newMesh = CSG.subtract(elementA, elementB) }
//     return meshWithResetTransformationParamsFromOld(newMesh)
// }


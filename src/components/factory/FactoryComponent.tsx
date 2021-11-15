import {
    BufferEntity,
    ComponentEntity,
    CompositeEntity,
    ConeEntity,
    CubeEntity,
    CylinderEntity,
    SphereEntity,
    TorusEntity
} from "../../model/ComponentEntity";
import {Cube} from "../canvas/components/cube";
import {FC, MutableRefObject, useMemo} from "react";
import {Composite} from "../canvas/components/composite";
import {Sphere} from "../canvas/components/sphere";
import {BufferComponent} from "../canvas/components/bufferComponent";
import {Cylinder} from "../canvas/components/cylinder";
import {Component} from "../canvas/components/Component";
import {Torus} from "../canvas/components/torus";
import {Cone} from "../canvas/components/cone";
import {Box} from "@react-three/drei";

interface FactoryComponentProps {
    entity: ComponentEntity,
    orbit: MutableRefObject<null>
}

export const FactoryComponent: FC<FactoryComponentProps> = ({entity, orbit}) => {
    return (
        <Component isSelected={entity.isSelected} keyComponent={entity.keyComponent} orbit={orbit}
                       position={entity.position} rotation={entity.rotation} scale={entity.scale}>
                {factoryElements(entity)}
        </Component>
    )
}

const factoryElements = (entity: ComponentEntity) => {
    switch (entity.type) {
        case "CUBE":
            let cubeEntity = entity as CubeEntity
            return <Cube color={cubeEntity.color} width={cubeEntity.width} height={cubeEntity.height}
                         depth={cubeEntity.depth}/>
        case "SPHERE":
            let sphereEntity = entity as SphereEntity
            return <Sphere color={sphereEntity.color} heightSegments={sphereEntity.heightSegments}
                           widthSegments={sphereEntity.widthSegments} radius={sphereEntity.radius}/>
        case "BUFFER":
            let bufferEntity = entity as BufferEntity
            return <BufferComponent entity={bufferEntity}/>
        case "CYLINDER":
            let cylinderEntity = entity as CylinderEntity
            return <Cylinder topRadius={cylinderEntity.topRadius} bottomRadius={cylinderEntity.bottomRadius}
                             height={cylinderEntity.height}
                             color={cylinderEntity.color} heightSegments={cylinderEntity.heightSegments}
                             radialSegments={cylinderEntity.radialSegments}
                             thetaStart={cylinderEntity.thetaStart} thetaLength={cylinderEntity.thetaLength}
                             openEnded={cylinderEntity.openEnded}/>
        case "TORUS":
            let torusEntity = entity as TorusEntity
            return <Torus color={torusEntity.color} torusRadius={torusEntity.torusRadius}
                          tubeRadius={torusEntity.tubeRadius}
                          centralAngle={torusEntity.centralAngle} radialSegments={torusEntity.radialSegments}
                          tubularSegments={torusEntity.tubularSegments}/>
        case "CONE":
            let coneEntity = entity as ConeEntity
            return <Cone radius={coneEntity.radius} height={coneEntity.height}
                         color={coneEntity.color} heightSegments={coneEntity.heightSegments}
                         radialSegments={coneEntity.radialSegments}
                         thetaStart={coneEntity.thetaStart} thetaLength={coneEntity.thetaLength}
                         openEnded={coneEntity.openEnded}/>
        default:
            return <Composite entity={entity as CompositeEntity}/>

    }
}


import { FC, useMemo, useRef } from "react";
import { meshFrom } from "../../../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings";
import { CompositeEntity } from "../../../model/ComponentEntity";
import { Component, ComponentProps } from "./Component";


interface CompositeProps {
    entity: CompositeEntity
    componentProps: ComponentProps
}

export const Composite: FC<CompositeProps> = ({ entity, componentProps }) => {
    let compositeMesh = useMemo(() => meshFrom(entity), [entity.baseElements])
    const meshRef = useRef(null)
    return (
        <Component isSelected={componentProps.isSelected} keyComponent={componentProps.keyComponent} position={componentProps.position} rotation={componentProps.rotation} scale={componentProps.scale} orbit={componentProps.orbit}>
            <mesh ref={meshRef}>
                <bufferGeometry >
                    <bufferAttribute attachObject={["attributes", "position"]} itemSize={3} array={compositeMesh.geometry.attributes.position.array} count={compositeMesh.geometry.attributes.position.array.length/3}/>
                </bufferGeometry>
                <meshBasicMaterial color={entity.color} />
            </mesh>
        </Component>
    )
}

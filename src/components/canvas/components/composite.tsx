import { FC, useMemo } from "react";
import { meshFrom } from "../../../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings";
import { CompositeEntity } from "../../../model/ComponentEntity";


interface CompositeProps {
    entity: CompositeEntity
}

export const Composite: FC<CompositeProps> = ({ entity }) => {
    let compositeMesh = useMemo(() => meshFrom(entity), [entity.baseElements])

    return (
        <>
            <bufferGeometry>
                <bufferAttribute attachObject={["attributes", "position"]} itemSize={3}
                                 array={compositeMesh.geometry.attributes.position.array}
                                 count={compositeMesh.geometry.attributes.position.array.length / 3}/>
            </bufferGeometry>
            <meshBasicMaterial color={entity.color}/>
        </>
    )
}

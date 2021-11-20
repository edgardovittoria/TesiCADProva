import {FC, useMemo} from "react";
import {meshFrom} from "../../../auxiliaryFunctionsUsingThreeDirectly/meshOpsAndSettings";
import {BufferEntity} from "../../../model/ComponentEntity";

interface BufferComponentProps {
    entity: BufferEntity
}

export const BufferComponent: FC<BufferComponentProps> = ({entity}) => {
    let compositeMesh = useMemo(() => meshFrom(entity), [entity.positionVertices])

    return (
        <>
            <bufferGeometry>
                <bufferAttribute attachObject={["attributes", "position"]} itemSize={3}
                                 array={compositeMesh.geometry.attributes.position.array}
                                 count={compositeMesh.geometry.attributes.position.array.length / 3}/>
                <bufferAttribute attachObject={["attributes", "normal"]} itemSize={3}
                                 array={compositeMesh.geometry.attributes.normal.array}
                                 count={compositeMesh.geometry.attributes.normal.array.length / 3}/>
            </bufferGeometry>
            <meshPhongMaterial color={entity.color}/>
        </>
    )
}

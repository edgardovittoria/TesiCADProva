import {FC} from "react";
import {BufferEntity} from "../../../model/ComponentEntity";

interface BufferComponentProps {
    entity: BufferEntity
}

export const BufferComponent: FC<BufferComponentProps> = ({entity}) => {
    return (
        <>
            <bufferGeometry>
                <bufferAttribute attachObject={["attributes", "position"]} itemSize={3}
                                 array={entity.positionVertices}
                                 count={entity.positionVertices.length / 3}/>
                <bufferAttribute attachObject={["attributes", "normal"]} itemSize={3}
                                 array={entity.normalVertices}
                                 count={entity.normalVertices.length / 3}/>
            </bufferGeometry>
            <meshPhongMaterial color={entity.color}/>
        </>
    )
}

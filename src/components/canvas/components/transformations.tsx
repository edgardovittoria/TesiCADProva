import { TransformControls } from "@react-three/drei";
import { FC, MutableRefObject, useRef } from "react";
import { useTransformations } from "../../../hooks/useTransformations";

import { ComponentEntity } from "../../../model/ComponentEntity";

interface TransformationsProps {
    entity: ComponentEntity
    orbit: MutableRefObject<null>
}
export const Transformations: FC<TransformationsProps> = ({ entity, orbit, children }) => {
    const transformation = useRef(null)
    useTransformations(transformation, orbit)

    return (
        <TransformControls
            key={entity.keyComponent}
            ref={transformation}
            position={entity.position}
            rotation={entity.rotation}
            scale={entity.scale}
            type={undefined} isGroup={undefined} id={undefined} uuid={undefined}
            name={undefined}
            parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined}
            matrixWorld={undefined} matrixAutoUpdate={undefined}
            matrixWorldNeedsUpdate={undefined}
            castShadow={undefined} receiveShadow={undefined} frustumCulled={undefined}
            renderOrder={undefined} animations={undefined}
            userData={{ key: entity.keyComponent }}
            customDepthMaterial={undefined} customDistanceMaterial={undefined}
            isObject3D={undefined}
            onBeforeRender={undefined} onAfterRender={undefined}
            applyMatrix4={undefined}
            applyQuaternion={undefined} setRotationFromAxisAngle={undefined}
            setRotationFromEuler={undefined} setRotationFromMatrix={undefined}
            setRotationFromQuaternion={undefined} rotateOnAxis={undefined}
            rotateOnWorldAxis={undefined} rotateX={undefined} rotateY={undefined}
            rotateZ={undefined}
            translateOnAxis={undefined} translateX={undefined} translateY={undefined}
            translateZ={undefined} localToWorld={undefined} worldToLocal={undefined}
            lookAt={undefined} add={undefined} remove={undefined} clear={undefined}
            getObjectById={undefined} getObjectByName={undefined}
            getObjectByProperty={undefined}
            getWorldPosition={undefined} getWorldQuaternion={undefined}
            getWorldScale={undefined}
            getWorldDirection={undefined} raycast={undefined} traverse={undefined}
            traverseVisible={undefined} traverseAncestors={undefined}
            updateMatrix={undefined}
            updateWorldMatrix={undefined} toJSON={undefined} clone={undefined}
            copy={undefined}
            addEventListener={undefined} hasEventListener={undefined}
            removeEventListener={undefined}
            dispatchEvent={undefined} updateMatrixWorld={undefined} visible>
            {children as JSX.Element}
        </TransformControls>
    )
}
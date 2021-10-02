import React, {useState, Fragment, useRef, useEffect, Ref} from 'react';
import * as THREE from 'three';
import {Canvas, Object3DNode, useLoader, useThree} from "@react-three/fiber";
import {SolarSystem} from "./components/solarSystem";
import {OrbitControls, TransformControls} from "@react-three/drei";
import {Sfera} from "./components/sfera";
import {useSelector} from "react-redux";
import {canvasStateSelector} from "../../store/canvasSlice";
import {useControl, Controls} from "react-three-gui";

function Keen() {
    const orbit = useRef(null)
    const transform = useRef(null)
    const mode = useControl("mode", {type: "select", items: ["translate", "rotate", "scale"]})
    useEffect(() => {
        if (transform.current) {
            const controls: Object3DNode<any, any> = transform.current
            controls.setMode(mode)
            const callback = (event: any) => (orbit.current !== null) ? ((orbit.current as Object3DNode<any, any>).enabled = !event.value): console.log(event.value)
            controls.addEventListener("dragging-changed", callback)
            console.log(orbit)
            return () => controls.removeEventListener("dragging-changed", callback)
        }
    },[mode])
    return (
        <>
            <TransformControls ref={transform} type={undefined} isGroup={undefined} id={undefined} uuid={undefined} name={undefined} parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined} matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined} castShadow={undefined} receiveShadow={undefined} frustumCulled={undefined} renderOrder={undefined} animations={undefined} userData={undefined} customDepthMaterial={undefined} customDistanceMaterial={undefined} isObject3D={undefined} onBeforeRender={undefined} onAfterRender={undefined} applyMatrix4={undefined} applyQuaternion={undefined} setRotationFromAxisAngle={undefined} setRotationFromEuler={undefined} setRotationFromMatrix={undefined} setRotationFromQuaternion={undefined} rotateOnAxis={undefined} rotateOnWorldAxis={undefined} rotateX={undefined} rotateY={undefined} rotateZ={undefined} translateOnAxis={undefined} translateX={undefined} translateY={undefined} translateZ={undefined} localToWorld={undefined} worldToLocal={undefined} lookAt={undefined} add={undefined} remove={undefined} clear={undefined} getObjectById={undefined} getObjectByName={undefined} getObjectByProperty={undefined} getWorldPosition={undefined} getWorldQuaternion={undefined} getWorldScale={undefined} getWorldDirection={undefined} raycast={undefined} traverse={undefined} traverseVisible={undefined} traverseAncestors={undefined} updateMatrix={undefined} updateWorldMatrix={undefined} toJSON={undefined} clone={undefined} copy={undefined} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} updateMatrixWorld={undefined} visible>
                <group  position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} dispose={null}>
                    <Sfera radius={1} widthSegments={6} heightSegments={6} color="yellow"/>
                </group>
            </TransformControls>
            <OrbitControls ref={orbit} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined}  />
        </>
    )
}

interface MyCanvasProps {
}

export const MyCanvas: React.FC<MyCanvasProps> = () => {

    const moon: JSX.Element[] = [<Sfera radius={.2} widthSegments={6} heightSegments={6} color="grey" position={[1,0,0]} />]

    const solarSystemFigli: JSX.Element[] = [
        <Sfera radius={1} widthSegments={6} heightSegments={6} color="yellow" position={[0,0,0]}/>,
        <Sfera radius={.5} widthSegments={6} heightSegments={6} color="blue" position={[3,0,0]} children={moon} hasRotation={true}/>
    ]

    const components = useSelector(canvasStateSelector).components;
    console.log(components)



    return(
        <div id="canvas-container" style={{height:"100vh", backgroundColor:"#171A21"}}>


            <Controls.Provider>
            <Controls.Canvas style={{width: "100%", height:"100%"}}
                    camera={{position:[0,50,0], fov: 20, far:1000, near:0.1}}
            >

                    <ambientLight/>
                    <pointLight position={[20, 20, 20]} />
                    {/*{components}*/}
                    <gridHelper scale={[2.88,1,2.95]}/>
                    {/*<SolarSystem solarSystemFigli={solarSystemFigli}/>*/}
                    <Keen/>
            </Controls.Canvas>
            <Controls/>
            </Controls.Provider>
        </div>
    )

}
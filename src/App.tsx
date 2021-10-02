import React from 'react';
import {Canvas} from '@react-three/fiber';
import './App.css';
import {Cube} from "./components/canvas/components/cube";
import {OrbitControls, TransformControls} from '@react-three/drei';
import {Sfera} from "./components/canvas/components/sfera";
import {SolarSystem} from "./components/canvas/components/solarSystem";
import {SideBar} from "./components/sideBar";
import {MyCanvas} from "./components/canvas/MyCanvas";

function App() {



    return (
        <>
            <div className="row">
                <div className="column" style={{width: "14%", float:"left"}}>
                    <SideBar/>
                </div>
                <div className="column" style={{width: "86%", float:"left"}}>
                    <MyCanvas/>
                </div>

            </div>


        </>

      /*<div id="canvas-container" style={{width: "100%", height:"100vh", backgroundColor:"black"}}>
        <Canvas style={{width: "100%", height:"100%"}}
            camera={{position:[0,50,0], fov: 20, far:1000, near:0.1}}
          >
            <ambientLight/>
            <pointLight position={[20, 20, 20]} />
            <gridHelper/>
            <SolarSystem solarSystemFigli={solarSystemFigli}/>
            <OrbitControls addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined}/>
            {/!*<TransformControls type={undefined} isGroup={undefined} id={undefined} uuid={undefined} name={undefined} parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined} matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined} castShadow={undefined} receiveShadow={undefined} frustumCulled={undefined} renderOrder={undefined} animations={undefined} userData={undefined} customDepthMaterial={undefined} customDistanceMaterial={undefined} isObject3D={undefined} onBeforeRender={undefined} onAfterRender={undefined} applyMatrix4={undefined} applyQuaternion={undefined} setRotationFromAxisAngle={undefined} setRotationFromEuler={undefined} setRotationFromMatrix={undefined} setRotationFromQuaternion={undefined} rotateOnAxis={undefined} rotateOnWorldAxis={undefined} rotateX={undefined} rotateY={undefined} rotateZ={undefined} translateOnAxis={undefined} translateX={undefined} translateY={undefined} translateZ={undefined} localToWorld={undefined} worldToLocal={undefined} lookAt={undefined} add={undefined} remove={undefined} clear={undefined} getObjectById={undefined} getObjectByName={undefined} getObjectByProperty={undefined} getWorldPosition={undefined} getWorldQuaternion={undefined} getWorldScale={undefined} getWorldDirection={undefined} raycast={undefined} traverse={undefined} traverseVisible={undefined} traverseAncestors={undefined} updateMatrix={undefined} updateWorldMatrix={undefined} toJSON={undefined} clone={undefined} copy={undefined} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined}>
                <Sfera radius={1} widthSegments={6} heightSegments={6} color="red" position={[0,0,0]} />
            </TransformControls>*!/}
        </Canvas>
      </div>*/
  );
}

export default App;

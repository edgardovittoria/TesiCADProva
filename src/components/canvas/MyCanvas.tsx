import React, { FC, useEffect, useRef } from "react";
import {
  Provider,
  ReactReduxContext,
  useDispatch,
  useSelector,
} from "react-redux";
import { Canvas, Object3DNode, useThree } from "@react-three/fiber";
import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  TransformControls,
} from "@react-three/drei";
import * as THREE from "three";
import {
  ToolbarTransformationState,
  toolbarTransformationStateSelector,
} from "../../store/toolbarTransformationSlice";
import {
  componentseSelector,
  FactoryShapes,
  keySelectedComponenteSelector,
  TransformationParams,
  updateTransformationParams,
} from "cad-library";
import { Component } from "./components/Component";
import { ModalityManagerContext } from "../contexts/modalityManagerProvider";

interface MyCanvasProps {}

export const MyCanvas: React.FC<MyCanvasProps> = () => {
  const components = useSelector(componentseSelector);
  const keySelectedComponent = useSelector(keySelectedComponenteSelector);

  return (
    <div className="h-[92vh]">
      <ReactReduxContext.Consumer>
        {({ store }) => (
          // <MeshesAndCollisionsContext.Consumer>
          //   {(MeshesContextType) => (
              <ModalityManagerContext.Consumer>
                {(ModalityManagerContextType) => (
                  <>
                    <Canvas
                      className="w-full h-full"
                      style={{backgroundColor: 'whitesmoke'}}
                      camera={{
                        position: [0, 50, 0],
                        fov: 20,
                        far: 1000,
                        near: 0.1,
                      }}
                    >
                      <Provider store={store}>
                        {/* <MeshesAndCollisionsContext.Provider
                          value={MeshesContextType}
                        > */}
                          <ModalityManagerContext.Provider
                            value={ModalityManagerContextType}
                          >
                            <pointLight
                              position={[100, 100, 100]}
                              intensity={0.8}
                            />
                            <hemisphereLight
                              color="#ffffff"
                              groundColor={new THREE.Color("#b9b9b9")}
                              position={[-7, 25, 13]}
                              intensity={0.85}
                            />
                            {/* <SetMeshes components={components} /> */}
                            {components.map((component) => {
                              return (
                                <Component
                                  key={component.keyComponent}
                                  keyComponent={component.keyComponent}
                                  transformationParams={
                                    component.transformationParams
                                  }
                                >
                                  <FactoryShapes entity={component} />
                                </Component>
                              );
                            })}
                            {/* {keySelectedComponent !== 0 &&
                                                <DetectCollision entity={findComponentByKey(components, keySelectedComponent)} />
                                            } */}
                            <Controls
                              keySelectedComponent={keySelectedComponent}
                            />
                            <gridHelper
                              args={[40, 20, "#434141", "#434141"]}
                              scale={[1, 1, 1]}
                            />
                          </ModalityManagerContext.Provider>
                        {/* </MeshesAndCollisionsContext.Provider> */}
                      </Provider>
                    </Canvas>
                  </>
                )}
              </ModalityManagerContext.Consumer>
          //   )}
          // </MeshesAndCollisionsContext.Consumer>
        )}
      </ReactReduxContext.Consumer>
    </div>
  );
};

// const SetMeshes: FC<{ components: ComponentEntity[] }> = ({ components }) => {
//   const { scene } = useThree();
//   const { setMeshes } = useMeshes();
//   useEffect(() => {
//     setMeshes(getObjectsFromSceneByType(scene, "Mesh"));
//   }, [scene, components, setMeshes]);
//   return <></>;
// };

const Controls: FC<{ keySelectedComponent: number }> = ({
  keySelectedComponent,
}) => {
  const { scene, camera } = useThree();
  const transformation = useRef(null);
  const toolbarTransformationState = useSelector(
    toolbarTransformationStateSelector
  );
  const dispatch = useDispatch();

  function getActiveTransformationType(
    toolbarTranformationState: ToolbarTransformationState
  ): string {
    return toolbarTranformationState.transformation.filter(
      (transformation) => transformation.active
    )[0].type;
  }

  useEffect(() => {
    if (transformation.current) {
      const controls: Object3DNode<any, any> = transformation.current;
      controls.addEventListener("dragging-changed", onChangeHandler);
      return () =>
        controls.removeEventListener("dragging-changed", onChangeHandler);
    }
  });

  function onChangeHandler(event: THREE.Event) {
    if (!event.value && transformation.current) {
      const controls: Object3DNode<any, any> = transformation.current;
      let transformationParmas: TransformationParams = {
        position: [
          controls.worldPosition.x,
          controls.worldPosition.y,
          controls.worldPosition.z,
        ],
        rotation: [
          controls.object.rotation._x,
          controls.object.rotation._y,
          controls.object.rotation._z,
        ],
        scale: [
          controls.worldScale.x,
          controls.worldScale.y,
          controls.worldScale.z,
        ],
      };
      dispatch(updateTransformationParams(transformationParmas));
    }
  }

  let mesh = scene.getObjectByName(keySelectedComponent.toString());

  return (
    <>
      <TransformControls
        camera={camera}
        ref={transformation}
        children={<></>}
        object={mesh}
        showX={keySelectedComponent !== 0}
        showY={keySelectedComponent !== 0}
        showZ={keySelectedComponent !== 0}
        mode={getActiveTransformationType(toolbarTransformationState)}
      />
      <OrbitControls
        addEventListener={undefined}
        hasEventListener={undefined}
        removeEventListener={undefined}
        dispatchEvent={undefined}
        makeDefault
      />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport
          axisColors={["red", "green", "blue"]}
          labelColor="black"
        />
      </GizmoHelper>
    </>
  );
};

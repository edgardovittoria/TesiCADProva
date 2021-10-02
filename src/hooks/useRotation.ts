import {useFrame} from "@react-three/fiber";

export const useRotation = (ref: React.MutableRefObject<any>, xAxis: boolean, yAxis: boolean, zAxis: boolean, hasRotation: boolean) => {
    useFrame(({ clock }) => {
        if(hasRotation){
            if(xAxis){
                ref.current.rotation.x = clock.getElapsedTime()
            }
            if(yAxis){
                ref.current.rotation.y = clock.getElapsedTime()
            }
            if(zAxis){
                ref.current.rotation.z = clock.getElapsedTime()
            }
        }

    })
}
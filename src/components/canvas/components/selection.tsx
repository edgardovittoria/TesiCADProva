import { FC, useEffect } from "react";
import { Object3DNode, useThree } from "react-three-fiber";
import * as THREE from "three";

interface SelectionProps {

}

export const Selection : FC<SelectionProps> = ({}) => {
    const {camera, gl, scene} = useThree()
    let raycaster = new THREE.Raycaster()
    let mouse = {x:0, y:0}


    function selectObject ( e: any ) {
        mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    
        raycaster.setFromCamera( mouse, camera );  
        let intersects = raycaster.intersectObjects( scene.children );
        console.log(intersects)
        for ( var i = 0; i < intersects.length; i++ ) {
         //console.log( intersects[ i ] ); 
        
        }
    
    }

    useEffect(() => {
        gl.domElement.addEventListener("click", selectObject, false)
    },[])

    return null
}


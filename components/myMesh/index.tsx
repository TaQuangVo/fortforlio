import { RootState, useThree } from "@react-three/fiber";
import {FC, useRef, useEffect} from "react"
import * as THREE from "three"
import myCustomMaterial from "./myCustomMaterial"

declare global {
    namespace JSX {
        interface IntrinsicElements {
            myCustomMaterial: any,
        }
    }
}

const getVirtualSceenSize = (Sceen:any):{width:number, height:number} => {
    const cameraPosZ = Sceen.camera.position.z
    const cameraAspect = Sceen.camera.aspect
    const cameraFov = Sceen.camera.fov * (Math.PI / 180)

    const height = cameraPosZ * Math.tan(cameraFov / 2) * 2
    const width = height * cameraAspect

    return {
        width: width,
        height: height
    }
}

const MyMesh:FC = () => {
    const material = useRef<null | THREE.ShaderMaterial>(null)
    const vitualSceen = useThree()

    const vitualScreenSize = getVirtualSceenSize(vitualSceen)

    if(material.current)
    {
        material.current!.uniforms.screenSize.value = new THREE.Vector2(vitualScreenSize.width, vitualScreenSize.height)
    }

    return (
        <mesh>
            <planeBufferGeometry args={[1,1,10,10]} />
            <myCustomMaterial wireframe={true} ref={material} />
        </mesh>
    )
}

export default MyMesh
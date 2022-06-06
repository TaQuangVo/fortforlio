import { useThree, useFrame } from "@react-three/fiber";
import {FC, useRef} from "react"
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

    //update vitual screen size on change and init
    const vitualScreenSize = getVirtualSceenSize(vitualSceen)
    if(material.current)
        material.current.uniforms.uScreenSize.value = new THREE.Vector2(vitualScreenSize.width, vitualScreenSize.height)

    //update utime
    useFrame(({clock})=>{
        if(material.current)
            material.current.uniforms.uTime.value = clock.getElapsedTime()
    })

    return (
        <mesh>
            <planeBufferGeometry args={[1,1,25,25]} />
            <myCustomMaterial wireframe={true} ref={material} />
        </mesh>
    )
}

export default MyMesh
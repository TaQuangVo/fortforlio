import * as THREE from "three"
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import "./customMaterial"
import { useEffect, useRef } from "react"

declare global {
    namespace JSX {
        interface IntrinsicElements {
            customMaterial: any,
        }
    }
}

const getVirtualSceenSize = (Sceen:any):THREE.Vector2 => {
    const cameraPosZ = Sceen.camera.position.z - 3
    const cameraAspect = Sceen.camera.aspect
    const cameraFov = Sceen.camera.fov * (Math.PI / 180)

    const height = cameraPosZ * Math.tan(cameraFov / 2) * 2
    const width = height * cameraAspect

    return new THREE.Vector2(width, height)
}

function sceenCover () {
    const materialL = useRef<null | THREE.ShaderMaterial>(null)
    const materialR = useRef<null | THREE.ShaderMaterial>(null)
    const meshL = useRef<null | THREE.Mesh>(null)
    const meshR = useRef<null | THREE.Mesh>(null)
    const vitualSceen = useThree()

    //load sceen texture
    const texture = useLoader(THREE.TextureLoader, "introTexture.jpg")

    useEffect(() => {
        //update vitual screen size on change and init
        const vitualScreenSize = getVirtualSceenSize(vitualSceen)
        const actualScreensize = new THREE.Vector2(window.innerWidth, window.innerHeight)

        if(materialL.current){
            materialL.current.uniforms.uScreenSize.value = vitualScreenSize
            materialL.current.uniforms.uResolution.value = actualScreensize
            materialL.current.uniforms.uIsLeft.value = -1
            materialL.current.uniforms.uTexture.value = texture
        }
        if(materialR.current){
            materialR.current.uniforms.uScreenSize.value = vitualScreenSize
            materialR.current.uniforms.uResolution.value = actualScreensize
            materialR.current.uniforms.uIsLeft.value = 1
            materialR.current.uniforms.uTexture.value = texture
        }

        //update sceen texture on change
        const textDim = new THREE.Vector2(texture.image.width, texture.image.height)
        if(materialL.current)
            materialL.current.uniforms.uTextureDimentions.value = textDim
        if(materialR.current)
            materialR.current.uniforms.uTextureDimentions.value = textDim

    })

     //update utime
     useFrame(({clock})=>{
        //if(materialL.current)
            //materialL.current.uniforms.uTime.value = clock.getElapsedTime()
    })

    return (
        <>
            <mesh ref={meshL} position={[0,0,3]}>
                <planeGeometry attach="geometry" args={[1, 1, 10, 10]} />
                <customMaterial ref={materialL} attach="material" wireframe={false}/>
            </mesh>
            <mesh ref={meshR} position={[0,0,3]}>
                <planeGeometry attach="geometry" args={[1, 1, 10, 10]} />
                <customMaterial ref={materialR} attach="material"  wireframe={false}/>
            </mesh>
        </>
    )
}

export default sceenCover
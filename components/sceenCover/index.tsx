import * as THREE from "three"
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import "./customMaterial"
import { useEffect, useRef, forwardRef,MutableRefObject,ForwardedRef } from "react"


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

interface refInterface1 {
    materialL: MutableRefObject<THREE.ShaderMaterial | null>,
    materialR: MutableRefObject<THREE.ShaderMaterial | null>,
}


const sceenCover = (props:any, ref:any) => {
    const meshL = useRef<null | THREE.Mesh>(null)
    const meshR = useRef<null | THREE.Mesh>(null)
    const vitualSceen = useThree()
    const isInitLoad = useRef(true)

    //load sceen texture
    const texture = useLoader(THREE.TextureLoader, "introTexture.jpg")

    useEffect(() => {
        //update vitual screen size on change and init
        const vitualScreenSize = getVirtualSceenSize(vitualSceen)
        const actualScreensize = new THREE.Vector2(window.innerWidth, window.innerHeight)
        const textDim = new THREE.Vector2(texture.image.width, texture.image.height)

        const materialL:MutableRefObject<THREE.ShaderMaterial | null> = ref.current.materialL
        const materialR:MutableRefObject<THREE.ShaderMaterial | null> = ref.current.materialR

        if(materialL.current){
            materialL.current.uniforms.uScreenSize.value = vitualScreenSize
            materialL.current.uniforms.uResolution.value = actualScreensize
            materialL.current.uniforms.uIsLeft.value = -1
            materialL.current.uniforms.uTexture.value = texture
            materialL.current.uniforms.uTextureDimentions.value = textDim
        }
        if(materialR.current){
            materialR.current.uniforms.uScreenSize.value = vitualScreenSize
            materialR.current.uniforms.uResolution.value = actualScreensize
            materialR.current.uniforms.uIsLeft.value = 1
            materialR.current.uniforms.uTexture.value = texture
            materialR.current.uniforms.uTextureDimentions.value = textDim

        }

        if(isInitLoad.current && materialL.current && materialR.current && meshL.current && meshR.current)
        {
            meshL.current.updateMatrixWorld()
            meshR.current.updateMatrixWorld()
            materialL.current.uniforms.uSavedModelMatrix.value.copy(meshL.current.matrixWorld)
            materialR.current.uniforms.uSavedModelMatrix.value.copy(meshR.current.matrixWorld)
            isInitLoad.current = false
        }
    })

     //update utime
     useFrame(({clock})=>{
        const materialL:MutableRefObject<THREE.ShaderMaterial | null> = ref.current.materialL
        const materialR:MutableRefObject<THREE.ShaderMaterial | null> = ref.current.materialR

        if(materialL.current){
            materialL.current.uniforms.uTime.value = clock.getElapsedTime()
        }
        if(materialR.current){
            materialR.current.uniforms.uTime.value = clock.getElapsedTime()
        }

        //if(meshL.current)
            //meshL.current.position.x -= 0.0005
        //if(meshR.current)
            //meshR.current.position.x += 0.0005
    })

    return (
        <>
            <mesh ref={meshL} position={[0,0,3]}>
                <planeGeometry attach="geometry" args={[1, 1, 160, 160]} />
                <customMaterial ref={ref.current.materialL} attach="material" wireframe={false}/>
            </mesh>
            <mesh ref={meshR} position={[0,0,3]}>
                <planeGeometry attach="geometry" args={[1, 1, 160, 160]} />
                <customMaterial ref={ref.current.materialR} attach="material"  wireframe={false}/>
            </mesh>
        </>
    )
}


export default forwardRef(sceenCover)
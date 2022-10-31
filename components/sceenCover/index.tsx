import * as THREE from "three"
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import "./customMaterial"
import { useEffect, useRef, forwardRef,MutableRefObject } from "react"


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


const SceenCover = (props:any, ref:any) => {
    const meshL = useRef<null | THREE.Mesh>(null)
    const meshR = useRef<null | THREE.Mesh>(null)
    const vitualSceen = useThree()

    //load sceen texture
    const texture = useLoader(THREE.TextureLoader, "introTexture.jpg")

    useEffect(() => {
        //update vitual screen size on change and init
        const vitualScreenSize = getVirtualSceenSize(vitualSceen)
        const actualScreensize = new THREE.Vector2(window.innerWidth, window.innerHeight)
        const textDim = new THREE.Vector2(texture.image.width, texture.image.height)

        const materialL:MutableRefObject<THREE.ShaderMaterial | null> = ref.current.materialL
        const materialR:MutableRefObject<THREE.ShaderMaterial | null> = ref.current.materialR

        if(!materialL.current || !materialR.current || !meshL.current || !meshR.current)
            return
        
        materialL.current.uniforms.uScreenSize.value = vitualScreenSize
        materialL.current.uniforms.uResolution.value = actualScreensize
        materialL.current.uniforms.uIsLeft.value = -1
        materialL.current.uniforms.uTexture.value = texture
        materialL.current.uniforms.uTextureDimentions.value = textDim
    
        materialR.current.uniforms.uScreenSize.value = vitualScreenSize
        materialR.current.uniforms.uResolution.value = actualScreensize
        materialR.current.uniforms.uIsLeft.value = 1
        materialR.current.uniforms.uTexture.value = texture
        materialR.current.uniforms.uTextureDimentions.value = textDim
    
        meshL.current.updateMatrixWorld()
        meshR.current.updateMatrixWorld()
        materialL.current.uniforms.uSavedModelMatrix.value.copy(meshL.current.matrixWorld)
        materialR.current.uniforms.uSavedModelMatrix.value.copy(meshR.current.matrixWorld)

        console.log("set open sceen animation from sceenCover")
        props.openSceenTl
        .fromTo(materialL.current.uniforms.uProgress,{
            value:0
        },{
            value:1,
            duration:3,
        },0)
        .fromTo(materialR.current.uniforms.uProgress,{
            value:0
        },{
            value:1,
            duration:3,
        },0)
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

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


export default forwardRef(SceenCover)
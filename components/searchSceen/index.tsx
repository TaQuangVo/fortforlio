import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from "three"
import gsap from 'gsap'

    

function searchSceen() {
    const { camera, gl } = useThree()
    gl.outputEncoding = THREE.sRGBEncoding

    //object instance ref
    const topCube = useRef<null | any>(null)
    const piramidTop = useRef<null | any>(null)
    const aboutText = useRef<Array<any>>([0,0,0,0,0])

    let gltf = useLoader(GLTFLoader, 'searchSceen.glb')

    //sceen texture
    const sceenTexture = useLoader(THREE.TextureLoader, 'blacknwhite.jpg')
    sceenTexture.flipY = false
    sceenTexture.encoding = THREE.sRGBEncoding
    const sceenMaterial = new THREE.MeshBasicMaterial({map:sceenTexture})

    //floor texture
    const floorTexture = useLoader(THREE.TextureLoader, 'blackfloor.jpg')
    floorTexture.flipY = false
    floorTexture.encoding = THREE.sRGBEncoding
    const floorMaterial = new THREE.MeshBasicMaterial({map:floorTexture})
    floorMaterial.transparent = true

    //text Texture
    const textTexture = useLoader(THREE.TextureLoader, 'text.jpg')
    textTexture.flipY = false
    textTexture.encoding = THREE.sRGBEncoding
    const textMaterial = new THREE.MeshBasicMaterial({map:textTexture})
    floorMaterial.transparent = true


    //apply texture
    gltf.scene.traverse((child:any) => {
        child.material = sceenMaterial

        if(child.name === "Plane")
            child.material = floorMaterial

        if(child.name === "Cube036")
            topCube.current = child

        if(child.name === "Cube051")
            piramidTop.current = child

        if(child.name.includes("sTextAbout"))
        {
            aboutText.current[parseInt(child.name[10]) - 1] = child
            child.material = textMaterial   
        }
    })

    gltf.scene.scale.set(0.4,.4,.4)
    gltf.scene.position.set(0,-1.2,0)

    useFrame((frame) => {
        if(topCube.current)
            topCube.current.rotation.set(-0.8879397732615295,Math.sin(frame.clock.elapsedTime*1.5),Math.sin(frame.clock.elapsedTime))
        if(piramidTop.current)
            piramidTop.current.rotation.set(0,Math.sin(frame.clock.elapsedTime*1) * 5,0)
    })

    useEffect(() => {
        var tl = gsap.timeline()

        aboutText.current.forEach((text:any) => {
            tl.from(text.scale, {duration:.3, x:0, y:0, z:0, ease:"power3.out"})
        })

        return () => {
            tl.kill()
        }
    },[])


    console.log("render Sceen")
    return (
        <Suspense fallback={null}>
            <primitive object={gltf.scene} />
        </Suspense>
    )
  }

export default searchSceen
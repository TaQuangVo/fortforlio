import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { forwardRef, Suspense, useEffect, useRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from "three"
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

    

function SearchSceen(props:any, ref:any) {
    const { camera, gl } = useThree()
    gl.outputEncoding = THREE.sRGBEncoding

    //object instance ref
    const topCube = useRef<null | any>(null)
    const piramidTop = useRef<null | any>(null)
    const aboutText = useRef<Array<any>>([0,0,0,0,0])

    let gltf = useLoader(GLTFLoader, 'searchSceen.glb')
    ref.current.gltf.current = gltf;

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

    //sceen default position
    gltf.scene.scale.set(0.4,.4,.4)
    gltf.scene.position.set(0,-1.2,0)
    gltf.scene.rotation.x = .15

    useFrame((frame) => {
        if(topCube.current)
            topCube.current.rotation.set(-0.8879397732615295,Math.sin(frame.clock.elapsedTime*1.5),Math.sin(frame.clock.elapsedTime))
        if(piramidTop.current)
            piramidTop.current.rotation.set(0,Math.sin(frame.clock.elapsedTime*1) * 5,0)
    })

    useEffect(() => {
        var tl = gsap.timeline({
            scrollTrigger:{
                trigger:"#section_in_animation",
                start:"0% 0%",
                end:"100% 0%",
                scrub:true,
            }
        })

        aboutText.current.forEach((text:any) => {
            tl.from(text.scale, {
                duration:0.3, 
                x:0, 
                y:0, 
                z:0, 
                ease:"power3.out",
            })
        })

        props.openSceenTl.fromTo(gltf.scene.position,{
            z:-3.5,
        },{
            z:0,
            duration:3
        },0)
        .fromTo(gltf.scene.rotation,{
            x:0.65,
        },{
            x:0.15,
            duration:3
        },0)
        return () => {
            tl.kill()

        }
    },[])

    return (
        <Suspense fallback={null}>
            <primitive object={gltf.scene} />
        </Suspense>
    )
  }

export default forwardRef(SearchSceen)
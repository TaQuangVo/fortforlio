import { FC, useEffect, useRef } from "react"
import styles from './styles.module.css'
import { Canvas } from "@react-three/fiber"
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import * as THREE from "three"
import * as dat from  "dat.gui"

import SearchSceen from "../searchSceen"
import SceenCover from "../sceenCover"


gsap.registerPlugin(ScrollTrigger);

const ThreeScreen:FC = () => {
    const screenCoverRef = useRef({
        materialL:useRef<null | THREE.ShaderMaterial>(null),
        materialR:useRef<null | THREE.ShaderMaterial>(null),
    })
    const searchSceenRef = useRef({
        gltf:useRef<null | any>(null),
    })

    const st = ScrollTrigger.getById("screen_cover_intro_st")
    if(st) st.kill()

    let openSceenTl = gsap.timeline({
        id:"screen_cover_intro_tl",
        scrollTrigger:{
            id:"screen_cover_intro_st",
            trigger:"#open_sceen",
            scrub:true,
            start: "0% 0%",
            end:"100% 0%",
        }
    })

    const tl1 = gsap.getById("screen_cover_intro_tl")
    console.log("tl created")
    console.log(tl1)

    setTimeout(() => {
        console.log(ScrollTrigger.getAll())
    }, 3000);

    useEffect(() => {
        const gui = new dat.GUI()
        const progress = {value: 0.0}
        
        const materialL = screenCoverRef.current.materialL
        const materialR = screenCoverRef.current.materialR
        const gltf = searchSceenRef.current.gltf
        
        
        gui
        .add(progress, "value", 0, 1, 0.01).name("progress")
        .onChange((value:number) => {
                materialL.current!.uniforms.uProgress.value = value
                materialR.current!.uniforms.uProgress.value = value
                
                gltf.current!.scene.position.z = -3.5 * (1-value)
                gltf.current!.scene.rotation.x = .5 * (1-value) + .15
        })
        
        return () => {
            gui.destroy()
        }
    }, [])
    
    return (
        <div className={[styles.container, "three_canvas"].join(" ")}>
            <Canvas camera={{ position:[0,0,4]}} >
                <SceenCover ref={screenCoverRef} openSceenTl={openSceenTl}/>
                <SearchSceen ref={searchSceenRef} openSceenTl={openSceenTl}/>
            </Canvas>
        </div>
    )
}

export default ThreeScreen;
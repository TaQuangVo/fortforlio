import { FC, useEffect, useRef } from "react"
import styles from './styles.module.css'
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three"
import * as dat from  "dat.gui";

import SearchSceen from "../searchSceen"
import SceenCover from "../sceenCover"

const CameraController = () => {
    const { camera, gl } = useThree();
    const orbitOrigin = new THREE.Vector3(0,1.2,0)

    return <OrbitControls args={[camera,gl.domElement]} target={orbitOrigin}/>;
  };

const ThreeScreen:FC = () => {
    const screenCoverRef = useRef({
        materialL:useRef<null | THREE.ShaderMaterial>(null),
        materialR:useRef<null | THREE.ShaderMaterial>(null),
    })
    const searchSceenRef = useRef({
        gltf:useRef<null | any>(null),
    })

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
        <div className={styles.container}>
            <Canvas camera={{ position:[0,0,4]}} >
                <SceenCover ref={screenCoverRef}/>
                <SearchSceen ref={searchSceenRef}/>
            </Canvas>
        </div>
    )
}

export default ThreeScreen;
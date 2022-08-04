import { FC, useEffect } from "react"
import styles from './styles.module.css'
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three"

import SearchSceen from "../searchSceen"
import SceenCover from "../sceenCover"

const CameraController = () => {
    const { camera, gl } = useThree();
    const orbitOrigin = new THREE.Vector3(0,1.2,0)

    return <OrbitControls args={[camera,gl.domElement]} target={orbitOrigin}/>;
  };

const ThreeScreen:FC = () => {
    
    return (
        <div className={styles.container}>
            <Canvas camera={{ position:[0,0,4]}} >
                <SceenCover />
                <SearchSceen />
            </Canvas>
        </div>
    )
}

export default ThreeScreen;
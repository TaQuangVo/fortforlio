import { FC } from "react"
import styles from './styles.module.css'
import { Canvas } from "@react-three/fiber"
import MyMesh from '../myMesh'


const ThreeScreen:FC = () => {
    return (
        <div className={styles.container}>
            <Canvas >
                <MyMesh />
            </Canvas>
        </div>
    )
}

export default ThreeScreen;
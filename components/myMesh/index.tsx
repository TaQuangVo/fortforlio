import {FC} from "react"
import * as THREE from "three"
import "./myCustomMaterial"


const MyMesh:FC = () => {
    console.log(THREE)
    return (
        <mesh>
            <planeBufferGeometry args={[1,1,10,10]} />
            //<meshBasicMaterial  wireframe={true}/>
            <myCustomMaterial wireframe={true}/>
        </mesh>
    )
}

export default MyMesh
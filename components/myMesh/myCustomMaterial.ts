
import * as THREE from "three"
import {extend} from "@react-three/fiber"
import vertexShader from "./vertexShader"
import fragmentShader from "./fragmentShader";

class MyCustomMaterial extends THREE.ShaderMaterial {
    constructor(){
        super({
            uniforms:{
                uScreenSize:{value: new THREE.Vector2(1,1)},
                uTime:{value:0.0},
                uZoomProgress: {value: 1.0},
            },
            vertexShader: vertexShader(),
            fragmentShader: fragmentShader(),
        });
    }
}
extend({MyCustomMaterial})

export default MyCustomMaterial



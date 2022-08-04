
import * as THREE from "three"
import {extend} from "@react-three/fiber"
import vertexShader from "./vertexShader"
import fragmentShader from "./fragmentShader";

class CustomMaterial extends THREE.ShaderMaterial {
    constructor(){
        super({
            uniforms:{
                uScreenSize:{value: new THREE.Vector2(1,1)},
                uResolution: { value: new THREE.Vector2( 0, 0) },
                uTime:{value:0.0},
                uIsLeft: {value: 1.0},
                uTexture: {value:null},
                uTextureDimentions: {value: new THREE.Vector2(0,0)},
            },
            vertexShader: vertexShader(),
            fragmentShader: fragmentShader(),
        });
    }
}
extend({CustomMaterial})
export default CustomMaterial



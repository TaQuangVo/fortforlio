
import * as THREE from "three"
import {extend} from "@react-three/fiber"

class MyCustomMaterial extends THREE.ShaderMaterial {
    constructor(){
        super({
            uniforms:{
                screenSize:{value: new THREE.Vector2(1,1)},
            },
            vertexShader: `
                varying vec2 vUv;

                uniform vec2 screenSize;

                void main() {
                    vUv = uv;
                    vec3 pos = position;

                    pos.xy *= screenSize;

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
        
                void main() {
                    gl_FragColor = vec4(vUv, 1.0, 1.0);
                }
            `,
        });
    }
}
extend({MyCustomMaterial})

export default MyCustomMaterial



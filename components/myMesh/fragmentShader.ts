const fragmentShader = ():string => {
    return `
    varying vec2 vUv;

        void main() {
            gl_FragColor = vec4(vUv, .9, 1.0);
        }
    `
}
export default fragmentShader

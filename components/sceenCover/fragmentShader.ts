const fragmentShader = ():string => {
    return `
        uniform float uTime;
        varying vec2 vUv;
        uniform vec2 uResolution;
        varying vec4 vTexCords;
        uniform sampler2D uTexture;
        uniform vec2 uTextureDimentions;

        vec2 preserveAspectRatioSlice(vec2 uv, vec2 screenSize, vec2 imageSize ){
      
            vec2 ratio = vec2(
                min((screenSize.x / screenSize.y) / (imageSize.x / imageSize.y), 1.0),
                min((screenSize.y / screenSize.x) / (imageSize.y / imageSize.x), 1.0)
            );
            
            vec2 sliceUvs = vec2(
                uv.x * ratio.x + (1.0 - ratio.x) * 0.5,
                uv.y * ratio.y + (1.0 - ratio.y) * 0.5
            );
            return sliceUvs;
        }
        
        void main() {
            vec2 uv = vTexCords.xy/vTexCords.w * 0.5 + 0.5;

            uv = preserveAspectRatioSlice(uv, uResolution, uTextureDimentions);

            vec4 texture = texture2D(uTexture, uv);

            gl_FragColor = vec4(texture.rgb, 1.0);
        }
    `
}
export default fragmentShader

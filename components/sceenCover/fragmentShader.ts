const fragmentShader = ():string => {
    return `
        varying vec2 vUv;
        varying vec3 vRecalcNormal;
        varying vec3 vFragPos;
        varying vec4 vTexCords;

        uniform sampler2D uTexture;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uTextureDimentions;
        uniform float uProgress;

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
            vec3 one = vec3(1.0);

            vec2 uv = vTexCords.xy/vTexCords.w * 0.5 + 0.5;
            uv = preserveAspectRatioSlice(uv, uResolution, uTextureDimentions);

            vec4 texture = texture2D(uTexture, uv + vFragPos.z * .05);

            //lighing
            vec3 lightPos = vec3(3. ,2. , 10.);

            vec3 lightColor = vec3(1.,1.,1.);
            vec3 lightDir = normalize(lightPos - vFragPos); 

            float diff = max(dot(vRecalcNormal, lightDir), 0.0);
            vec3 diffuse = diff * lightColor;

            vec3 result = diffuse * texture.rgb;

            gl_FragColor = vec4(result, 1.0);
        }
    `
}
export default fragmentShader

const vertexShader = ():string => {
    return `
                vec3 distordPlane(vec3 pointPlane, vec2 uv, float uTime, float progress, float isLeft, float screenWidth) {
                    vec3 distordedPlane = pointPlane;

                    //convert uv
                    vec2 uv2 = uv;
                    uv2.x *= isLeft;
                    uv2.x = ((isLeft+1.0)/2.) - uv2.x;

                    //distord
                    float wave1 = 0.03 * (uv2.x*uv2.x) * sin(pointPlane.x * 30. * (progress+.5) + uTime);
                    distordedPlane.z += wave1*progress;

                    //open
                    //uv2.y = 1. - uv2.y;
                    //float open = (-1./ (5.*uv2.y + 3.) ) + 1.;
                    //distordedPlane.x += open*progress*isLeft*screenWidth*.8;

                    float open = 0.99 * uv2.x + 1.;
                    distordedPlane.x += open*progress*isLeft*screenWidth*.3;



                    //lift off
                    distordedPlane.y += progress*.05;

                    return distordedPlane;
                }

                varying vec2 vUv;
                varying vec4 vTexCords;
                varying vec3 vRecalcNormal;
                varying vec3 vFragPos;

                uniform vec2 uScreenSize;
                uniform float uTime;
                uniform float uIsLeft;
                uniform mat4 uSavedModelMatrix;
                uniform float uProgress;

                void main() {
                    vUv = uv;
                    vec3 scaledPos = position;
                    vec3 distordPos;

                    scaledPos.xy *= uScreenSize;
                    scaledPos.x /= 2.;
                    scaledPos.x += uScreenSize.x/4.0*uIsLeft;

                    vTexCords = projectionMatrix * viewMatrix * uSavedModelMatrix * vec4(scaledPos, 1.0);

                    distordPos.xyz = distordPlane(scaledPos.xyz, vUv, uTime, uProgress, uIsLeft, uScreenSize.x);
                    vFragPos = distordPos.xyz;

                    //calculate nearby points.
                    float factor = 0.001;

                    //nearby points befor distord
                    vec3 nearby1, nearby2;
                    nearby1 = scaledPos.xyz;
                    nearby2 = scaledPos.xyz;
                    nearby1.x += factor;
                    nearby2.y += factor;

                    //nerby points after distored
                    nearby1 = distordPlane(nearby1, vUv, uTime, uProgress, uIsLeft, uScreenSize.x);
                    nearby2 = distordPlane(nearby2, vUv, uTime, uProgress, uIsLeft, uScreenSize.x);

                    nearby1 -= distordPos.xyz;
                    nearby2 -= distordPos.xyz;

                    //normal of pos
                    vRecalcNormal = cross(normalize(nearby1), normalize(nearby2));

                    gl_Position = projectionMatrix * modelViewMatrix *vec4(distordPos, 1.0);
                }`
}
export default vertexShader
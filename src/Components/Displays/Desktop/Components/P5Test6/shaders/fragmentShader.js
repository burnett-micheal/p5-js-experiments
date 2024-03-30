const fragmentShader = `
precision mediump float;

varying vec2 pos;

void main() {
  vec4 c1 = vec4(pos.y, 0., 1. - pos.y, 1.);
  vec4 c2 = vec4(pos.y, 1., 1. - pos.y, 1.);
  vec4 c3 = vec4(pos.y, 0., 1. - pos.y, 1.);
  vec4 c4 = vec4(pos.y, 1., 1. - pos.y, 1.);

  vec4 top = mix(c1, c2, pos.x);
  vec4 bottom = mix(c3, c4, pos.x);

  gl_FragColor = mix(bottom, top, pos.y);
}
`;

export default fragmentShader;
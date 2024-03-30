import p5 from "p5";
import { v2, rgb, drawRect } from "../../../../../Utils/Maths/pointAlongGeometry.js";
import fragmentShader from "./shaders/fragmentShader.js";
import vertexShader from "./shaders/vertexShader.js";

let shader = undefined;
let start = undefined;

const preload = async (p) => {
  shader = p.createShader(vertexShader, fragmentShader);
}

const setup = (p) => {
  p.createCanvas(800, 800, p.WEBGL);
  p.shader(shader);
  p.frameRate(60);
  p.noStroke();
  start = Date.now();
}

const draw = (p) => {
  p.clear();
  shader.setUniform("millis", Date.now() - start);
  p.ellipse(0, 0, 400, 400, 300);
}

export { preload, setup, draw };
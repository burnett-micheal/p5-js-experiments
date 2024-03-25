import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Box } from "@mui/material";

const P5Test1 = () => {

  const sketch = (p5) => {
    p5.setup = () => p5.createCanvas(800, 800, p5.WEBGL);
  
    p5.draw = () => {
      p5.background(0);
      p5.normalMaterial();
      p5.push();
      p5.rotateZ(p5.frameCount * 0.01);
      p5.rotateX(p5.frameCount * 0.01);
      p5.rotateY(p5.frameCount * 0.01);
      p5.plane(100);
      p5.pop();
    };
  }

  return (
    <Box p="2vw" display="flex" flexDirection="row" justifyContent={"center"} >
      <ReactP5Wrapper sketch={sketch} />
    </Box>
  );
}

export default P5Test1;
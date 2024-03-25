import { useEffect, useRef } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Box } from "@mui/material";
import p5 from "p5";

import { pointAlongCircle } from "../../../../Utils/Maths/pointAlongGeometry.js";

const P5Test3 = () => {
  const myRef = useRef(undefined);
  let myP5 = undefined;

  const canvas = {
    size: {
      width: 800,
      height: 800
    }
  };

  const circle = {
    radius: 250,
    circumference: 2 * Math.PI * 250,
    center: { x: canvas.size.width / 2, y: canvas.size.height / 2 }
  };

  const ball = {
    pos: {
      x: circle.center.x,
      y: circle.center.y - circle.radius
    },
    size: {
      width: 50,
      height: 50
    }
  };

  const sketch = (p) => {
     p.setup = () => {
      p.createCanvas(canvas.size.width, canvas.size.height, p5.WEBGL);
     }

     p.draw = () => {
      p.background(10);
      const moveDistance = 500 * (p.deltaTime / 1000);

      const curPos = ball.pos;
      const newPos = pointAlongCircle(curPos, moveDistance, circle.center, circle.circumference, circle.radius);
      ball.pos.x = newPos.x;
      ball.pos.y = newPos.y;

      p.ellipse(ball.pos.x, ball.pos.y, ball.size.width, ball.size.height);
     }
  }

  useEffect(() => {
    myP5 = new p5(sketch, myRef.current);
    return myP5.remove;
  }, []);

  return (
    <Box p="2vw" display="flex" flexDirection="row" justifyContent={"center"} >
      <div ref={myRef} />
    </Box>
  )
}

export default P5Test3;
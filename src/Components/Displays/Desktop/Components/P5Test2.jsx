import { useEffect, useRef } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Box } from "@mui/material";
import p5 from "p5";

import { pointAlongLine, pointAlongPolygon } from "../../../../Utils/Maths/pointAlongGeometry.js";

/*
  go to point along polygon by defining the sides, start point, and distance travelled
*/

const P5Test2 = () => {
  const myRef = useRef(undefined);
  let myP5 = undefined;

  const canvas = {
    size: {
      width: 800,
      height: 800
    }
  };

  const ball = {
    pos: {
      x: undefined,
      y: undefined
    },
    size: {
      width: 50,
      height: 50
    }
  };

  let nextVertIndex = 1;

  const sketch = (p) => {
     p.setup = () => {
      p.createCanvas(canvas.size.width, canvas.size.height, p5.WEBGL);
     }

     p.draw = () => {
      p.background(10);

      const maxX = canvas.size.width - (ball.size.width / 2);
      const minX = ball.size.width / 2;
      const maxY = canvas.size.height - (ball.size.height / 2);
      const minY = ball.size.height / 2;

      const sqrVerts = [
        {x: maxX, y: minY},
        {x: minX, y: minY},
        {x: minX, y: maxY},
        {x: maxX, y: maxY},
      ];

      const moveDistance = 1000 * (p.deltaTime / 1000);

      if(ball.pos.x === undefined) { ball.pos = { x: sqrVerts[0].x, y: sqrVerts[0].y }};
      const curPos = ball.pos;
      const newPos = pointAlongPolygon(curPos, moveDistance, nextVertIndex, sqrVerts);
      nextVertIndex = newPos.nextVerticeIndex;
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

export default P5Test2;
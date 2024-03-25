import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import p5 from "p5";

import { setup, draw } from "./draw";


const P5Test5 = () => {
  const myRef = useRef(undefined);
  let myP5 = undefined;

  
  const sketch = (p) => {
     p.setup = () => {
      setup(p);
     }

     p.draw = () => {
      draw(p);
     }
  }

  useEffect(() => {
    // eslint-disable-next-line
    myP5 = new p5(sketch, myRef.current); 
    return myP5.remove;
  }, []);

  return (
    <Box p="2vw" display="flex" flexDirection="row" justifyContent={"center"} >
      <div ref={myRef} />
    </Box>
  )
}

export default P5Test5;
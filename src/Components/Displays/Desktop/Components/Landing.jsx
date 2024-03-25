import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

function Landing() {
  const navigate = useNavigate();

  const redirectToP5Test1 = () => navigate("/p5test1");
  const redirectToP5Test2 = () => navigate("/p5test2");
  const redirectToP5Test3 = () => navigate("/p5test3");
  const redirectToP5Test4 = () => navigate("/p5test4");
  const redirectToP5Test5 = () => navigate("/p5test5");

  return (
    <div>
      <div
        className="centerText"
        style={{fontSize: "2vw", marginTop: "3vw"}}
      >Landing</div>
      <Box p="5vw" pb="0vw" display="flex" flexDirection="row">
        <Box p="1vw"><Button onClick={redirectToP5Test1} variant="contained" style={{fontSize: "1.5vw"}}>P5 Test 1</Button></Box>
        <Box p="1vw"><Button onClick={redirectToP5Test2} variant="contained" style={{fontSize: "1.5vw"}}>P5 Test 2</Button></Box>
        <Box p="1vw"><Button onClick={redirectToP5Test3} variant="contained" style={{fontSize: "1.5vw"}}>P5 Test 3</Button></Box>
        <Box p="1vw"><Button onClick={redirectToP5Test4} variant="contained" style={{fontSize: "1.5vw"}}>P5 Test 4</Button></Box>
        <Box p="1vw"><Button onClick={redirectToP5Test5} variant="contained" style={{fontSize: "1.5vw"}}>P5 Test 5</Button></Box>
      </Box>
    </div>
  );
}

export default Landing;
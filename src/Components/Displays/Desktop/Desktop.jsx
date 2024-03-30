import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Landing from "./Components/Landing.jsx";
import P5Test1 from "./Components/P5Test1.jsx";
import P5Test2 from "./Components/P5Test2.jsx";
import P5Test3 from "./Components/P5Test3.jsx";
import P5Test4 from "./Components/P5Test4/P5Test4.jsx";
import P5Test5 from "./Components/P5Test5/P5Test5.jsx";
import P5Test6 from "./Components/P5Test6/P5Test6.jsx";

function Routess(props) {
  return (
    <Router>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="p5test1" element={ <P5Test1 /> } />
        <Route path="p5test2" element={ <P5Test2 /> } />
        <Route path="p5test3" element={ <P5Test3 /> } />
        <Route path="p5test4" element={ <P5Test4 /> } />
        <Route path="p5test5" element={ <P5Test5 /> } />
        <Route path="p5test6" element={ <P5Test6 /> } />
      </Routes>
    </Router>
  );
}

function Desktop() {
  return (
    <Routess />
  );
}

export default Desktop;
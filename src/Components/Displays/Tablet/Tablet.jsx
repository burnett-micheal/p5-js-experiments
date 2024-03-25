import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function Routess(props) {
  return (
    <Router>
      <Routes>
        <Route index element={<div style={{ fontSize: "10vw" }}>Device Size Unsupported.</div >} />
      </Routes>
    </Router>
  );
}

function Tablet() {
  return (
    <Routess />
  );
}

export default Tablet;
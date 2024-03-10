import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventory from "./pages/inventory/Inventory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventory from "./pages/inventory/Inventory";
import AddDevice from "./pages/inventory/AddDevice";
import UpdateDevice from "./pages/inventory/UpdateDevice";
import ViewDevice from "./pages/inventory/ViewDevice";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Inventory />} />
      </Routes>
      <Routes>
        <Route exact path="/inventory" element={<Inventory />} />
      </Routes>
      <Routes>
        <Route path="/inventory/devices/add" element={<AddDevice />} />
      </Routes>
      <Routes>
        <Route path="/inventory/:id" element={<ViewDevice />} />
      </Routes>
      <Routes>
        <Route path="/inventory/:id/update" element={<UpdateDevice />} />
      </Routes>
    </Router>
  );
}

export default App;

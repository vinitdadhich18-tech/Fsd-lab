import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar page={page} setPage={setPage} />

      <div className="max-w-7xl mx-auto p-6">
        {page === "home" ? <Home /> : <Cart />}
      </div>
    </div>
  );
}

export default App;
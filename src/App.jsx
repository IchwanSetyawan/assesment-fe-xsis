import { useState } from "react";

import Navbar from "./components/navbar/navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { SearchProvider } from "./context/SearchContext";

function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </SearchProvider>
  );
}

export default App;

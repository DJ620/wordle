import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Landing />} />
       <Route path="/classic" element={<Home />} />
       <Route path="/endless" element={<Home />} />
       <Route path="custom/:encodedWord/:customNumGuesses" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

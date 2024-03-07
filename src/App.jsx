import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/wordle" element={<Landing />} />
       <Route path="/wordle/classic" element={<Home />} />
       <Route path="/wordle/endless" element={<Home />} />
       <Route path="/wordle/custom/:encodedWord/:customNumGuesses" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

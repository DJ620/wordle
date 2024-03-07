import React from "react";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";

const App = () => {
  return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/wordle/classic" element={<Home />} />
          <Route path="/wordle/endless" element={<Home />} />
          <Route
            path="/custom/:encodedWord/:customNumGuesses"
            element={<Home />}
          />
        </Routes>
      </HashRouter>
  );
};

export default App;

"use client";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import About from "./about";
import Home from "./home";
import List from "./list";
import Navbar from "./components/Navbar";
import Protected from "./routes/Protected";

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/list"
            element={
              <Protected isAuthenticated={isAuthenticated}>
                <List />
              </Protected>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;

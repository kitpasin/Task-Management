// LIBRARIES
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// LAYOUTS
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";

// PAGES
import Home from "./components/pages/Home/Home";

export default function App() {
  // STATES
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("Theme");
    return savedTheme !== null ? savedTheme === "true" : true;
  });

  // FUNCTIONS

  // SET THEME IN LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("Theme", theme);
  }, [theme]);

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />
      </Routes>
      <Footer theme={theme} setTheme={setTheme} />
    </>
  );
}

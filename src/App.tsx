import "./App.css";
import { PrimeReactProvider } from "primereact/api";
import Navbar from "./components/Navbar/Navbar";
import Records from "./components/Records/Records.";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState<string>("light");

  return (
    <PrimeReactProvider>
      <Navbar setTheme={setTheme} theme={theme} />
      <Records theme={theme} />
    </PrimeReactProvider>
  );
}

export default App;

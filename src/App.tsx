import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Records from "./components/Records/Records.";
import RecordsContextProvider from "./context/RecordsContextProvider";

function App() {
  return (
    <RecordsContextProvider>
      <Navbar />
      <Records />
    </RecordsContextProvider>
  );
}

export default App;

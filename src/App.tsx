import "bootstrap/dist/css/bootstrap.min.css";
import { Error } from "./Components/Error/ErrorPage";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header/HeaderPage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;

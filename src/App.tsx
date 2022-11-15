import "bootstrap/dist/css/bootstrap.min.css";
import { Error } from "./pages/ErrorPage/ErrorPage";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";

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

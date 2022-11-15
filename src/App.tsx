import { Error } from "./Components/Error/ErrorPage";
import { Header } from "./Components/Header/HeaderPage";
import { Route, Routes } from "react-router-dom";

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

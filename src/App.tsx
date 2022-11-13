import { Error } from "./Components/Error/ErrorPage";
import { Header } from "./Components/Header/HeaderPage";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Components/LoginPage/Login";
import { Registration } from "./Components/Registration/RegistrationPage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;

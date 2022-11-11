import { Erro } from "./components/ErroPage/erro";
import { useEffect } from "react";
import { Header } from "./components/header/header";
import { Route, Routes } from "react-router-dom";
import i18next from "i18next";
import cookies from "js-cookie";
import { Login } from "./components/LoginPage/login";
import { Registration } from "./components/Registratiom/registratiom";
import { useTranslation } from "react-i18next";
const languages = [
  {
    code: "ru",
    name: "Russian",
    country_code: "rf",
  },
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
];
function App() {
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  useEffect(() => {
    console.log("Setting page stuff");
    document.title = t("app_title");
  }, [currentLanguage, t]);
  return (
    <div>
      <Header />
      <Routes>
        <Route path="*" element={<Erro />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        {/* <Route path="creatForm" element={<Form />} />
        <Route path="Cards/:id" element={<FullInfoWindow />} /> */}
      </Routes>
    </div>
  );
}

export default App;

import { useTranslation } from "react-i18next";
import "../../styles/header.css";
import cookies from "js-cookie";
import i18next from "i18next";
const languages = [
  {
    code: "ru",
    name: "Русский",
  },
  {
    code: "en",
    name: "English",
  },
];
export function Header() {
  const { t } = useTranslation();
  return (
    <div className="InfoBar">
      <a href="/login">{t("login")}</a>
      <a href="/registration">{t("registr")}</a>
      <a className="Error" href="*">
        {" "}
        404 page
      </a>
      <a href="/about">{t("about")}</a>
      {languages.map(({ code, name }) => (
        <li key={name}>
          <a
            href="#"
            onClick={() => {
              i18next.changeLanguage(code);
            }}
          >
            {name}
          </a>
        </li>
      ))}
    </div>
  );
}

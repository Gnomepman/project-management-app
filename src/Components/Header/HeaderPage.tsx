import { useTranslation } from "react-i18next";
// import "./Header.css";
import { changeLanguage } from "i18next";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
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
    <>
      <Nav className="justify-content-around">
        <Nav.Item>
          <Nav.Link href="*">{t("about")}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/registration">{t("registration")}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/login">{t("login")}</Nav.Link>
        </Nav.Item>
        <NavDropdown title={t("language")} id="basic-nav-dropdown">
          {languages.map(({ code, name }) => (
            <NavDropdown.Item
              key={name}
              onClick={() => {
                changeLanguage(code);
              }}
            >
              {name}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Nav>
    </>
  );
}

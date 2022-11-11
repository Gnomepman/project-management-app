import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../styles/card-form.css";
export function Login() {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [nameDirty, setnameDirty] = useState(false);
  const [passwordDirty, setpasswordDirty] = useState(false);
  const [namerro, setnamerro] = useState("");
  const [passworderro, setpassworderro] = useState("");
  const [validation, setValidation] = useState(false);
  const { t } = useTranslation();
  const entername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setname(e.target.value);
    if (e.target.value.length < 4 || e.target.value.length > 25) {
      setnamerro("Введите имя");
    } else {
      setnamerro("");
    }
  };
  const enterPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpassword(e.target.value);
    if (e.target.value.length < 4 || e.target.value.length > 100) {
      setpassworderro("Введите пароль");
    } else {
      setpassworderro("");
    }
  };
  const voidField = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "name":
        setnameDirty(true);
        break;
      case "password":
        setpasswordDirty(true);
        break;
    }
  };
  useEffect(() => {
    if (namerro || passworderro) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  });
  return (
    <div className="section">
      <form className="login_container">
        <div className="create">{t("login")}</div>
        <div className="info">
          <div>
            <label htmlFor="name">{t("registr_name")}</label>
          </div>
          <input
            value={name}
            onBlur={(e) => voidField(e)}
            onChange={(e) => entername(e)}
            type="text"
            name="name"
          />
          {nameDirty && namerro && (
            <div className="mistake">{t("name_erro")}</div>
          )}
        </div>
        <div className="info">
          <div>
            <label htmlFor="password">{t("registr_password")}</label>
          </div>
          <input
            value={password}
            onBlur={(e) => voidField(e)}
            onChange={(e) => enterPassword(e)}
            type="text"
            name="password"
          />
          {passwordDirty && passworderro && (
            <div className="mistake">{t("pass_erro")}</div>
          )}
        </div>
        <button type="submit" id="creat" disabled={!validation}>
          {t("enter")}
        </button>
      </form>
    </div>
  );
}

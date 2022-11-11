import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "../../styles/card-form.css";
export function Registration() {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [nameDirty, setnameDirty] = useState(false);
  const [passwordDirty, setpasswordDirty] = useState(false);
  const [namerro, setnamerro] = useState("Укажите название");
  const [passworderro, setpassworderro] = useState("Введите описание");
  const [validation, setValidation] = useState(false);
  const { t } = useTranslation();
  const entername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setname(e.target.value);
    if (e.target.value.length < 4 || e.target.value.length > 25) {
      setnamerro("Введите название");
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
  const voidField = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
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
        <div className="create">Вход</div>
        <div className="info">
          <div>
            <label htmlFor="name">{t("registr_name")}</label>
          </div>
          <input
            value={name}
            onBlur={(event) => voidField(event)}
            onChange={(e) => entername(e)}
            type="text"
            name="name"
          />
          {nameDirty && namerro && <div className="mistake">{namerro}</div>}
        </div>
        <div className="info">
          <div>
            <label htmlFor="password">{t("registr_password")}</label>
          </div>
          <input
            value={password}
            onBlur={(event) => voidField(event)}
            onChange={(e) => enterPassword(e)}
            type="text"
            name="password"
          />
          {passwordDirty && passworderro && (
            <div className="mistake">{passworderro}</div>
          )}
        </div>
        <div className="info">
          <div>
            <label htmlFor="password">{t("registr_repid_password")}</label>
          </div>
          <input
            value={password}
            onBlur={(event) => voidField(event)}
            onChange={(e) => enterPassword(e)}
            type="text"
            name="password"
          />
          {passwordDirty && passworderro && (
            <div className="mistake">{passworderro}</div>
          )}
        </div>
        <button type="submit" id="creat" disabled={!validation}>
          {t("enter")}
        </button>
      </form>
    </div>
  );
}

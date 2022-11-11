import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Login-form.css";
export function Login() {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameError, setnameError] = useState("Укажите название");
  const [passworderror, setPassworderror] = useState("Введите описание");
  const [validation, setValidation] = useState(false);
  const { t } = useTranslation();
  const enterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setname(e.target.value);
    if (e.target.value.length < 4 || e.target.value.length > 25) {
      setnameError("Введите название");
    } else {
      setnameError("");
    }
  };
  const enterPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 4 || e.target.value.length > 100) {
      setPassworderror("Введите пароль");
    } else {
      setPassworderror("");
    }
  };
  const voidField = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };
  useEffect(() => {
    if (nameError || passworderror) {
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
            <label htmlFor="name">{t("registration_name")}</label>
          </div>
          <input
            value={name}
            onBlur={(event) => voidField(event)}
            onChange={(e) => enterName(e)}
            type="text"
            name="name"
          />
          {nameDirty && nameError && (
            <div className="mistake">{t("name_error")}</div>
          )}
        </div>
        <div className="info">
          <div>
            <label htmlFor="password">{t("registration_password")}</label>
          </div>
          <input
            value={password}
            onBlur={(event) => voidField(event)}
            onChange={(e) => enterPassword(e)}
            type="text"
            name="password"
          />
          {passwordDirty && passworderror && (
            <div className="mistake">{t("pass_error")}</div>
          )}
        </div>
        <button type="submit" disabled={!validation}>
          {t("enter")}
        </button>
      </form>
    </div>
  );
}

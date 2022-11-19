import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useTranslation } from 'react-i18next';
import './Login-form.css';
export function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameError, setNameError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [validation, setValidation] = useState(false);
  const { t } = useTranslation();
  const enterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.length < 4 || e.target.value.length > 32) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };
  const enterPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length < 4 || e.target.value.length > 32) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const voidField = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };
  useEffect(() => {
    if (nameError || passwordError) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  });
  return (
    <div className="section">
      <form className="login_container">
        <div className="create">{t('enter')}</div>
        <div className="info">
          <div>
            <label htmlFor="name">{t('registration_name')}</label>
          </div>
          <input
            value={name}
            onBlur={(event) => voidField(event)}
            onChange={(e) => enterName(e)}
            type="text"
            name="name"
          />
          {nameDirty && nameError && <div className="mistake">{t('name_error')}</div>}
        </div>
        <div className="info">
          <div>
            <label htmlFor="password">{t('registration_password')}</label>
          </div>
          <input
            value={password}
            onBlur={(event) => voidField(event)}
            onChange={(e) => enterPassword(e)}
            type="text"
            name="password"
          />
          {passwordDirty && passwordError && <div className="mistake">{t('pass_error')}</div>}
        </div>
        <Button variant="primary" type="submit" disabled={!validation}>
          {t('enter')}
        </Button>
      </form>
    </div>
  );
}

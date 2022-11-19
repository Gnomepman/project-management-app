import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useTranslation } from 'react-i18next';
import './LoginPage.scss';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';
import { IUser } from '../../models';
import { useLoginUserQuery } from '../../store/api/authApi';
import { SubmitHandler, useForm } from 'react-hook-form';

export function LoginPage() {
  const { t } = useTranslation();

  const userMock: IUser = {
    login: 'IMask',
    password: 'Tesla4ever',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({});

  const { isError, isLoading, data } = useLoginUserQuery(userMock);

  const { user } = useAppSelector((store) => store.user);
  const { setUser } = useActions();

  const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
    setUser(userMock);
    localStorage.setItem('token', data?.login || '');
    reset();
  };

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [nameError, setNameError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [validation, setValidation] = useState(false);

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
      <form className="login_container" onSubmit={handleSubmit(onSubmit)}>
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

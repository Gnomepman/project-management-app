import React from 'react';
import { useActions } from '../../hooks/actions';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/isAuthenticated';

export const AuthSection = () => {
  const { t } = useTranslation();

  const { logout } = useActions();
  const navigate = useNavigate();
  const { login } = JSON.parse(localStorage.getItem('user') || '{}');

  const onClickHandler = () => {
    logout();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      {!isAuthenticated() && (
        <Navbar>
          <NavLink className="px-2" to="/registration">
            <Button variant="outline-secondary">{t('auth.registration')}</Button>
          </NavLink>
          <NavLink className="px-2" to="/login">
            <Button variant="outline-secondary">{t('auth.sign-in')}</Button>
          </NavLink>
        </Navbar>
      )}

      {isAuthenticated() && (
        <Navbar>
          <NavLink className="mr-10 px-2" to="/boards">
            <Button variant="outline-danger"> {t('auth.add-boards')}</Button>
          </NavLink>

          <NavLink className="px-2 d-none d-sm-block" to="/edit-profile">
            Hi <span className="text-danger fw-bold">{login} </span>
          </NavLink>

          <NavLink className="px-2" to="/edit-profile">
            <Button variant="outline-secondary">{t('auth.edit-profile')}</Button>
          </NavLink>

          <Nav.Item>
            <Button onClick={onClickHandler}>{t('auth.sign-out')}</Button>
          </Nav.Item>
        </Navbar>
      )}
    </>
  );
};

import React from 'react';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { Button, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

export const AuthSection = () => {
  const { t } = useTranslation();

  const { logout } = useActions();
  const navigate = useNavigate();

  const { user } = useAppSelector((store) => store.user);

  const isLogged = localStorage.getItem('token');

  const onClickHandler = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {!isLogged && (
        <Nav>
          <Nav.Link href="/registration">
            <Button variant="outline-secondary">{t('registration')}</Button>
          </Nav.Link>
          <Nav.Link href="/login">
            <Button variant="outline-secondary">{t('login')}</Button>
          </Nav.Link>
        </Nav>
      )}

      {isLogged && (
        <Nav>
          <NavLink className="mr-10 px-2" to="/boards">
            <Button variant="outline-danger"> {t('add-boards')}</Button>
          </NavLink>

          <Nav.Link href="/user-info">
            Hi <span className="text-danger fw-bold">{user?.login} </span>
          </Nav.Link>

          <NavLink className="px-2" to="/edit-profile">
            <Button variant="outline-secondary">{t('edit-profile')}</Button>
          </NavLink>

          <Nav.Item>
            <Button onClick={onClickHandler}>{t('sign-out')}</Button>
          </Nav.Item>
        </Nav>
      )}
    </>
  );
};

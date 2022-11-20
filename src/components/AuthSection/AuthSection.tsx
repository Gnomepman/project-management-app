import React from 'react';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';
import { Button, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
        <Nav className="me-auto">
          <Nav.Item>
            <Nav.Link href="/registration">{t('registration')}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/login">{t('login')}</Nav.Link>
          </Nav.Item>
        </Nav>
      )}

      {isLogged && (
        <Nav className="me-auto">
          <Nav.Item>
            <Nav.Link href="/user-info">
              Hi <span className="text-danger fw-bold">{user?.login} </span>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Button onClick={onClickHandler}>{t('Log out')}</Button>
          </Nav.Item>
        </Nav>
      )}
    </>
  );
};

import React, { useState } from 'react';
import { useActions } from '../../hooks/actions';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/isAuthenticated';
import { ModalComponent } from '../ModalComponent/ModalComponent';
import { CreateBoardModal } from '../CreateBoard/CreateBoardModal';

export const AuthSection = () => {
  const { t } = useTranslation();

  const { logout } = useActions();
  const navigate = useNavigate();

  const onClickHandler = () => {
    logout();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const [createBoardModal, setCreateBoardModal] = useState(false);

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
        <>
          <Navbar>
            <NavLink className="mr-10 px-2" to="/boards">
              <Button variant="secondary btn-overflow" onClick={() => setCreateBoardModal(true)}>
                {t('auth.add-boards')}
              </Button>
            </NavLink>

            <NavLink className="px-2 lh-sm" to="/">
              <Button variant="secondary btn-overflow"> {t('auth.to-main-page')}</Button>
            </NavLink>

            <NavLink className="px-2" to="/edit-profile">
              <Button variant="outline-secondary w-max-25 btn-overflow">
                {t('auth.edit-profile')}
              </Button>
            </NavLink>

            <Nav.Item>
              <Button className="btn-overflow" onClick={onClickHandler}>
                {t('auth.sign-out')}
              </Button>
            </Nav.Item>
          </Navbar>

          <ModalComponent
            show={createBoardModal}
            title={t('boards.modal.creating')}
            onHide={() => setCreateBoardModal(false)}
            setModal={setCreateBoardModal}
          >
            <CreateBoardModal setCreateBoardModal={setCreateBoardModal} />
          </ModalComponent>
        </>
      )}
    </>
  );
};

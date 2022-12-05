import React, { useState } from 'react';
import { useActions } from '../../hooks/actions';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/isAuthenticated';
import { ModalComponent } from '../ModalComponent/ModalComponent';
import { CreateBoardModal } from '../CreateBoard/CreateBoardModal';
import LogoutIcon from '../../assets/images/header-icons/logout.png';
import AddIcon from '../../assets/images/header-icons/add.png';
import CheckIcon from '../../assets/images/header-icons/checked.png';
import EditIcon from '../../assets/images/header-icons/edit-user.png';

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
            <NavLink className="mr-sm-10 px-sm-2 px-1" to="/boards">
              <Button
                variant="secondary btn-overflow"
                onClick={() => setCreateBoardModal(true)}
                title={t('auth.add-boards') || ''}
              >
                <img className="px-sm-1" height="20" src={AddIcon} alt="auth.add-boards" />
                <span className="d-none d-sm-inline d-md-inline">{t('auth.add-boards')}</span>
              </Button>
            </NavLink>

            <NavLink className="px-sm-2 px-1" to="/">
              <Button variant="secondary btn-overflow" title={t('auth.to-main-page') || ''}>
                <img className="px-sm-1" height="20" src={CheckIcon} alt="auth.to-main-page" />
                <span className="d-none d-sm-inline d-md-inline">{t('auth.to-main-page')}</span>
              </Button>
            </NavLink>

            <NavLink className="px-sm-2 px-1" to="/edit-profile">
              <Button variant="outline-secondary btn-overflow" title={t('auth.edit-profile') || ''}>
                <img className="px-sm-1" height="20" src={EditIcon} alt="auth.edit-profile" />
                <span className="d-none d-sm-inline d-md-inline">{t('auth.edit-profile')}</span>
              </Button>
            </NavLink>

            <Nav.Item>
              <Button
                className="btn-overflow"
                onClick={onClickHandler}
                title={t('auth.sign-out') || ''}
              >
                <img className="px-sm-2 px-1" height="20" src={LogoutIcon} alt="auth.sign-out" />
                <span className="d-none d-sm-inline d-md-inline">{t('auth.sign-out')}</span>
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

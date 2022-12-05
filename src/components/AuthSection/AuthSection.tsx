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
            <NavLink className="mr-10 px-2" to="/boards">
              <Button variant="secondary btn-overflow" onClick={() => setCreateBoardModal(true)}>
                <img className="px-1" height="20" src={AddIcon} alt="auth.add-boards" />
                {t('auth.add-boards')}
              </Button>
            </NavLink>

            <NavLink className="px-2 lh-sm" to="/">
              <Button variant="secondary btn-overflow">
                <img className="px-1" height="20" src={CheckIcon} alt="auth.to-main-page" />
                {t('auth.to-main-page')}
              </Button>
            </NavLink>

            <NavLink className="px-2" to="/edit-profile">
              <Button variant="outline-secondary btn-overflow">
                <img className="px-1" height="20" src={EditIcon} alt="auth.edit-profile" />
                {t('auth.edit-profile')}
              </Button>
            </NavLink>

            <Nav.Item>
              <Button className="btn-overflow" onClick={onClickHandler}>
                <img className="px-1" height="24" src={LogoutIcon} alt="auth.sign-out" />
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

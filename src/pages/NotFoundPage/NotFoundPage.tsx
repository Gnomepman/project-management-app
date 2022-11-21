import React from 'react';
import { useTranslation } from 'react-i18next';
import './NotFoundPage.scss';
import { NavLink } from 'react-router-dom';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex align-items-center justify-content-center app-container">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          <span className="text-danger">{t('error-main')}</span>
        </p>
        <p className="lead">{t('error-description')}</p>
        <NavLink to="/" className="btn btn-primary">
          {t('error-button')}
        </NavLink>
      </div>
    </div>
  );
};

import React from 'react';
import MainImage from '../../assets/images/image-1.png';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const Introduction = () => {
  const { t } = useTranslation();

  return (
    <section className="row justify-content-center py-1">
      <div className="col-lg-3 col-md-2 pt-lg-5 pt-md-0 mt-lg-5 mt-md-0 text-center">
        <h1 className="pt-lg-5 pt-md-3 fw-bold">PM Guru</h1>
        <h4 className="py-2 py-sm-2">{t('wp.description')}</h4>
        <NavLink to="/boards">
          <Button variant="primary">{t('wp.button')}</Button>
        </NavLink>
      </div>
      <div className="col-8 d-none d-sm-block px-2 py-1">
        <img className="w-100" src={MainImage} alt="pm-guru" />
      </div>
    </section>
  );
};

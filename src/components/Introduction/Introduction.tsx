import React from 'react';
import MainImage from '../../assets/images/image-1.png';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const Introduction = () => {
  const { t } = useTranslation();

  return (
    <section className="row align-items-end h-auto my-1">
      <div className="col-xl-3 col-lg-3 col-md-1 col-sm-1 mt-5 mt-md-0 mt-sm-0">
        <h1 className="mt-lg-5 mt-md-3 fw-bold">PM Guru</h1>
        <h4 className="py-2 py-sm-2">{t('wp.description')}</h4>
        <NavLink to="/boards">
          <Button className="mt-5 mt-md-0 mt-sm-0" color="secondary">
            {t('wp.button')}
          </Button>
        </NavLink>
      </div>
      <div className="col-8 d-none d-sm-block d-md-block">
        <img className="w-100" src={MainImage} alt="pm-guru" />
      </div>
    </section>
  );
};

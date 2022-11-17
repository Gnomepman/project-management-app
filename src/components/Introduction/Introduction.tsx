import React from 'react';
import MainImage from '../../assets/images/image-1.png';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const Introduction = () => {
  const { t } = useTranslation();

  return (
    <section className="row align-items-end h-auto my-1">
      <div className="col-4 mt-5">
        <h1 className="mt-lg-5 mt-md-3 fw-bold">PM Guru</h1>
        <h4 className="py-2">{t('wp.description')}</h4>
        <a href="/boards" target="_blank" rel="noreferrer">
          <Button className="mt-5" color="secondary">
            {t('wp.button')}
          </Button>
        </a>
      </div>
      <div className="col-8">
        <img className="w-100" src={MainImage} alt="pm-guru" />
      </div>
    </section>
  );
};

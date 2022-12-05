import React from 'react';
import { ITechnology } from '../../models';
import { TechnologiesData } from '../../assets/data';
import { TechnologyItem } from '../TechnologyItem/TechnologyItem';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export const Technologies = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="row justify-content-center py-md-5 py-sm-3">
        <div className="col-8 px-2 py-5">
          <div className="row justify-content-center gap-3">
            {TechnologiesData.map((item: ITechnology) => (
              <TechnologyItem key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="col-lg-3 col-md-2 pt-lg-5 pt-md-0 mt-lg-5 mt-md-0 text-center">
          <h1 className="pt-sm-5 fw-bold">{t('title')}</h1>
          <h4 className="py-2 py-sm-2 text-md-responsive">{t('wp.created')}</h4>
          <NavLink to="/login">
            <Button className="btn-lg mb-md-3 mb-2" variant="primary">
              {t('wp.button')}
            </Button>
          </NavLink>
        </div>
      </section>
    </>
  );
};

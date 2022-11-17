import React from 'react';
import { ITechnology } from '../../models';
import { TechnologiesData } from '../../assets/data';
import { TechnologyItem } from '../TechnologyItem/TechnologyItem';
import { useTranslation } from 'react-i18next';

export const Technologies = () => {
  const { t } = useTranslation();

  return (
    <section className="row justify-content-md-center">
      <h3 className="text-center mt-1">{t('wp.created')}</h3>

      {TechnologiesData.map((item: ITechnology) => (
        <TechnologyItem key={item.id} item={item} />
      ))}
    </section>
  );
};

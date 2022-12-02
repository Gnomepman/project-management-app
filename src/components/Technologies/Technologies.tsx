import React from 'react';
import { ITechnology } from '../../models';
import { TechnologiesData } from '../../assets/data';
import { TechnologyItem } from '../TechnologyItem/TechnologyItem';
import { useTranslation } from 'react-i18next';

export const Technologies = () => {
  const { t } = useTranslation();

  return (
    <section className="container">
      <div className="row gap-1  justify-content-center py-2">
        <h5 className="text-center my-3">{t('wp.created')}</h5>

        {TechnologiesData.map((item: ITechnology) => (
          <TechnologyItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

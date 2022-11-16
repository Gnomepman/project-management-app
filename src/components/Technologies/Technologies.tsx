import React from 'react';
import { ITechnology } from '../../models';
import { TechnologiesData } from '../../assets/data';
import { TechnologyItem } from '../TechnologyItem/TechnologyItem';

export const Technologies = () => {
  return (
    <section className="row justify-content-md-center">
      <h2 className="text-center mt-2">Used Technologies</h2>

      {TechnologiesData.map((item: ITechnology) => (
        <TechnologyItem key={item.id} item={item} />
      ))}
    </section>
  );
};

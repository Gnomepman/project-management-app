import React from 'react';
import { ITechnology } from '../../models';
import { TechnologiesData } from '../../assets/data';
import { TechnologyItem } from '../TechnologyItem/TechnologyItem';

export const Technologies = () => {
  return (
    <div className="row text-center mb-1">
      {TechnologiesData.map((item: ITechnology) => (
        <TechnologyItem key={item.id} item={item} />
      ))}
    </div>
  );
};

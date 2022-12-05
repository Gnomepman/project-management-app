import React from 'react';
import { ITechnology } from '../../models';
import './TechnologyItem.scss';

interface TechnologyItemProps {
  item: ITechnology;
}

export const TechnologyItem = ({ item }: TechnologyItemProps) => {
  return (
    <div className="card-item col-3 py-3">
      <a href={item.url} target="_blank" rel="noreferrer">
        <img
          height="60"
          className="tech-img rounded-2 px-md-2"
          src={item.logo_url}
          alt={item.title}
        />
        <h5 className="d-none d-sm-block d-sm-none d-md-block">{item.title}</h5>
      </a>
    </div>
  );
};

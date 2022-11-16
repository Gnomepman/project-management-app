import React from 'react';
import Card from 'react-bootstrap/Card';
import { ITechnology } from '../../models';
import './TechnologyItem.scss';

interface TechnologyItemProps {
  item: ITechnology;
}

export const TechnologyItem = ({ item }: TechnologyItemProps) => {
  return (
    <Card className="col mx-1">
      <a href={item.url} target="_blank" rel="noreferrer">
        <img className="tech-img rounded-2" src={item.logo_url} alt={item.title} />
        <h5 className="d-none d-sm-block d-sm-none d-md-block">{item.title}</h5>
      </a>
    </Card>
  );
};

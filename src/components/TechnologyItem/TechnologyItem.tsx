import React from 'react';
import Card from 'react-bootstrap/Card';
import { ITechnology } from '../../models';
import './TechnologyItem.scss';

interface TechnologyItemProps {
  item: ITechnology;
}

export const TechnologyItem = ({ item }: TechnologyItemProps) => {
  return (
    <div className="col-3 justify-content-center rounded ">
      <Card>
        <a href={item.url} target="_blank" rel="noreferrer">
          <img className="tech-img rounded-2" src={item.logo_url} alt={item.title} />
          <Card.Title>{item.title}</Card.Title>
        </a>
      </Card>
    </div>
  );
};

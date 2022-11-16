import React from 'react';
import MainImage from '../../assets/images/image-1.png';
import { Button } from 'react-bootstrap';

export const Introduction = () => {
  return (
    <section className="row align-items-end h-auto my-1">
      <div className="col-4 mt-5">
        <h1 className="mt-lg-5 mt-md-3 fw-bold">PM Guru</h1>
        <h4 className="py-2">The work management tool for happy collaboration.</h4>
        <Button className="mt-5" color="secondary">
          Try it now
        </Button>
      </div>
      <div className="col-8">
        <img className="w-100" src={MainImage} alt="pm-guru" />
      </div>
    </section>
  );
};

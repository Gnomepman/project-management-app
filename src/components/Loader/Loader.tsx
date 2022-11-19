import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export const Loader = () => {
  return (
    <div className="text-center">
      <Spinner animation="border" variant="primary" />
      <Spinner animation="border" variant="success" />
      <Spinner animation="border" variant="danger" />
      <Spinner animation="border" variant="warning" />
      <Spinner animation="border" variant="info" />
    </div>
  );
};

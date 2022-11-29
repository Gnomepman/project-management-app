import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

export const Loader = () => {
  return (
    <div className="app-container">
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <Spinner animation="border" variant="success" />
        <Spinner animation="border" variant="danger" />
      </div>
    </div>
  );
};

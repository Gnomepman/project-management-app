import { Introduction } from '../../components/Introduction/Introduction';
import { Technologies } from '../../components/Technologies/Technologies';
import React from 'react';

export const WelcomePage = () => {
  return (
    <div className="app-container">
      <Introduction />
      <Technologies />
    </div>
  );
};

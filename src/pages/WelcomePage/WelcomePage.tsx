import { Introduction } from '../../components/Introduction/Introduction';
import { Technologies } from '../../components/Technologies/Technologies';
import Snowfall from 'react-snowfall';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useActions } from '../../hooks/actions';
import { useAppSelector } from '../../hooks/redux';

export const WelcomePage = () => {
  const { snow } = useAppSelector((store) => store.user);
  const { toggleSnow } = useActions();

  const snowflakeCount = () => {
    return snow ? 200 : 0;
  };

  return (
    <>
      <div className="position-relative">
        <Button
          variant="none"
          className="card-hover border-0 position-absolute top-0 end-0"
          onClick={() => {
            toggleSnow();
          }}
        >
          {'❄'}
        </Button>
      </div>
      <Snowfall
        snowflakeCount={snowflakeCount()}
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
        }}
      />
      <Introduction />
      <Technologies />
    </>
  );
};

import { Introduction } from '../../components/Introduction/Introduction';
import { Technologies } from '../../components/Technologies/Technologies';
import Snowfall from 'react-snowfall';
import React, { useReducer } from 'react';
import { Button } from 'react-bootstrap';

export const WelcomePage = () => {
  const initSnowflakeCount = 200;
  const changeSnowflakeCount = (initSnowflakeCount: number) => (initSnowflakeCount === 0 ? 200 : 0);
  const [snowflakeCount, setSnowflakeCount] = useReducer(changeSnowflakeCount, initSnowflakeCount);

  return (
    <>
      <div className="position-relative">
        <Button
          variant="none"
          className="card-hover border-0 position-absolute top-0 end-0"
          onClick={setSnowflakeCount}
        >
          {'❄'}
        </Button>
      </div>
      <Snowfall
        snowflakeCount={snowflakeCount}
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

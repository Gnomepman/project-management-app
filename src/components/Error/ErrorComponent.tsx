import React from 'react';
import { IMessage } from '../../models';

export const ErrorComponent = (message: IMessage) => {
  return (
    <div className="container app-container">
      <div className="text-center text-danger py-5">{message.message}</div>;
    </div>
  );
};

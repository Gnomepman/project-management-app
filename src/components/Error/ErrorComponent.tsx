import React from 'react';
import { IMessage } from '../../models';

export const ErrorComponent = (message: IMessage) => {
  return <div className="text-center text-danger my-5">{message.message}</div>;
};

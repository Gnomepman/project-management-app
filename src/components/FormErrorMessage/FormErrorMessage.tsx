import React from 'react';
import { FieldError } from 'react-hook-form';

interface errorProps {
  field: string;
  errors: FieldError | undefined;
}
const errorMsg = 'Please add';

export const FormErrorMessage = ({ field, errors }: errorProps) => {
  return (
    <>
      {errors && (
        <p className="text-danger" data-testid={`${field}-error`}>
          {errorMsg} {field}
        </p>
      )}
    </>
  );
};

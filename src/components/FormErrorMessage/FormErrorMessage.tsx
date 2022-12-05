import React from 'react';
import { FieldError } from 'react-hook-form';

interface errorProps {
  field: string;
  errors: FieldError | undefined;
}

export const FormErrorMessage = ({ field, errors }: errorProps) => {
  return (
    <>
      {errors && (
        <p className="text-danger small" data-testid={`${field}-error`}>
          {errors.message}
        </p>
      )}
    </>
  );
};

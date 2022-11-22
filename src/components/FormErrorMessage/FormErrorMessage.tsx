import React from 'react';
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface errorProps {
  field: string;
  errors: FieldError | undefined;
}

export const FormErrorMessage = ({ field, errors }: errorProps) => {
  const { t } = useTranslation();
  const errorMsg = t('auth.required-field');

  return (
    <>
      {errors && (
        <p className="text-danger small" data-testid={`${field}-error`}>
          {errorMsg}
        </p>
      )}
    </>
  );
};

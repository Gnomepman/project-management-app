import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { ILogin, IRegistration } from '../../models';
import { FormErrorMessage } from '../FormErrorMessage/FormErrorMessage';
import { useTranslation } from 'react-i18next';

interface IInputProps {
  field: 'name' | 'login' | 'password';
  title: string;
  register: UseFormRegister<ILogin | IRegistration>;
  errors: FieldError | undefined;
}

export const FormInput = ({ field, title, register, errors }: IInputProps) => {
  const { t } = useTranslation();
  const add = t('auth.add');

  return (
    <div className="form-group mt-3 h6">
      <label htmlFor={field}>{title}</label>
      <input
        className="form-control mt-1"
        id={field}
        data-testid={field}
        placeholder={`${add} ${title.toLowerCase()}`}
        type="text"
        {...(register &&
          register(field, {
            required: {
              value: true,
              message: t('auth.required-field'),
            },
            maxLength: {
              value: 20,
              message: t('auth.max-length'),
            },
            minLength: {
              value: 4,
              message: t('auth.min-length'),
            },
          }))}
      />
      <FormErrorMessage field={field} errors={errors} />
    </div>
  );
};

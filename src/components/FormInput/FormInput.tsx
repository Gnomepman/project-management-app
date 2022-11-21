import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { ILogin, IRegistration } from '../../models';
import { FormErrorMessage } from '../FormErrorMessage/FormErrorMessage';

interface IInputProps {
  field: 'name' | 'login' | 'password';
  register: UseFormRegister<ILogin | IRegistration>;
  errors: FieldError | undefined;
}

export const FormInput = ({ field, register, errors }: IInputProps) => {
  return (
    <div className="form-group mt-3">
      <label htmlFor={field}>{field}</label>
      <input
        className="form-control mt-1"
        id={field}
        data-testid={field}
        placeholder={`Add ${field}`}
        type="text"
        {...(register && register(field, { required: true }))}
      />
      <FormErrorMessage field={field} errors={errors} />
    </div>
  );
};

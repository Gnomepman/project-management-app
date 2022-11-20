import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { IUser } from '../../models';
import { FormErrorMessage } from '../FormErrorMessage/FormErrorMessage';

interface IInputProps {
  field: 'id' | 'name' | 'login' | 'password';
  className: string;
  register: UseFormRegister<IUser>;
  errors: FieldError | undefined;
}

export const FormInput = ({ field, className, register, errors }: IInputProps) => {
  return (
    <div className={className}>
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor={field}
      >
        {field}
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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

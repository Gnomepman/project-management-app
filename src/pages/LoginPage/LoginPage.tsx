import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useTranslation } from 'react-i18next';
import './LoginPage.scss';
import { useAppSelector } from '../../hooks/redux';
import { useActions } from '../../hooks/actions';
import { IUser } from '../../models';
import { useLoginUserQuery } from '../../store/api/authApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../../components/FormInput/FormInput';

export function LoginPage() {
  const { t } = useTranslation();

  const userMock: IUser = {
    login: 'IMask',
    password: 'Tesla4ever',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({});

  const { isError, isLoading, data } = useLoginUserQuery(userMock);

  const { user } = useAppSelector((store) => store.user);
  const { setUser } = useActions();

  const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
    setUser(userMock);
    localStorage.setItem('token', data?.login || '');
    reset();
  };

  const hasError = () => {
    return Object.keys(errors).length !== 0;
  };

  return (
    <div className="container mx-auto sm:max-w-2xl my-4">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)} data-testid="form">
        <div className="flex flex-wrap -mx-3 mb-6">
          <FormInput
            field="login"
            className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
            register={register}
            errors={errors.login}
          />

          <div className="flex flex-wrap -mx-3 mb-6">
            <FormInput
              field="password"
              className="w-full px-3"
              register={register}
              errors={errors.password}
            />
          </div>
        </div>

        <Button
          type="submit"
          value="submit"
          data-testid="button-submit"
          disabled={hasError()}
          className={hasError() ? 'bg-secondary my-2' : 'bg-primary my-2'}
        >
          {'Submit'}
        </Button>
      </form>
    </div>
    // <>
    //   <button onClick={addUserToStore}>Sign In</button>
    //   {isLoading && <Loader />}
    //   {isError && <ErrorComponent />}
    //   {user && (
    //     <p>
    //       Hello, <span>{user?.login} </span>
    //     </p>
    //   )}
    // </>
  );
}

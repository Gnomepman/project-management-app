import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/esm/Button';
import { useActions } from '../../hooks/actions';
import { IErrorMessage, IUser } from '../../models';
import { useRegisterUserMutation } from '../../store/api/authApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../../components/FormInput/FormInput';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from '../../components/Loader/Loader';

export function RegistrationPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({});

  const [registerUser, { isLoading, isError, error, isSuccess }] = useRegisterUserMutation();

  const { setUser } = useActions();

  // Todo Refactor
  useEffect(() => {
    if (isSuccess) {
      toast.success(t('auth.reg-success'), {
        autoClose: 1000,
      });
      navigate('/login');
    }

    if (isError) {
      toast.error((error as IErrorMessage).data.message, {
        autoClose: 2000,
      });
    }
  }, [t, error, isError, isSuccess, navigate, isLoading]);

  useEffect(() => {
    if (!errors) {
      reset();
    }
  }, [reset, errors]);

  const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
    setUser(data);
    registerUser(data);
  };

  const hasError = () => {
    return Object.keys(errors).length !== 0;
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="container app-container">
        <div className="row d-flex pt-5 justify-content-center">
          <div className="col-md-4">
            <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
              <div className="form-outline mb-4">
                <FormInput
                  field="login"
                  type="text"
                  title={t('auth.login')}
                  register={register}
                  errors={errors.login}
                />
                <FormInput
                  field="name"
                  type="text"
                  title={t('auth.name')}
                  register={register}
                  errors={errors.name}
                />
                <FormInput
                  field="password"
                  type="password"
                  title={t('auth.password')}
                  register={register}
                  errors={errors.password}
                />
                <p className="text-muted">
                  {t('auth.have-account')}
                  <a className="px-2" href="/login">
                    {t('auth.sign-in')}
                  </a>
                </p>
                <Button
                  type="submit"
                  value="submit"
                  data-testid="button-submit"
                  disabled={hasError()}
                  className={hasError() ? 'bg-secondary my-2' : 'bg-primary my-2'}
                >
                  {t('auth.submit')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

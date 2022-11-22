import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/esm/Button';
import { useActions } from '../../hooks/actions';
import { IError, IUser } from '../../models';
import { useRegisterUserMutation } from '../../store/api/authApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../../components/FormInput/FormInput';
import { Loader } from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function RegistrationPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({});

  const [loginUser, { isLoading, isError, error, isSuccess, data }] = useRegisterUserMutation();

  const { setUser } = useActions();

  // Todo Refactor
  useEffect(() => {
    if (isSuccess) {
      toast.success('You successfully logged in', {
        position: 'top-right',
        autoClose: 1000,
      });
      navigate('/boards');
    }

    if (isError) {
      toast.error((error as IError).data.message, {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if (!errors) {
      reset();
    }
  }, [errors]);

  const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
    setUser(data);
    loginUser(data);
  };

  const hasError = () => {
    return Object.keys(errors).length !== 0;
  };
  return (
    <>
      {!data && (
        <div className="container mt-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-4">
              <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
                <div className="form-outline mb-4">
                  <div className="form-group mt-3">
                    <label htmlFor="name">{t('registration_name')}</label>
                    <input
                      className="form-control mt-1"
                      placeholder={`${t('placeholder_name')}`}
                      type="text"
                      {...register('name', {
                        required: `${t('login_error')}`,
                        minLength: {
                          value: 5,
                          message: `${t('min_error')}`,
                        },
                      })}
                    />
                    <div>{errors?.name && errors.name.message}</div>
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="name">{t('registration_login')}</label>
                    <input
                      className="form-control mt-1"
                      placeholder={`${t('placeholder_login')}`}
                      type="text"
                      {...register('login', {
                        required: `${t('login_error')}`,
                        minLength: {
                          value: 5,
                          message: `${t('min_error')}`,
                        },
                      })}
                    />
                    <div>{errors?.login && errors.login.message}</div>
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="password">{t('registration_password')}</label>
                    <input
                      className="form-control mt-1"
                      placeholder={`${t('placeholder_password')}`}
                      type="text"
                      {...register('password', {
                        required: `${t('pass_error')}`,
                        minLength: {
                          value: 5,
                          message: `${t('min_error')}`,
                        },
                      })}
                    />
                    <div>{errors?.password && errors.password.message}</div>
                  </div>
                  <Button
                    type="submit"
                    value="submit"
                    data-testid="button-submit"
                    disabled={hasError()}
                    className={hasError() ? 'bg-secondary my-4' : 'bg-primary my-4'}
                  >
                    {t('Submit')}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {isLoading && <Loader />}
    </>
  );
}

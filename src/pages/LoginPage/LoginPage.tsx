import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/esm/Button';
import { useActions } from '../../hooks/actions';
import { ILogin } from '../../models';
import { useLoginUserMutation } from '../../store/api/authApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../../components/FormInput/FormInput';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { parseJwt } from '../../utils/parseJwt';

export function LoginPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>({});

  const [loginUser, { isLoading, isError, error, isSuccess, data }] = useLoginUserMutation();

  const { setUser } = useActions();

  // Todo Refactor
  useEffect(() => {
    if (isSuccess) {
      toast.success(t('auth.login-success'), {
        position: 'top-right',
        autoClose: 800,
      });
      sessionStorage.setItem('token', data?.token as string);
      const userData = parseJwt(data?.token as string);
      setUser(userData);
      sessionStorage.setItem('user', JSON.stringify(userData));
      navigate('/boards');
    }

    if (isError) {
      toast.error(t('auth.login-error'), {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, [t, error, isError, isSuccess, navigate, isLoading, data, setUser]);

  useEffect(() => {
    if (!errors) {
      reset();
    }
  }, [reset, errors]);

  const onSubmit: SubmitHandler<ILogin> = (data: ILogin) => {
    loginUser(data);
  };

  const hasError = () => {
    return Object.keys(errors).length !== 0;
  };

  return (
    <>
      <div className="container app-container">
        <div className="row d-flex pt-5 justify-content-center">
          <div className="col-md-4">
            <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
              <div className="form-outline mb-4">
                <FormInput
                  field="login"
                  title={t('auth.login')}
                  register={register}
                  errors={errors.login}
                />
                <FormInput
                  field="password"
                  title={t('auth.password')}
                  register={register}
                  errors={errors.password}
                />
                <Button
                  type="submit"
                  value="submit"
                  data-testid="button-submit"
                  disabled={hasError()}
                  className={hasError() ? 'bg-secondary my-4' : 'bg-primary my-4'}
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

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/esm/Button';
import { useActions } from '../../hooks/actions';
import { IError, IUser } from '../../models';
import { useLoginUserMutation } from '../../store/api/authApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../../components/FormInput/FormInput';
import { Loader } from '../../components/Loader/Loader';
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
  } = useForm<IUser>({});

  const [loginUser, { isLoading, isError, error, isSuccess, data }] = useLoginUserMutation();

  const { setUser } = useActions();

  // Todo Refactor
  useEffect(() => {
    if (isSuccess) {
      toast.success('You successfully logged in', {
        position: 'top-right',
        autoClose: 800,
      });
      const userData = parseJwt(data.token);
      setUser(userData);
      sessionStorage.setItem('user', JSON.stringify(userData));

      navigate('/boards');
    }

    if (isError) {
      toast.error((error as IError).data.message, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  }, [error, isError, isSuccess, navigate, isLoading, data, setUser]);

  useEffect(() => {
    if (!errors) {
      reset();
    }
  }, [reset, errors]);

  const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
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
                  <FormInput field="login" register={register} errors={errors.login} />

                  <div className="mb-6">
                    <FormInput field="password" register={register} errors={errors.password} />
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

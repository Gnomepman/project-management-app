import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { FormInput } from '../FormInput/FormInput';
import { Button, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IErrorMessage, IUser } from '../../models';
import { useTranslation } from 'react-i18next';
import { usePutUserMutation } from '../../store/api/userApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface IEditUserModalProps {
  setEditModal: Dispatch<SetStateAction<boolean>>;
}

export const EditUserModal = ({ setEditModal }: IEditUserModalProps) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({});

  const [putUser, { isError, error, isSuccess }] = usePutUserMutation();

  const hasError = () => {
    return Object.keys(errors).length !== 0;
  };

  const { id } = JSON.parse(localStorage.getItem('user') || '');
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IUser> = (data: IUser) => {
    putUser({ id: id, payload: data });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('auth.upd-success'), {
        autoClose: 1000,
      });
      setEditModal(false);
    }

    if (isError) {
      toast.error((error as IErrorMessage).data.message, {
        autoClose: 2000,
      });
    }
  }, [t, error, isError, isSuccess, navigate, setEditModal]);

  useEffect(() => {
    if (!errors) {
      reset();
    }
  }, [reset, errors]);

  return (
    <>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
          <div className="form-outline">
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
            <div>
              <Modal.Footer>
                <Button
                  variant="primary"
                  style={{ marginRight: '15px' }}
                  type="submit"
                  value="submit"
                  data-testid="button-submit"
                  disabled={hasError()}
                  className={hasError() ? 'bg-secondary' : 'bg-primary'}
                >
                  {t('auth.edit')}
                </Button>
                <Button variant="danger" onClick={() => setEditModal(false)}>
                  {t('auth.cancel')}
                </Button>
              </Modal.Footer>
            </div>
          </div>
        </form>
      </Modal.Body>
    </>
  );
};

import React from 'react';
import {
  useGetUserByIdQuery,
  useGetUsersQuery,
  useUpdatePostMutation,
} from '../../store/api/userApi';
import { Button } from 'react-bootstrap';
import { ErrorComponent } from '../../components/Error/ErrorComponent';
import { EditUser, IErrorMessage, IUser } from '../../models';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../../components/FormInput/FormInput';

export const EditProfilePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditUser>({});
  const { t } = useTranslation();
  const id = '636d6464c02777e984c57dc1';

  const { isError, error, data } = useGetUserByIdQuery(id);
  const { data: users } = useGetUsersQuery();
  const [
    updatePost, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useUpdatePostMutation();

  const onSubmit: SubmitHandler<EditUser> = (data: EditUser) => {
    updatePost(data);
  };
  return (
    <>
      {data && (
        <div className="container">
          <h5>Logged User:</h5>
          <p>name: {data?.name}</p>
          <p>login: {data?.login}</p>
        </div>
      )}
      {isError && <ErrorComponent message={(error as IErrorMessage).data.message} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          field="login"
          title={t('auth.login')}
          register={register}
          errors={errors.login}
        />
        <FormInput field="name" title={t('auth.name')} register={register} errors={errors.name} />
        <Button>Change User data</Button>
      </form>
      {users &&
        users.map((item: IUser) => (
          <span className="px-1" key={item.login}>
            {item.login}
          </span>
        ))}
    </>
  );
};

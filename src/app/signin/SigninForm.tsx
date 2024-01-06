'use client';

import { useLoginUser } from '@/hooks/authHooks';
import { SubmitHandler, useForm } from 'react-hook-form';

const EMAIL_PATTERN = /\S+@\S+\.\S+/;
const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InBAcC5jb20iLCJpYXQiOjE3MDQ1MzI3MzYsImV4cCI6MTcwNDUzNjMzNn0.oj91502mIwj7Utu42ji11Hv0PiBxFCTDU-ofuMs1E70';
type Inputs = {
  email: string;
  password: string;
};
const SigninForm = () => {
  const { login } = useLoginUser();
  // const { data, error, isError } = useFetchUser(ACCESS_TOKEN);
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email: id, password } = data;
    const credentials = { id, password };
    login(credentials);
    resetField('email');
    resetField('password');
  };
  const validate = () => {
    // console.log(data);
  };

  // console.log(watch('email'));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register('email', {
            required: '이메일 주소를 입력해주세요.',
            pattern: {
              value: EMAIL_PATTERN,
              message: '유효한 이메일 주소를 입력해주세요.',
            },
          })}
          placeholder="이메일 주소를 입력해주세요."
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <input
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            pattern: {
              value: PASSWORD_PATTERN,
              message: '대소문자, 숫자, 특수문자를 포함해야 합니다.',
            },
          })}
          placeholder="비밀번호를 입력해주세요."
          type="password"
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <input type="submit" value={'로그인'} />
      <button onClick={validate} value={'확인'} />
    </form>
  );
};
export default SigninForm;

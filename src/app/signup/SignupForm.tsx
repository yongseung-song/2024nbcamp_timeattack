'use client';
import { useRegisterUser } from '@/hooks/authHooks';
import { User } from '@/types/auth.types';
import { SubmitHandler, useForm } from 'react-hook-form';

const NICKNAME_PATTERN = /^[A-Za-z]{1,12}$/;
const EMAIL_PATTERN = /\S+@\S+\.\S+/;
const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
type Inputs = {
  nickname: string;
  email: string;
  password: string;
};

const SignupForm = () => {
  const { register: registerUser } = useRegisterUser();
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onChange' });

  const onSigninSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password, nickname } = data;
    const newUser: User = {
      id: email,
      password,
      nickname,
    };
    registerUser(newUser);
    resetField('nickname');
    resetField('email');
    resetField('password');
  };

  // console.log(watch('email'));

  return (
    <form onSubmit={handleSubmit(onSigninSubmit)}>
      <div>
        <input
          {...register('nickname', {
            required: '닉네임을 입력해주세요.',
            pattern: {
              value: NICKNAME_PATTERN,
              message: '닉네임은 영문 12글자 이내여야 합니다.',
            },
          })}
          placeholder="닉네임을 입력해주세요."
        />
        {errors.nickname && <span>{errors.nickname?.message}</span>}
      </div>
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
              message:
                '대소문자, 숫자, 특수문자를 포함해 8자 이상이어야 합니다.',
            },
          })}
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <input type="submit" value={'회원가입'} />
    </form>
  );
};

export default SignupForm;

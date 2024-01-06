'use client';

import clientInstance from '@/api/api';
import { User } from '@/types/auth.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useFetchUser = () => {
  const { data, error, isError } = useQuery({
    queryKey: ['auth', localStorage.getItem('accessToken')],
    queryFn: () => fetchUser(localStorage.getItem('accessToken')!),
  });
  return { data, error, isError };
};

export const useRegisterUser = () => {
  const client = useQueryClient();
  const { mutate: register } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error: AxiosError) => {
      console.error(error);
    },
  });
  return { register };
};

export const useLoginUser = () => {
  const client = useQueryClient();
  const { mutate: login } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['auth'] });
    },
    onError: (error: AxiosError) => {
      console.error(error);
    },
  });
  return { login };
};

const fetchUser = async (accessToken: string) => {
  try {
    const { data, status } = await clientInstance.get('/user');
    console.log(JSON.parse(data));
  } catch (error) {
    console.error(error);
  }
};
const createUser = async (user: User): Promise<void> => {
  try {
    const { status } = await clientInstance.post('/register', user);
    console.log(status);
  } catch (error) {
    console.error(error);
  }
};
const loginUser = async (credentials: Pick<User, 'id' | 'password'>) => {
  try {
    const { data, status } = await clientInstance.post('/login', credentials);
    console.log(JSON.parse(data));
  } catch (error) {
    console.error(error);
  }
};

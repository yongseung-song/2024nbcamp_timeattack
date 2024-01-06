import client from '@/api/api';
import { User } from '@/types/auth.types';

export default function useAuth() {
  const fetchUser = async () => {
    try {
      const { data, status } = await client.get('/user/');
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const createUser = async (user: User): Promise<void> => {
    try {
      const { status } = await client.post('/register', user);
      console.log(status);
    } catch (error) {
      console.error(error);
    }
  };
  const loginUser = async (credentials: Pick<User, 'email' | 'password'>) => {
    try {
      const { data, status } = await client.post('/login');
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  // const fetchUser = () => {

  // }

  return { fetchUser, createUser, loginUser };
}

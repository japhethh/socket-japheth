'use server';
import { cookies } from 'next/headers';

const useToken = async (fallback = null) => {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('sessionToken');
    return sessionToken || null;

  } catch (error) {
    return fallback;
  }
};

export default useToken;


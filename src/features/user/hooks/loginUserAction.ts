/* eslint-disable @typescript-eslint/no-explicit-any */
//todo

import { store } from '@/contexts/store';
import { setUser } from '@/contexts/userSlice';
import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';
import { UserWithId } from '@/features/user/types/User';


export async function getUser(id: string): Promise<any> {
  try {
    const url = `/api/user/${id}`;
    const response = await BaseApiClient.get<UserWithId>(url);

    return response.data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
}

// todo

export async function loginUserAction(id: string): Promise<any> {
  try {
    const fetchedUser = await getUser(id);
    if (!fetchedUser) return;
    store.dispatch(
      setUser({
        ...fetchedUser,
        isAuthenticated: true,
        primaryId: fetchedUser.email,
        profilePicture: fetchedUser.imageUrl,
        _id: fetchedUser._id.toString(),
      })
    );

    return fetchedUser;
    // Check the user's Stripe purchases on login success
    // await updateStripeCustomer(fetchedUser.email);
  } catch (error) {
    console.error('Error logging in:', error);
  }
}

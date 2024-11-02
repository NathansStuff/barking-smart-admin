import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EUserRole } from '@/features/user/types/EUserRole';

import { RootState } from './store';

export interface IUser {
  primaryId: string; // email or phone
  name?: string;
  profilePicture?: string;
  email?: string;
  role: EUserRole | null;
  sid?: string;
  _id: string;
}

export interface IUserSlice extends IUser {
  isAuthenticated: boolean;
}

export const initialUserState: IUserSlice = {
  primaryId: '',
  isAuthenticated: false,
  name: '',
  role: null,
  _id: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserSlice>) => {
      return { ...state, ...action.payload };
    },
    logout: () => initialUserState,
  },
});

export const { setUser, logout } = userSlice.actions;

export const selectUser = (state: RootState): IUserSlice => state.user;
export const selectIsAuthenticated = (state: RootState): boolean =>
  state.user.isAuthenticated;
export const selectName = (state: RootState): string | undefined =>
  state.user.name;
export const selectRole = (state: RootState): EUserRole | null =>
  state.user.role;
export const selectEmail = (state: RootState): string => state.user.email ?? '';
export const selectSid = (state: RootState): string => state.user.sid ?? '';
export const selectUserId = (state: RootState): string => state.user._id;

export const userReducer = userSlice.reducer;

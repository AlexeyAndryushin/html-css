import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import AuthUserService from '../../../API/AuthUserService';
import { authLocalStorage } from '../../../LocalStorage';

type isLoaded = boolean;
type isError = string | null;

interface IAuthService {
  isLoading: isLoaded;
  error: isError;
  isAuth: boolean;
}

interface IUser {
  user: string;
  password: string;
}

const initialState: IAuthService = {
  isLoading: false,
  error: null,
  isAuth: !!authLocalStorage.getItem(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state: IAuthService, action: PayloadAction<isLoaded>) {
      state.isLoading = action.payload;
    },
    setAuth(state: IAuthService) {
      state.isAuth = true;
    },
    setError(state: IAuthService, action: PayloadAction<isError>) {
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
});

export const checkAuth =
  (username: string, password: string) => async (dispatch: Dispatch) => {
    dispatch(authSlice.actions.setLoading(true));

    setTimeout(async () => {
      const response: IUser[] = await AuthUserService.getAuth();
      const userCheck = response.find(
        (user) => user.user === username && user.password === password
      );
      if (userCheck) {
        const authToken = uuidv4();
        authLocalStorage.setItem(authToken);
        dispatch(authSlice.actions.setAuth());
        console.log(authLocalStorage.getItem);
      } else {
        dispatch(
          authSlice.actions.setError(
            'Что-то пошло не так, проверьте имя пользователя или пароль'
          )
        );
      }
      dispatch(authSlice.actions.setLoading(false));
    }, 0);
  };

export const logout = () => async (dispatch: Dispatch) => {
  authLocalStorage.removeItem();
  dispatch(authSlice.actions.logout());
};

export default authSlice.reducer;

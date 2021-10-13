import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import AuthUserService from "../../../API/AuthUserService";
import { authLocalStorage } from "../../../LocalStorage";

interface IAuthService {
	isLoading: boolean;
	error: string;
	isAuth: boolean
}

interface IUser {
	user: string;
	password: string;
}

const initialState: IAuthService = {
	isLoading: false,
	error: " ",
	isAuth: localStorage.getItem('auth') ? true : false
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLoading(
			state,
			action
		) {
			state.isLoading = action.payload
		},
		setAuth(
			state
		) {
			state.isAuth = true
		},
		setError(
			state, action
		) {
			state.error = action.payload
		}
	}
});

export const checkAuth = (username: string, password: string) => async (dispatch: Dispatch) => {
	dispatch(authSlice.actions.setLoading(true))

	setTimeout(async () => {
		const response: IUser[] = await AuthUserService.getAuth();
		const userCheck = response.find(user => user.user === username && user.password === password);
		if (userCheck) {
			const authToken = uuidv4();
			authLocalStorage.setKey(authToken);
			dispatch(authSlice.actions.setAuth())
		} else {
			dispatch(authSlice.actions.setError('Что-то пошло не так, проверьте имя пользователя и пароль'))
		}
		dispatch(authSlice.actions.setLoading(false))
	}, 2000)
}


export default authSlice.reducer
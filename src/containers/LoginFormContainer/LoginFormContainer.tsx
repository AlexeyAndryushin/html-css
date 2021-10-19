import React, { FocusEvent, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoginForm } from '../../components';
import { checkAuth } from '../../store/slices/auth/authSlice';
import { useTypedSelector } from '../../store/useTypedSelector';

export enum RouteNames {
  HOME = '/',
}

export const LoginFormContainer = () => {
  const dispatch = useDispatch();

  const initialState = {
    user: '',
    password: '',
  };

  const [formLogin, setFormLogin] = useState(initialState);

  const onChange = (e: FocusEvent<HTMLInputElement>) =>
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });

  const { isLoading, error } = useTypedSelector((state) => state.auth);

  const router = useHistory();

  const { user, password } = formLogin;

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(checkAuth(user, password));
    router.push(RouteNames.HOME);
  };

  return (
    <LoginForm
      error={error}
      formLogin={formLogin}
      handleSubmit={handleSubmit}
      onChange={onChange}
      isLoading={isLoading}
    />
  );
};
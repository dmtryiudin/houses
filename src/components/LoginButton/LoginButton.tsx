import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Navigate } from 'react-router-dom';
import { displayErrorMessage, displaySuccessMessage } from '../../lib/utils';
import { useAppDispatch } from '../../store/hooks';
import { authSlice } from '../../store/reducers/AuthSlice';

export const LoginButton = () => {
  const { login } = authSlice.actions;
  const dispatch = useAppDispatch();
  const [isRedirect, setIsRedirect] = useState<boolean>(false);
  const onSuccess = (res: any) => {
    dispatch(login(res));
    setIsRedirect(true);
    displaySuccessMessage('Success!', 'Logged in succesfully');
  };

  const onFailure = (res: any) => {
    displayErrorMessage('Error!', res.error);
  };

  return (
    <>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID!}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
      {isRedirect ? (
        <Navigate
          to={{
            pathname: '/user/123',
          }}
        />
      ) : null}
    </>
  );
};

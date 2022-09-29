import { useEffect, useState } from 'react';
import {  Link } from "react-router-dom";
import { Button } from 'antd';
import { useLazyGetUserQuery } from '../../api/UserApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setIsAuthorized, setUserId, logout, selectUser, setUserName } from './userSlice';
import { setIsLoading } from '../../app/loaderSlice';
import { useGetUserContactsQuery } from '../../api/UserApi';
import { LoginForm } from '../../components/LoginForm/LoginForm';

import styles from './Home.module.scss';

function Home() {
  const dispatch = useAppDispatch();

  const { isAuthorized, userName  } = useAppSelector(selectUser);

  const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false);

  const { data: userContacts = [], isFetching: isGetContactsFetching, isError: isGetContactsrError } = useGetUserContactsQuery('', {skip: !isAuthorized});

  const [ loginUser, {data: loginResult, isFetching: isUserFetching, isError: isGetUserError }] = useLazyGetUserQuery();

  const loginHandler = (values: {username: string, password: string}) => {
    setIsLoginFailed(false);
    dispatch(setIsAuthorized(false));
    loginUser({email: values.username, password: values.password});
  }

  const logoutUserHandler = () => {
    dispatch(logout());
  }

  const isLoading = isUserFetching || isGetContactsFetching;

  useEffect(() => {
    if (isLoading)  {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  },
  [ isLoading ]);

  useEffect(() => {
    if (!isUserFetching && loginResult && loginResult.length === 1) {
      dispatch(setIsAuthorized(true));
      dispatch(setUserId(loginResult[0].id));
      dispatch(setUserName(loginResult[0].name));
    } else if (!isUserFetching && loginResult && loginResult.length === 0) {
      setIsLoginFailed(true);
    }
  }, [loginResult, isUserFetching, dispatch])

  return (
    <div className={styles.container}>
      {isLoginFailed && <h3 className={styles.warning}> Wrong username/password. Please try again.</h3>}
      {isGetUserError && <h3 className={styles.warning}> Something went wrong... Please try again.</h3>}
      {!isAuthorized ? <LoginForm loginHandler={loginHandler}/> :
      <div className={styles.container}>
        <h2> Hello, {userName}!</h2>
        <h3> Now you can manage your contacts at <Link to='/contacts'>Contacts</Link> page</h3>
        {userContacts && !isGetContactsrError && <h3> You have {userContacts.length} contacts at the moment</h3>}
        <Button  htmlType="button" onClick={logoutUserHandler} className={styles.button}>
          Logout
        </Button>
        </div>
      }
    </div>
  )
}

export { Home }

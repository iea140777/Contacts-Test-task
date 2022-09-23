import { useEffect } from 'react';
import {  Link } from "react-router-dom";
import { Button } from 'antd';
import { useLazyGetUserQuery } from '../../api/UserApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setIsAuthorized, setUserId, logout, selectUser, setUserName } from './userSlice';
import { useGetUserContactsQuery } from '../../api/UserApi';
import { LoginForm } from '../../components/LoginForm/LoginForm';

import styles from './Home.module.scss';

function Home() {
  const dispatch = useAppDispatch();

  const { isAuthorized, userName  } = useAppSelector(selectUser);

  const { data: userContacts = [] } = useGetUserContactsQuery('');

  const [ loginUser, result] = useLazyGetUserQuery();

  const loginHandler = (values: {username: string, password: string}) => {
    dispatch(setIsAuthorized(false));
    loginUser({email: values.username, password: values.password});
  }

  const logoutUserHandler = () => {
    dispatch(logout());
  }

  useEffect(() => {
    if (!result.isFetching && result.currentData && result.currentData.length === 1) {
      dispatch(setIsAuthorized(true));
      dispatch(setUserId(result.currentData[0].id));
      dispatch(setUserName(result.currentData[0].name))
    }
  }, [result, dispatch])

  return (
    <div className={styles.container}>
      {!isAuthorized ? <LoginForm loginHandler={loginHandler}/> :
      <div className={styles.container}>
        <h2> Hello, {userName}!</h2>
        <h3> Now you can manage your contacts at <Link to='/contacts'>Contacts</Link> page</h3>
        <h3> You have {userContacts.length} contacts at the moment</h3>
        <Button  htmlType="button" onClick={logoutUserHandler} className={styles.button}>
          Logout
        </Button>
        </div>
      }
    </div>
  )
}

export { Home }

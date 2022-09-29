import { useEffect, useState } from 'react';
import {  useNavigate } from "react-router-dom";
import { Button, Input } from 'antd';
import {  selectUser } from '../Home/userSlice';
import { useGetUserContactsQuery } from '../../api/UserApi';
import { ContactCard } from '../../components/ContactCard/ContactCard';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setIsLoading } from '../../app/loaderSlice';
import { ContactsList } from '../../utils/types';
import { emptyContact } from '../../utils/constants';

import styles from './Contacts.module.scss';

const { Search } = Input;

function Contacts() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthorized, userId } = useAppSelector(selectUser);
  
  useEffect (() => {
    if(!isAuthorized || !userId) {
      navigate('/');
      return
    }
  })

  const [searchString, setSearchString] = useState<string>('');

  const { data: userContacts = [], isFetching, isError } = useGetUserContactsQuery(searchString);

  useEffect(() => {
    if (isFetching)  {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  },
  [ isFetching, dispatch ]);

  const [contacts, setContacts] = useState<ContactsList>(userContacts);

  const hasEmptyContact = contacts.filter(contact => contact.id === 0).length > 0

  useEffect(() => setContacts(userContacts), [userContacts]);
  
  const renderContactCards = () => {
    return contacts.map(contact => (
      <ContactCard 
        contact={contact} 
        key={contact.id} 
        isLoading={isFetching}
        cancelNewContact={cancelNewContactHandler}/>)
    )
  }

  const addContactHandler = () => {
    setContacts([emptyContact, ...contacts])
  }

  const cancelNewContactHandler = () => {
    setContacts(userContacts);
  }

  return (
    <div className={styles.container}>
      <h2>Contacts</h2>
      <h3>Total {userContacts.length} contacts</h3>
      <div className={styles.searchContainer}>
        <h3>Search contacts:</h3>
        <Search
          allowClear
          placeholder='Enter contact name'
          enterButton
          loading={isFetching}
          onSearch={value => setSearchString(value)}
        />
      </div>
      
      <Button 
        type='primary'
        size='large'
        onClick={addContactHandler}
        className={styles.button}
        disabled={hasEmptyContact}
      >
        Add new contact
      </Button>
     { isFetching && <span>Getting contacts...</span> }
     { isError && <span>Something went wrong...</span> }
     { userContacts && (
        <div className={styles.cardContainer}>
          {renderContactCards()}
        </div>
     )}
    </div>
  )
}

export { Contacts };
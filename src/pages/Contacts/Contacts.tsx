import { useEffect, useState } from 'react';
import {  useNavigate } from "react-router-dom";
import { Button, Input } from 'antd';
import {  selectUser } from '../Home/userSlice';
import { useGetUserContactsQuery } from '../../api/UserApi';
import { ContactCard } from '../../components/ContactCard/ContactCard';
import { useAppSelector } from '../../app/hooks';
import { ContactsList, Contact } from '../../utils/types';

import styles from './Contacts.module.scss';

const emptyContact:Contact = {
  id: 0,
  name: '',
  phone: '',
  address: '',
  email: ''
}

const { Search } = Input;

function Contacts() {
  const { isAuthorized, userId } = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect (() => {
    if(!isAuthorized || !userId) {
      navigate('/');
      return
    }
  })

  const [searchString, setSearchString] = useState<string>('');

  const { data: userContacts = [], isLoading, isError } = useGetUserContactsQuery(searchString);

  const [contacts, setContacts] = useState<ContactsList>(userContacts);

  const hasEmptyContact = contacts.filter(contact => contact.id === 0).length > 0

  useEffect(() => setContacts(userContacts), [userContacts]);
  
  const renderContactCards = () => {
    return contacts.map(contact => (
      <ContactCard 
        contact={contact} 
        key={contact.id} 
        isLoading={isLoading}
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
          loading={isLoading}
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
     { isLoading && <span>Getting contacts...</span> }
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
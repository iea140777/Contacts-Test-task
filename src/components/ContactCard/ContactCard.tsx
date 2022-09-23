import { useState } from 'react';
import { Card, Input } from 'antd';
import { faEdit, faTrashAlt, faSave, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  useUpdateUserContactMutation,
  useDeleteUserContactMutation,
  useAddUserContactMutation }   from '../../api/UserApi';
import { Contact } from '../../types/types';

import styles from './ContactCard.module.scss';

interface ContactCardProps {
  contact: Contact;
  isLoading: boolean;
  cancelNewContact: () => void;
}

function ContactCard ({contact, cancelNewContact, isLoading}:ContactCardProps) {
  const { id, name, phone, email, address} = contact;

  const isNewContact:boolean = id === 0;
  
  const[editMode, setEditMode] = useState<boolean>(isNewContact ? true : false);
  
  const[contactData, setContactData] = useState<Contact>(contact);

  const [addUserContactMutation, {isLoading: addingUser} ] = useAddUserContactMutation();
  

  const [updateUserContactMutation, {isLoading: updatingUser }] = useUpdateUserContactMutation();
  
  const [deleteUserContactMutation] = useDeleteUserContactMutation();

  const editContactHandler = () => {
    setContactData(contact);
    setEditMode(true);
  }

  const deleteContactHandler = () => {
    deleteUserContactMutation(id)
  }

  const saveChangesHandler = async () => {
    isNewContact ?  await addUserContactMutation(contactData) : 
    await updateUserContactMutation(contactData);
    setEditMode(false);
  }

  const cancelChangesHandler = () => {
    if (isNewContact) {
      cancelNewContact();
    } else {
      setContactData(contact);
      setEditMode(false);
    }
  }

  const cardActionsDefault = [
    <FontAwesomeIcon className={styles.icon} icon={faEdit} onClick={editContactHandler} />,
    <FontAwesomeIcon className={styles.icon} icon={faTrashAlt} onClick={deleteContactHandler} />
  ]

  const cardActionsEditMode = [
    <FontAwesomeIcon className={styles.icon} icon={faSave} onClick={saveChangesHandler} />,
    <FontAwesomeIcon className={styles.icon} icon={faXmarkCircle} onClick={cancelChangesHandler} />
  ]

  const renderEditInput = (field: keyof Contact) => {
    const changeHandler = (newValue: Contact[keyof Contact]) => {
      setContactData({
        ...contactData,
        [field]: newValue
      })
    }
    return (
        <Input 
          type="text" 
          onChange={(e)=>changeHandler(e.target.value)} 
          required
          value={contactData[field]}
          maxLength={20}
          className={styles.input}
        /> 
    )
  }
 
  return (
    <Card 
      title={editMode ? <div className={styles.inputContainer}>Name: {renderEditInput("name")}</div> : name} 
      actions={editMode ? cardActionsEditMode : cardActionsDefault }
      loading={isLoading || addingUser || updatingUser}
      className={styles.card}
    >
      <div className={styles.inputContainer}>Phone: {editMode ? renderEditInput("phone") : phone }</div>
      <div className={styles.inputContainer}>Email: {editMode ? renderEditInput("email") : email }</div>
      <div className={styles.inputContainer}>Address: {editMode ? renderEditInput("address") : address }</div>
    </Card>
  )
}

export { ContactCard };
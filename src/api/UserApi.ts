import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {UserData, UsersData, ContactsList, Contact } from '../utils/types'

type GetUserRequestParams = Pick<UserData, "email" |"password">; 

const USER_TAGS = {
  UserData: "UserData",
  Contacts: "Contacts"
};

const userApi = createApi({
  reducerPath: 'userData',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004' }),
  tagTypes: Object.values(USER_TAGS),
  endpoints: (builder) => ({
    getUser: builder.query< UsersData, GetUserRequestParams>({
      query: ({email, password}) => ({
        url: `/users?email=${email}&password=${password}`,
      }),
      providesTags: [USER_TAGS.UserData]
    }),
    getUserContacts: builder.query< ContactsList, string >({
      query: (searchString) => ({
        url: `/contacts?q=${searchString}`,
      }),
      providesTags: [USER_TAGS.Contacts]
    }),
    addUserContact: builder.mutation< Contact, Contact >({
      query: ( contact) => ({
        url: '/contacts',
        method: "POST",
        body: contact
      }),
      invalidatesTags: [USER_TAGS.Contacts]
    }),
    updateUserContact: builder.mutation< Contact, Contact >({
      query: ( contact) => ({
        url: `/contacts/${contact.id}`,
        method: "PUT",
        body: contact
      }),
      invalidatesTags: [USER_TAGS.Contacts]
    }),
    deleteUserContact: builder.mutation< void, number >({
      query: ( contactId) => ({
        url: `/contacts/${contactId}`,
        method: "DELETE",
      }),
      invalidatesTags: [USER_TAGS.Contacts]
    }),
  }),
})

const { 
  useLazyGetUserQuery, 
  useGetUserContactsQuery, 
  useAddUserContactMutation, 
  useUpdateUserContactMutation,
  useDeleteUserContactMutation,
} = userApi;

export { 
  userApi, 
  useLazyGetUserQuery,
  useAddUserContactMutation,
  useDeleteUserContactMutation,
  useGetUserContactsQuery,
  useUpdateUserContactMutation
};
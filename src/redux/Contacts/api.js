import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
    reducerPath: 'contacts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://connections-api.herokuapp.com/', prepareHeaders: (headers, { getState }) => {
            const token = getState().authorisation.token;
            if (token) headers.set('authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['Contacts'],
    endpoints: (builder) => ({
        getContacts: builder.query({
            query: () => `contacts/`,
            providesTags: (result) => result
                ?
                [...result.map(({ id }) => ({ type: 'Contacts', id })), { type: 'Contacts', id: 'LIST' }]
                :
                [{ type: 'Contacts', id: 'LIST' }],
        }),
        addContact: builder.mutation({
            query: (body) => ({
                url: `contacts`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Contacts', }],
        }),
        deleteContact: builder.mutation({
            query: (id) => ({
                url: `contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Contacts', id }],
        }),
        editContact: builder.mutation({
            query: ({ id, contact }) => ({
                url: `contacts/${id}`,
                method: 'PATCH',
                body: { ...contact },
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Contacts', }],
        }),
    }),
});

export const { useGetContactsQuery, useAddContactMutation, useDeleteContactMutation, useEditContactMutation } = contactsApi;
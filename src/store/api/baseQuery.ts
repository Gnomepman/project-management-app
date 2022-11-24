import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants';

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,

  prepareHeaders: (headers) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

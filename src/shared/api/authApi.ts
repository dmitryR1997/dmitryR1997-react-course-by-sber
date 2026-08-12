import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { AUTH_API_BASE_URL } from 'shared/config/api'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: {
    id: string
    email: string
  }
  accessToken: string
}

export interface CurrentUser {
  id: string
  email: string
  name: string
  about?: string
  avatarPath?: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: AUTH_API_BASE_URL }),
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),

    getMe: build.query<CurrentUser, string>({
      query: (token) => ({
        url: 'users/me',
        headers: { Authorization: token },
      }),
    }),
  }),
})

export const { useLoginMutation, useGetMeQuery } = authApi

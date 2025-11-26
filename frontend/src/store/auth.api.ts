import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'

export interface User {
	id: string
	name: string
	createdAt: string
}

export interface AuthResponse {
	status: 'success'
	user: User
}

export interface AuthResponseProfile extends AuthResponse {
	message: string
}

export interface AuthRequest {
	name: string
	password: string
}

const baseQueryWithCredentials = fetchBaseQuery({
	baseUrl: 'http://localhost:3000/api/',
	credentials: 'include'
})

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: baseQueryWithCredentials,
	tagTypes: ['User'],
	endpoints: builder => ({
		signup: builder.mutation<AuthResponse, AuthRequest>({
			query: credentials => ({
				url: 'signup',
				method: 'POST',
				body: credentials
			}),
			invalidatesTags: ['User']
		}),
		login: builder.mutation<AuthResponse, AuthRequest>({
			query: credentials => ({
				url: 'login',
				method: 'POST',
				body: credentials
			}),
			invalidatesTags: ['User']
		}),
		getProfile: builder.query<AuthResponse, void>({
			query: () => 'profile',
			providesTags: ['User']
		})
	})
})

export const { useGetProfileQuery, useLoginMutation, useSignupMutation } =
	authApi

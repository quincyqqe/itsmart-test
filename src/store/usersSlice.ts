import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { User } from '../shared/types/usersTypes'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await axios.get('https://jsonplaceholder.typicode.com/users')
	return response.data
})

const initialState = {
	users: [] as User[],
	nameFilter: '',
	usernameFilter: '',
	emailFilter: '',
	phoneFilter: '',
}

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setNameFilter: (state, action) => {
			state.nameFilter = action.payload
		},
		setUsernameFilter: (state, action) => {
			state.usernameFilter = action.payload
		},
		setEmailFilter: (state, action) => {
			state.emailFilter = action.payload
		},
		setPhoneFilter: (state, action) => {
			state.phoneFilter = action.payload
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.users = action.payload
		})
	},
})

export const {
	setNameFilter,
	setUsernameFilter,
	setEmailFilter,
	setPhoneFilter,
} = usersSlice.actions
export default usersSlice.reducer

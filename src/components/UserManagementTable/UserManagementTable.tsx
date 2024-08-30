import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch, RootState } from '../../store/store'
import {
	fetchUsers,
	setNameFilter,
	setUsernameFilter,
	setEmailFilter,
	setPhoneFilter,
} from '../../store/usersSlice'
import { User } from '../../shared/types/usersTypes'

import './UserManagementTable.css'

const UserManagementTable = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { users, nameFilter, usernameFilter, emailFilter, phoneFilter } =
		useSelector((state: RootState) => state.usersSlice)

	useEffect(() => {
		dispatch(fetchUsers())
	}, [dispatch])

	const filterUsers = (users: User[]) => {
		return users.filter(
			user =>
				user.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
				user.username.toLowerCase().includes(usernameFilter.toLowerCase()) &&
				user.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
				user.phone.toLowerCase().includes(phoneFilter.toLowerCase())
		)
	}

	const filteredUsers = filterUsers(users)

	return (
		<div className='table-container'>
			<h2>Users</h2>
			<div className='filter-container'>
				<input
					type='text'
					placeholder='Search by name'
					value={nameFilter}
					onChange={e => dispatch(setNameFilter(e.target.value))}
				/>
				<input
					type='text'
					placeholder='Search by username'
					value={usernameFilter}
					onChange={e => dispatch(setUsernameFilter(e.target.value))}
				/>
				<input
					type='text'
					placeholder='Search by email'
					value={emailFilter}
					onChange={e => dispatch(setEmailFilter(e.target.value))}
				/>
				<input
					type='text'
					placeholder='Search by phone'
					value={phoneFilter}
					onChange={e => dispatch(setPhoneFilter(e.target.value))}
				/>
			</div>
			<table className='user-table'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Username</th>
						<th>Email</th>
						<th>Phone</th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.length > 0 ? (
						filteredUsers.map((user: User) => (
							<tr key={user.id}>
								<td>{user.name}</td>
								<td>{user.username}</td>
								<td>{user.email}</td>
								<td>{user.phone}</td>
							</tr>
						))
					) : (
						<tr>
							<td>No results found</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}

export default UserManagementTable

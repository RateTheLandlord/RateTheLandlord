/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Alert from '@/components/alerts/Alert'
import Modal from '@/components/modal/Modal'
import {useEffect, useState} from 'react'
import useSWR, {useSWRConfig} from 'swr'
import AddUserModal from '../components/AddUserModal'
import RemoveUserModal from '../components/RemoveUserModal'

interface IUsers {
	id: number
	name: string
	email: string
	blocked: boolean
	role: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const TeamMembers = () => {
	const {mutate} = useSWRConfig()
	const [addUserOpen, setAddUserOpen] = useState(false)

	const [newUserName, setNewUserName] = useState('')
	const [newUserEmail, setNewUserEmail] = useState('')
	const [newUserPassword, setNewUserPassword] = useState('')
	const [newUserAdmin, setNewUserAdmin] = useState(false)

	const [removeUserOpen, setRemoveUserOpen] = useState(false)
	const [selectedUser, setSelectedUser] = useState<IUsers>()

	const [users, setUsers] = useState<Array<IUsers>>([])

	const [success, setSuccess] = useState(false)
	const [removeAlertOpen, setRemoveAlertOpen] = useState(false)

	const {data: allUsers, error} = useSWR<Array<IUsers>>(
		'/api/get-users',
		fetcher,
	)

	useEffect(() => {
		if (allUsers) {
			setUsers(allUsers)
		}
	}, [allUsers])

	if (error) return <div>failed to load</div>
	if (!allUsers) return <div>loading...</div>

	const onSubmitNewUser = (num: number) => {
		const newUser = {
			name: newUserName,
			email: newUserEmail,
			password: newUserPassword,
			role: newUserAdmin ? 'ADMIN' : 'USER',
			blocked: false,
		}

		fetch('/api/add-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUser),
		})
			.then((result) => {
				if (!result.ok) {
					throw new Error()
				}
			})
			.then(() => {
				mutate('/api/get-users').catch((err) => console.log(err))
				setAddUserOpen(false)
				setSuccess(true)
				setRemoveAlertOpen(true)
			})
			.catch((err) => {
				console.log(err)
				setSuccess(false)
				setRemoveAlertOpen(true)
			})
	}

	const onSubmitDeleteUser = (num: number) => {
		fetch('/api/remove-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(selectedUser?.id),
		})
			.then((result) => {
				if (!result.ok) {
					throw new Error()
				}
			})
			.then(() => {
				mutate('/api/get-users').catch((err) => console.log(err))
				setRemoveUserOpen(false)
				setSuccess(true)
				setRemoveAlertOpen(true)
			})
			.catch((err) => {
				console.log(err)
				setRemoveUserOpen(false)
				setSuccess(false)
				setRemoveAlertOpen(true)
			})
	}
	return (
		<div className="w-full flex flex-wrap justify-center px-4 sm:px-6 lg:px-8">
			{removeAlertOpen ? (
				<div className="w-full">
					<Alert success={success} setAlertOpen={setRemoveAlertOpen} />
				</div>
			) : null}
			{selectedUser ? (
				<Modal
					title="Remove User"
					open={removeUserOpen}
					setOpen={setRemoveUserOpen}
					element={<RemoveUserModal />}
					onSubmit={onSubmitDeleteUser}
					buttonColour="red"
					selectedId={selectedUser.id}
				/>
			) : null}
			<Modal
				title="Add User"
				open={addUserOpen}
				setOpen={setAddUserOpen}
				element={
					<AddUserModal
						setAdmin={setNewUserAdmin}
						isAdmin={newUserAdmin}
						setEmail={setNewUserEmail}
						setName={setNewUserName}
						setPassword={setNewUserPassword}
					/>
				}
				onSubmit={onSubmitNewUser}
				buttonColour="blue"
				selectedId={1}
			/>

			<div className="sm:flex sm:items-center w-full container mt-3">
				<div className="sm:flex-auto">
					<h1 className="text-xl font-semibold text-gray-900">Users</h1>
				</div>
				<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<button
						onClick={() => setAddUserOpen((p) => !p)}
						className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
					>
						Add user
					</button>
				</div>
			</div>
			<div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg container">
				<table className="min-w-full divide-y divide-gray-300">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
							>
								Name
							</th>
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
							>
								Email
							</th>
							<th
								scope="col"
								className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
							>
								Permissions
							</th>

							<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
								<span className="sr-only">Remove</span>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 bg-white">
						{users.map((user) => (
							<tr key={user.id}>
								<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
									{user.name}
									<dl className="font-normal lg:hidden">
										<dt className="sr-only">Email</dt>
										<dd className="mt-1 truncate text-gray-500">
											{user.email}
										</dd>
										<dt className="sr-only sm:hidden">Role</dt>
										<dd className="mt-1 truncate text-gray-700 sm:hidden">
											{user.role}
										</dd>
									</dl>
								</td>
								<td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
									{user.email}
								</td>
								<td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
									{user.role}
								</td>

								<td className="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
									{user.role === 'ADMIN' ? null : (
										<button
											onClick={() => {
												setSelectedUser(user)
												setRemoveUserOpen(true)
											}}
											className="text-indigo-600 hover:text-indigo-900"
										>
											Remove
										</button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default TeamMembers

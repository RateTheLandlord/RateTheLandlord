import Modal from '@/components/modal/Modal'
import {useState} from 'react'
import AddUserModal from '../components/AddUserModal'

// TODO Hook up to BE
// TODO Add Success/Failure Notification

const people = [
	{
		name: 'Lindsay Walton',
		email: 'LindsayWalton@gmail.com',
		permissions: 'Admin',
	},
]

const TeamMembers = () => {
	const [addUserOpen, setAddUserOpen] = useState(false)

	const [newUserName, setNewUserName] = useState('')
	const [newUserEmail, setNewUserEmail] = useState('')
	const [newUserPassword, setNewUserPassword] = useState('')
	const [newUserAdmin, setNewUserAdmin] = useState(false)

	const onSubmit = () => {
		const newUser = {
			name: newUserName,
			email: newUserEmail,
			password: newUserPassword,
			role: newUserAdmin ? 'ADMIN' : 'USER',
			blocked: false,
		}

		//Post to DB
	}
	return (
		<div className="w-full flex flex-wrap justify-center px-4 sm:px-6 lg:px-8">
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
				onSubmit={onSubmit}
				buttonColour="blue"
			/>
			<div className="sm:flex sm:items-center w-full container mt-3">
				<div className="sm:flex-auto">
					<h1 className="text-xl font-semibold text-gray-900">Users</h1>
				</div>
				<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<button
						type="button"
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
						{people.map((person) => (
							<tr key={person.name}>
								<td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
									{person.name}
									<dl className="font-normal lg:hidden">
										<dt className="sr-only">Email</dt>
										<dd className="mt-1 truncate text-gray-500">
											{person.email}
										</dd>
										<dt className="sr-only sm:hidden">Permissions</dt>
										<dd className="mt-1 truncate text-gray-700 sm:hidden">
											{person.permissions}
										</dd>
									</dl>
								</td>
								<td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
									{person.email}
								</td>
								<td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
									{person.permissions}
								</td>

								<td className="py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
									<a href="#" className="text-indigo-600 hover:text-indigo-900">
										Remove
									</a>
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

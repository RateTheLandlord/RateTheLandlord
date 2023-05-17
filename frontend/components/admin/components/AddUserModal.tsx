import {classNames} from '@/util/helpers/helper-functions'
import {Switch} from '@headlessui/react'
import {Dispatch, SetStateAction} from 'react'

interface IProps {
	setName: Dispatch<SetStateAction<string>>
	setEmail: Dispatch<SetStateAction<string>>
	setPassword: Dispatch<SetStateAction<string>>
	setAdmin: Dispatch<SetStateAction<boolean>>
	isAdmin: boolean
}

const AddUserModal = ({
	setName,
	setEmail,
	setPassword,
	setAdmin,
	isAdmin,
}: IProps) => {
	return (
		<form
			className="container w-full space-y-8 divide-y divide-gray-200"
			data-testid="add-user-modal-1"
		>
			<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
				<div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
					<div className="space-y-6 sm:space-y-5">
						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Name
							</label>
							<div className="mt-1 sm:col-span-2 sm:mt-0">
								<input
									onChange={(e) => setName(e.target.value)}
									type="text"
									name="name"
									id="name"
									autoComplete="given-name"
									className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
								/>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Email address
							</label>
							<div className="mt-1 sm:col-span-2 sm:mt-0">
								<input
									onChange={(e) => setEmail(e.target.value)}
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								/>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Temporary Password
							</label>
							<div className="mt-1 sm:col-span-2 sm:mt-0">
								<input
									onChange={(e) => setPassword(e.target.value)}
									type="text"
									name="password"
									id="password"
									className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
								/>
							</div>
						</div>
						<Switch.Group
							as="div"
							className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
						>
							<Switch.Label
								as="span"
								className="w-full text-sm font-medium text-gray-900"
								passive
							>
								Admin?
							</Switch.Label>
							<div className="mt-1 sm:col-span-2 sm:mt-0">
								<Switch
									checked={isAdmin}
									onChange={setAdmin}
									className={classNames(
										isAdmin ? 'bg-indigo-600' : 'bg-gray-200',
										'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
									)}
								>
									<span
										aria-hidden="true"
										className={classNames(
											isAdmin ? 'translate-x-5' : 'translate-x-0',
											'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
										)}
									/>
								</Switch>
							</div>
						</Switch.Group>
					</div>
				</div>
			</div>
		</form>
	)
}

export default AddUserModal

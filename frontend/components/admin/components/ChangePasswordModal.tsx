import {Dispatch, SetStateAction} from 'react'

interface IProps {
	setNewPassword: Dispatch<SetStateAction<string | undefined>>
	setConfirmPassword: Dispatch<SetStateAction<string | undefined>>
	passwordCheck: boolean
}

const ChangePasswordModal = ({
	setConfirmPassword,
	setNewPassword,
	passwordCheck,
}: IProps) => {
	return (
		<form className="space-y-8 divide-y divide-gray-200 w-full container">
			<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
				<div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
					<div className="space-y-6 sm:space-y-5">
						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								New Password
							</label>
							<div className="mt-1 sm:col-span-2 sm:mt-0">
								<input
									type="password"
									name="password"
									id="password"
									onChange={(e) => setNewPassword(e.target.value)}
									className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
								/>
							</div>
						</div>
						<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Confirm New Password
							</label>
							<div className="mt-1 sm:col-span-2 sm:mt-0">
								<input
									type="password"
									name="password"
									id="password"
									onChange={(e) => setConfirmPassword(e.target.value)}
									className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
								/>
								{!passwordCheck ? (
									<p className="text-xs text-red-400">Passwords do not match</p>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}

export default ChangePasswordModal

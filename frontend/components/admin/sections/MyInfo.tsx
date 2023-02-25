import Alert from '@/components/alerts/Alert'
import {useAppSelector} from '@/redux/hooks'
import {useEffect, useState} from 'react'
import ButtonLight from '@/components/ui/button-light'
import Modal from '@/components/modal/Modal'
import ChangePasswordModal from '../components/ChangePasswordModal'

const MyInfo = () => {
	const [name, setName] = useState<string | undefined>('')
	const [email, setEmail] = useState<string | undefined>('')
	const [newPassword, setNewPassword] = useState<string | undefined>('')
	const [confirmPass, setConfirmPassword] = useState<string | undefined>('')
	const [passwordCheck, setPasswordCheck] = useState(false)

	const [alertOpen, setAlertOpen] = useState(false)
	const [success, setSuccess] = useState(false)

	const [changePasswordOpen, setChangePasswordOpen] = useState(false)

	const user = useAppSelector((state) => state.user)

	useEffect(() => {
		if (user) {
			setEmail(user?.result.email)
			setName(user?.result.name)
		}
	}, [user])

	const checkPasswords = () => {
		return newPassword === confirmPass
	}

	useEffect(() => {
		setPasswordCheck(() => checkPasswords())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newPassword])

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const updateUser = {
			...user.result,
			name: name,
			email: email,
		}
		fetch('/api/update-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updateUser),
		})
			.then((result) => {
				if (!result.ok) {
					throw new Error()
				}
			})
			.then(() => {
				setSuccess(true)
				setAlertOpen(true)
			})
			.catch((err) => {
				console.log(err)
				setSuccess(false)
				setAlertOpen(true)
			})
	}

	const submitChangePassword = (id: number) => {
		if (passwordCheck) {
			const body = {
				password: newPassword,
				id: user.result.id,
			}

			fetch('/api/change-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			})
				.then((result) => {
					if (!result.ok) {
						throw new Error()
					}
				})
				.then(() => {
					setSuccess(true)
					setAlertOpen(true)
				})
				.catch((err) => {
					console.log(err)
					setSuccess(false)
					setAlertOpen(true)
				})
		}
	}

	return (
		<>
			<Modal
				title="Change Password"
				open={changePasswordOpen}
				setOpen={setChangePasswordOpen}
				element={
					<ChangePasswordModal
						setConfirmPassword={setConfirmPassword}
						setNewPassword={setNewPassword}
						passwordCheck={passwordCheck}
					/>
				}
				onSubmit={submitChangePassword}
				buttonColour="blue"
				selectedId={1}
			/>
			<form
				className="space-y-8 divide-y divide-gray-200 w-full container"
				onSubmit={(e) => onSubmit(e)}
			>
				{alertOpen ? (
					<div className="w-full">
						<Alert success={success} setAlertOpen={setAlertOpen} />
					</div>
				) : null}
				<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
					<div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
						<div>
							<h3 className="text-lg font-medium leading-6 text-gray-900">
								My Information
							</h3>
						</div>
						<div className="space-y-6 sm:space-y-5">
							<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									Name
								</label>
								<div className="mt-1 sm:col-span-2 sm:mt-0">
									<input
										type="text"
										name="name"
										id="name"
										placeholder={name}
										onChange={(e) => setName(e.target.value)}
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
										id="email"
										name="email"
										type="email"
										placeholder={email}
										onChange={(e) => setEmail(e.target.value)}
										className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="pt-5">
					<div className="flex justify-between">
						<ButtonLight
							onClick={() => {
								setChangePasswordOpen((p) => !p)
							}}
						>
							Change Password
						</ButtonLight>
						<button
							type="submit"
							className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Save
						</button>
					</div>
				</div>
			</form>
		</>
	)
}

export default MyInfo

// TODO Add Submit Function
// TODO Hook up to BE
// TODO Add Success/Failure Notification

import {useEffect, useState} from 'react'
import useSWR, {useSWRConfig} from 'swr'

interface IUsers {
	id: number
	name: string
	email: string
	blocked: boolean
	role: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const MyInfo = () => {
	const {mutate} = useSWRConfig()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPass, setConfirmPassword] = useState('')
	const [passwordCheck, setPasswordCheck] = useState(false)

	const [alertOpen, setAlertOpen] = useState(false)
	const [success, setSuccess] = useState(false)

	const {
		data: user,
		error,
		isLoading,
	} = useSWR<IUsers>('/api/get-user', fetcher)

	useEffect(() => {
		if (user) {
			setEmail(user.email)
			setName(user.name)
		}
	}, [user])

	useEffect(() => {
		setPasswordCheck(() => checkPasswords())
	}, [newPassword])

	const checkPasswords = () => {
		return newPassword === confirmPass
	}

	const onSubmit = () => {
		if (passwordCheck) {
			const updateUser = {
				...user,
				id: user?.id,
				name: name,
				email: email,
				password: newPassword,
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
					mutate('/api/get-user').catch((err) => console.log(err))
					setRemoveReviewOpen(false)
					setSuccess(true)
					setRemoveAlertOpen(true)
				})
				.catch((err) => {
					console.log(err)
					setRemoveAlertOpen(false)
					setSuccess(false)
					setRemoveAlertOpen(true)
				})
		}
	}

	if (error) return <div>failed to load</div>
	if (isLoading) return <div>loading...</div>

	return (
		<form className="space-y-8 divide-y divide-gray-200 w-full container">
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

			<div className="pt-5">
				<div className="flex justify-end">
					<button
						type="submit"
						className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Save
					</button>
				</div>
			</div>
		</form>
	)
}

export default MyInfo

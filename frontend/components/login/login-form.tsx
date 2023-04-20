import React, {useState} from 'react'
import {LockClosedIcon} from '@heroicons/react/solid'
import Logo from '../svg/logo/logo'
import {setCookie} from 'nookies'
import {useRouter} from 'next/router'
import {useAppDispatch} from '@/redux/hooks'
import {updateUser} from '@/redux/user/userSlice'

interface ILogin {
	jwt: {
		access_token: string
	}
	result: {
		id: number
		name: string
		email: string
		blocked: boolean
		role: string
	}
}

export default function LoginForm(): JSX.Element {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const dispatch = useAppDispatch()

	const [error, setError] = useState(false)

	const router = useRouter()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (email === '' || password === '') {
			setError(true)
			return
		}

		fetch('/api/submit-login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({email: email, password: password}),
		})
			.then((result: Response) => {
				if (!result.ok) {
					throw new Error()
				}
				return result.json()
			})
			.then((data: ILogin) => {
				setCookie(null, 'ratethelandlord', data.jwt.access_token, {
					maxAge: 30 * 24 * 60,
				})
				dispatch(updateUser(data))
				router.push(`/admin/${data.result.id}`).catch((err) => console.log(err))
			})
			.catch(() => {
				setError(true)
			})
	}
	return (
		<div>
			<div
				className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
				data-testid="login-form-1"
			>
				<div className="max-w-md w-full space-y-8">
					<div className="flex justify-center flex-row flex-wrap">
						<Logo styling="w-24 h-24" />
						<h2 className="w-full mt-6 text-center text-3xl font-extrabold text-gray-900">
							Sign in to your account
						</h2>
						{error ? (
							<p className="text-red-400">Error: Invalid Email or Password</p>
						) : null}
					</div>
					<form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
						<div className="rounded-md shadow-sm -space-y-px">
							<div>
								<label htmlFor="email-address" className="sr-only">
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									onChange={(e) => setEmail(e.target.value)}
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Email address"
									data-testid="login-form-email-1"
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									onChange={(e) => setPassword(e.target.value)}
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Password"
									data-testid="login-form-password-1"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								data-testid="login-form-button-1"
							>
								<span className="absolute left-0 inset-y-0 flex items-center pl-3">
									<LockClosedIcon
										className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
										aria-hidden="true"
									/>
								</span>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

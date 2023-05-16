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
				localStorage.setItem('rtlUserId', data.result.id.toString())
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
				className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
				data-testid="login-form-1"
			>
				<div className="w-full max-w-md space-y-8">
					<div className="flex flex-row flex-wrap justify-center">
						<Logo styling="w-24 h-24" />
						<h2 className="mt-6 w-full text-center text-3xl font-extrabold text-gray-900">
							Sign in to your account
						</h2>
						{error ? (
							<p className="text-red-400">Error: Invalid Email or Password</p>
						) : null}
					</div>
					<form className="mt-8 space-y-6" onSubmit={(e) => handleSubmit(e)}>
						<div className="-space-y-px rounded-md shadow-sm">
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
									className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
									className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									placeholder="Password"
									data-testid="login-form-password-1"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								data-testid="login-form-button-1"
								data-umami-event="Login Submitted"
							>
								<span className="absolute inset-y-0 left-0 flex items-center pl-3">
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

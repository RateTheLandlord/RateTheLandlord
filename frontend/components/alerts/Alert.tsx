import {CheckCircleIcon, XIcon, XCircleIcon} from '@heroicons/react/solid'
import {Dispatch, SetStateAction} from 'react'

interface IProps {
	success: boolean
	setAlertOpen: Dispatch<SetStateAction<boolean>>
}

const Alert = ({success, setAlertOpen}: IProps) => {
	console.log('Success: ', success)
	return (
		<div className="rounded-md bg-green-50 p-4">
			<div className="flex">
				<div className="flex-shrink-0">
					{success ? (
						<CheckCircleIcon
							className="h-5 w-5 text-green-400"
							aria-hidden="true"
						/>
					) : (
						<XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
					)}
				</div>
				<div className="ml-3">
					{success ? (
						<p className="text-sm font-medium text-green-800">Success!</p>
					) : (
						<p className="text-sm font-medium text-red-800">
							Failure: Something went wrong, please try again.
						</p>
					)}
				</div>
				<div className="ml-auto pl-3">
					<div className="-mx-1.5 -my-1.5">
						<button
							type="button"
							onClick={() => setAlertOpen((p) => !p)}
							className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
						>
							<span className="sr-only">Dismiss</span>
							<XIcon className="h-5 w-5" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Alert

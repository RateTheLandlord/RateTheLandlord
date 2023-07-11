import {XCircleIcon, XIcon} from '@heroicons/react/solid'
import {Dispatch, SetStateAction} from 'react'
import {useTranslation} from 'react-i18next'

interface IProps {
	setMaliciousAlertOpen: Dispatch<SetStateAction<boolean>>
}

const MaliciousStringAlert = ({setMaliciousAlertOpen}: IProps) => {
	const {t} = useTranslation('alerts')
	return (
		<div className="rounded-md bg-orange-200 p-4" data-testid="alert-1">
			<div className="flex">
				<div className="flex-shrink-0">
					<XCircleIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
				</div>
				<div className="ml-3">
					<p className="text-sm font-medium text-orange-700">
						{t('alerts.maliciousString')}
					</p>
				</div>
				<div className="ml-auto pl-3">
					<div className="-mx-1.5 -my-1.5">
						<button
							type="button"
							onClick={() => setMaliciousAlertOpen((p) => !p)}
							className="inline-flex rounded-md bg-orange-200 p-1.5 text-orange-600 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-orange-200"
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

export default MaliciousStringAlert
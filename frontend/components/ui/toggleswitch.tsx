import {Dispatch, SetStateAction} from 'react'
import {Switch} from '@headlessui/react'

interface IProps {
	enabled: boolean
	setEnabled: Dispatch<SetStateAction<boolean>>
}

function ToggleSwitch({enabled, setEnabled}: IProps) {
	return (
		<Switch
			checked={enabled}
			onChange={setEnabled}
			className={`${
				enabled ? 'bg-blue-600' : 'bg-gray-200'
			} relative inline-flex h-6 w-11 items-center rounded-full`}
		>
			<span className="sr-only" data-testid="toggle-switch-1">
				Enable
			</span>
			<span
				className={`${
					enabled ? 'translate-x-6' : 'translate-x-1'
				} inline-block h-4 w-4 transform rounded-full bg-white transition`}
			/>
		</Switch>
	)
}

export default ToggleSwitch
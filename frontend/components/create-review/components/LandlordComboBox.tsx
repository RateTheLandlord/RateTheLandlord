import React, {Fragment} from 'react'
import {Combobox, Transition} from '@headlessui/react'

interface ComponentProps {
	name: string
	state: string | undefined
	setState: (state: string) => void
	suggestions: string[]
	isSearching: boolean
}

export default function LandlordComboBox({
	name,
	state,
	setState,
	suggestions,
	isSearching,
}: ComponentProps) {
	return (
		<Combobox value={state} onChange={setState}>
			<div
				data-testid="create-review-form-landlord-1"
				className="relative w-full pt-2 lg:pt-0"
			>
				<label
					htmlFor="landlord"
					className="block text-sm font-medium text-gray-700"
				>
					{name}
				</label>
				<Combobox.Input
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					placeholder={`${name}`}
					displayValue={(state: string) => state}
					onChange={(event) => setState(event.target.value)}
				/>

				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Combobox.Options className="absolute z-10 mt-1 flex max-h-60 w-60 flex-col overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{suggestions.length === 0 && state !== '' ? (
							isSearching ? (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
									Loading...
								</div>
							) : (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
									Name Not Found
								</div>
							)
						) : (
							suggestions.map((landlord) => (
								<Combobox.Option
									key={landlord}
									className={({active}) =>
										`cursor-pointer rounded-md p-2 text-left hover:bg-teal-100 ${
											active ? 'bg-teal-200' : ''
										}`
									}
									value={landlord}
								>
									{landlord}
								</Combobox.Option>
							))
						)}
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	)
}

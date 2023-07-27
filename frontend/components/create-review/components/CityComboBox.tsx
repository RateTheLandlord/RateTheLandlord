/* eslint-disable no-mixed-spaces-and-tabs */
import React, {Fragment} from 'react'
import {Combobox, Transition} from '@headlessui/react'
import {ILocationHookResponse} from '@/util/interfaces/interfaces'

interface ComponentProps {
  name: string;
  state: string | undefined;
  setState: (state: string) => void;
  options: Array<ILocationHookResponse>;
  searching: boolean;
  error: boolean;
  errorText: string
}

export default function CityComboBox({
	state,
	setState,
	options,
	name,
	searching,
	error,
	errorText
}: ComponentProps) {
	const comboboxClassName = `mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${error ? 'border-red-400' : ''}`
	return (
		<Combobox value={state} onChange={setState}>
			<div
				data-testid="create-review-form-city-1"
				className="relative w-full pt-2 lg:pt-0"
			>
				<label
					htmlFor="city"
					className="block text-sm font-medium text-gray-700"
				>
					{name}
				</label>
				<Combobox.Input
					className={comboboxClassName}
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
						{options.length === 0 && state !== '' ? (
							searching ? (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
									Loading...
								</div>
							) : (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
									City Not Found
								</div>
							)
						) : (
							options.map((option) => (
								<Combobox.Option
									key={option.id}
                  className={({ active }) => 
                  `rounded-md text-left p-2 hover:bg-teal-100 cursor-pointer ${active ? 'bg-teal-200' : ''}`
                }
									value={option.city}
								>
									{option.city}
								</Combobox.Option>
							))
						)}
					</Combobox.Options>
				</Transition>
				{error ? (
					<p className="text-xs text-red-400">
						{errorText}
					</p>
				) : null}
			</div>
		</Combobox>
	)
}

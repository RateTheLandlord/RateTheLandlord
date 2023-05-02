import React, {Fragment} from 'react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import {Listbox, Transition} from '@headlessui/react'
import {Options} from '@/util/interfaces'
import { RowVirtualizerVariable } from '@/util/virtualizer'

interface ComponentProps {
	name: string
	state: Options | null
	setState: (state: Options) => void
	options: Options[]
}

export default function SelectList({
	state,
	setState,
	options,
	name,
}: ComponentProps) {
	return (
		<Listbox value={state} onChange={setState}>
			<div className="relative px-2">
				<Listbox.Button
					className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
					data-umami-event={`Select List Interaction for ${name}`}
				>
					<span className="block w-full truncate">{state?.name || name}</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
						<SelectorIcon
							className="h-5 w-5 text-gray-400"
							aria-hidden="true"
						/>
					</span>
				</Listbox.Button>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Listbox.Options className="absolute mt-1 max-h-60 w-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
					<RowVirtualizerVariable 
						rows={options ?? []} 
						state={state}
					/>
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	)
}

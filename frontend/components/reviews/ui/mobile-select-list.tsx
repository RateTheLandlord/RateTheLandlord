import {Fragment} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import {Options} from '@/util/interfaces'
import { RowVirtualizerVariable } from '@/util/virtualizer'

interface ComponentProps {
	name: string
	state: Options | null
	setState: (state: Options) => void
	options: Options[]
}

export default function MobileSelectList({
	state,
	setState,
	name,
	options,
}: ComponentProps) {
	return (
		<Listbox value={state} onChange={setState}>
			{({open}) => (
				<>
					<div className="relative w-full pt-2">
						<Listbox.Button
							className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
							data-umami-event={`Mobile Select Interaction for ${name}`}
						>
							<span className="block truncate">{state?.name || name}</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<SelectorIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							<RowVirtualizerVariable 
								rows={options ?? []} 
								state={state}
							/>
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	)
}

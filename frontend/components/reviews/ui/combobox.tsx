/* eslint-disable no-mixed-spaces-and-tabs */
import React, {Fragment, useRef, useState} from 'react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import {Combobox, Transition} from '@headlessui/react'
import {Options} from '@/util/interfaces'
import { useVirtualizer } from '@tanstack/react-virtual';

interface ComponentProps {
	name: string
	state: Options | null
	setState: (state: Options) => void
	options: Options[]
}

export default function ComboBox({
	state,
	setState,
	options,
	name,
}: ComponentProps) {
	const [query, setQuery] = useState('')

	console.log(options)
	console.log(state)

	const filterOptions =
		query === ''
			? options
			: options.filter((option) =>
					option.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, '')),
			  )
	return (
		<Combobox value={state} onChange={setState}>
			<div className="relative w-full pt-2 lg:px-2 lg:pt-0">
				<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
					<Combobox.Input
						className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
						data-umami-event={`Select List Interaction for ${name}`}
						displayValue={(state: Options) => state?.name}
						placeholder={`Search ${name}`}
						onChange={(event) => setQuery(event.target.value)}
					/>
					<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
						<SelectorIcon
							className="h-5 w-5 text-gray-400"
							aria-hidden="true"
						/>
					</Combobox.Button>
				</div>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{filterOptions.length === 0 && query !== '' ? (
							<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
								Nothing found.
							</div>
						) : (
							<VirtualizedList items={filterOptions ?? []} />
						)}
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	)
}


function VirtualizedList({ items }: { items: Options[] }) {
	const parentRef = useRef<HTMLDivElement>(null)

    const rowVirtualizer = useVirtualizer({
        count: items?.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 35,
        overscan: 5,
    });

    return (
        <div ref={parentRef}>
            <div
                style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                }}
            >
                {rowVirtualizer.getVirtualItems().map((virtualRow) => (
                    <Combobox.Option
                        key={virtualRow.index}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: `${virtualRow.size}px`,
                            transform: `translateY(${virtualRow.start}px)`,
                        }}
                        className={({ active }) =>
						`relative cursor-default select-none py-2 pl-10 pr-4 ${	active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                            }`
                        }
                        value={items?.[virtualRow.index]}
                    >
                        {({ selected, active }) => (
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                {items?.[virtualRow.index].name}
                            </span>
                        )}
                    </Combobox.Option>
                ))}
            </div>

        </div>
    );
}

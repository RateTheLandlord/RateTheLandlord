import React, {Fragment} from 'react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import {Listbox, Transition} from '@headlessui/react'
import {Options} from '@/util/interfaces'
import { useVirtualizer } from '@tanstack/react-virtual';


export function RowVirtualizerVariable({ rows, state }: {rows: Options[], state: Options | null}) {
    const parentRef = React.useRef()
  
    const rowVirtualizer = useVirtualizer({
      count: rows.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 35,
      overscan: 5,
    })
    return (
        rowVirtualizer.getVirtualItems().map((virtualRow: any) => (
            <Listbox.Option
                key={virtualRow.index}
                className={({active}) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                }
                value={rows?.[virtualRow.index]}
            >
                <span
                    className={`block truncate ${
                        rows?.[virtualRow.index].name === state?.name ? 'font-medium' : 'font-normal'
                    }`}
                >
                    {rows?.[virtualRow.index].name}
                </span>

                {rows?.[virtualRow.index].name === state?.name ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                ) : null}
            </Listbox.Option>
        ))
    )
  }
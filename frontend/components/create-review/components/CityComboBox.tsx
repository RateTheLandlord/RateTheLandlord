/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ILocationHookResponse } from "@/util/interfaces/interfaces";

interface ComponentProps {
  name: string;
  state: string | undefined;
  setState: (state: string) => void;
  options: Array<ILocationHookResponse>;
  searching: boolean;
}

export default function CityComboBox({
  state, setState, options, name, searching
}: ComponentProps) {
  return (<Combobox value={state} onChange={setState}>
    <div className="relative w-full pt-2 lg:pt-0">
      <label
        htmlFor="city"
        className="block text-sm font-medium text-gray-700"
      >
        {name}
      </label>
      <Combobox.Input
        className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder={`${name}`}
        displayValue={(state: ILocationHookResponse) => state.city}
        onChange={(event) => setState(event.target.value)}
      />

      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Combobox.Options
          className="absolute z-10 mt-1 max-h-60 w-60 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm flex flex-col">
          {options.length === 0 && state !== "" ? searching ? (<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
            Loading...
          </div>) : <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
            City Not Found
          </div> : (options.map(option => <Combobox.Option key={option.id} className="rounded-md text-left p-2 hover:bg-teal-100 cursor-pointer" value={option}>{option.city}</Combobox.Option>))}
        </Combobox.Options>
      </Transition>
    </div>
  </Combobox>);
}
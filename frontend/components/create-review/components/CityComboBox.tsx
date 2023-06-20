/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Fragment } from "react";
import { SelectorIcon } from "@heroicons/react/solid";
import { Combobox, Transition } from "@headlessui/react";
import { Options } from "@/util/interfaces/interfaces";

interface ComponentProps {
  name: string;
  state: string | undefined;
  setState: (state: string) => void;
  options: string[];
}

export default function CityComboBox({
  state, setState, options, name
}: ComponentProps) {
  return (<Combobox value={state} onChange={setState}>
      <div className="relative w-full pt-2 lg:px-2 lg:pt-0">
        <div
          className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            displayValue={(state: Options) => state?.name}
            placeholder={`Search ${name}`}
            onChange={(event) => setState(event.target.value)}
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
            {options.length === 0 && state !== "" ? (<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>) : (options.map(option => {
                return <p>{option}</p>;
              }))}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>);
}
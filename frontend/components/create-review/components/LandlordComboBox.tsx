import React, { Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';

interface ComponentProps {
    name: string;
  state: string | undefined;
  setState: (state: string) => void;
  suggestions: string[];
  isSearching: boolean;
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
      {/* Render your UI component here */}
    </Combobox>
  );
}

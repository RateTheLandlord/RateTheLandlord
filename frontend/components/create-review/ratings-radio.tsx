import React from 'react'
import {Disclosure, RadioGroup} from '@headlessui/react'
import {classNames} from '@/util/helper-functions'
import {useTranslation} from 'react-i18next'
import {MinusSmIcon, PlusSmIcon} from '@heroicons/react/solid'

const ratings = [1, 2, 3, 4, 5]

interface Props {
	title: string
	rating: number
	setRating: React.Dispatch<React.SetStateAction<number>>
	tooltip: string
}

function RatingsRadio({title, rating, setRating, tooltip}: Props) {
	const {t} = useTranslation()

	return (
		<div className="container">
			<Disclosure>
				{({open}) => (
					<>
						<Disclosure.Button className="flex w-full items-start text-left text-gray-900">
							<span className="ml-6 flex h-7 items-center">
								{open ? (
									<MinusSmIcon className="h-6 w-6" aria-hidden="true" />
								) : (
									<PlusSmIcon className="h-6 w-6" aria-hidden="true" />
								)}
							</span>
							<span className="text-base font-semibold leading-7">{title}</span>
						</Disclosure.Button>
						<Disclosure.Panel as="dd" className="mt-2 pr-12">
							<p className="text-base leading-7 text-gray-600">{tooltip}</p>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>

			<RadioGroup value={rating} onChange={setRating} className="mt-2">
				<RadioGroup.Label className="sr-only">
					{t('create-review.review-radio.choose')}
				</RadioGroup.Label>
				<div className="grid gap-2 sm:gap-3 grid-cols-5">
					{ratings.map((option) => (
						<RadioGroup.Option
							key={option}
							value={option}
							className={({active, checked}) =>
								classNames(
									active ? 'ring-2 ring-offset-2 ring-teal-500' : '',
									checked
										? 'bg-teal-600 border-transparent text-white hover:bg-teal-700'
										: 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
									'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1',
								)
							}
						>
							<RadioGroup.Label as="span">{option}</RadioGroup.Label>
						</RadioGroup.Option>
					))}
				</div>
			</RadioGroup>
		</div>
	)
}

export default RatingsRadio

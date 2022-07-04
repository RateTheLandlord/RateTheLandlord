import React from 'react'
import {RadioGroup} from '@headlessui/react'

const ratings = [1, 2, 3, 4, 5]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

interface Props {
	title: string
	rating: number
	setRating: React.Dispatch<React.SetStateAction<number>>
}

function RatingsRadio({title, rating, setRating}: Props) {
	return (
		<div>
			<div className="flex items-center justify-between">
				<h2 className="text-sm font-medium text-gray-900">{title} Rating</h2>
			</div>

			<RadioGroup value={rating} onChange={setRating} className="mt-2">
				<RadioGroup.Label className="sr-only">Choose a rating</RadioGroup.Label>
				<div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
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

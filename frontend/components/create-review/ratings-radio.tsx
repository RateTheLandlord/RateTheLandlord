import React from 'react'
import {RadioGroup} from '@headlessui/react'
import {classNames} from '@/util/helpers/helper-functions'
import {useTranslation} from 'react-i18next'

const ratings = [1, 2, 3, 4, 5]

interface Props {
	title: string
	rating: number
	setRating: React.Dispatch<React.SetStateAction<number>>
	tooltip: string
}

function RatingsRadio({title, rating, setRating, tooltip}: Props) {
	const {t} = useTranslation('create')

	return (
		<div data-testid="ratings-radio-1">
			<h2 className="font-medium text-gray-900">
				{title} {t('create-review.review-radio.rating')}
			</h2>
			<p className="text-xs text-gray-500">{tooltip}</p>

			<RadioGroup value={rating} onChange={setRating} className="mt-2">
				<RadioGroup.Label className="sr-only">
					{t('create-review.review-radio.choose')}
				</RadioGroup.Label>
				<div className="grid grid-cols-5 gap-2 sm:gap-3">
					{ratings.map((option) => (
						<RadioGroup.Option
							key={option}
							value={option}
							className={({active, checked}) =>
								classNames(
									active ? 'ring-2 ring-teal-500 ring-offset-2' : '',
									checked
										? 'border-transparent bg-teal-600 text-white hover:bg-teal-700'
										: 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
									'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1',
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

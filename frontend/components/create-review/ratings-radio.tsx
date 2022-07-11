import React from 'react'
import {RadioGroup} from '@headlessui/react'
import {classNames} from '@/util/classnames'
import {useTranslations} from 'next-intl'

const ratings = [1, 2, 3, 4, 5]

interface Props {
	title: string
	rating: number
	setRating: React.Dispatch<React.SetStateAction<number>>
	body: string
}

function RatingsRadio({title, rating, setRating, body}: Props) {
	const t = useTranslations('Radio')
	return (
		<div>
			<div className="">
				<h2 className="font-medium text-gray-900">
					{title} {t('Rating')}
				</h2>
				<p className="mt-1 text-sm text-gray-500">{body}</p>
			</div>

			<RadioGroup value={rating} onChange={setRating} className="mt-2">
				<RadioGroup.Label className="sr-only">{t('Choose')}</RadioGroup.Label>
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

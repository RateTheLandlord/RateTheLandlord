import {classNames} from '@/util/helpers/helper-functions'
import {MinusSmIcon, PlusSmIcon, StarIcon} from '@heroicons/react/solid'
import Link from 'next/link'
import {Disclosure} from '@headlessui/react'

interface IProps {
	name: string
	average: number
	total: number
}

const LandlordInfo = ({name, average, total}: IProps) => {
	return (
		<div className="w-full border-b border-b-gray-200 pb-4">
			<h2 className="text-2xl font-bold tracking-tight text-gray-900">
				{name}
			</h2>

			<div className="mt-3 flex items-center">
				<div>
					<div className="flex items-center">
						{[0, 1, 2, 3, 4].map((rating) => (
							<StarIcon
								key={rating}
								className={classNames(
									average > rating ? 'text-yellow-400' : 'text-gray-300',
									'h-5 w-5 flex-shrink-0',
								)}
								aria-hidden="true"
							/>
						))}
					</div>
					<p className="sr-only">{average} out of 5 stars</p>
				</div>
				<p className="ml-2 text-sm text-gray-900">Based on {total} reviews</p>
			</div>

			<div>
				<h3 className="text-lg font-medium text-gray-900">
					Share your thoughts
				</h3>
				<p className="mt-1 text-sm text-gray-600">
					If you&apos;ve rented from this Landlord, share your experience with
					other tenants
				</p>

				<Link href="/create-review">
					<p className="mt-2 inline-flex cursor-pointer items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
						Submit a review
					</p>
				</Link>
			</div>
			<div className="mt-4 divide-gray-900/10 border-t">
				<Disclosure as="div" className="py-3">
					{({open}) => (
						<>
							<dt>
								<Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
									<span className="text-base font-semibold leading-7">
										Tenants Guide to Reviews
									</span>
									<span className="ml-6 flex h-7 items-center">
										{open ? (
											<MinusSmIcon className="h-6 w-6" aria-hidden="true" />
										) : (
											<PlusSmIcon className="h-6 w-6" aria-hidden="true" />
										)}
									</span>
								</Disclosure.Button>
							</dt>
							<Disclosure.Panel as="dd" className="mt-2 pr-12 pl-4">
								<ol className="list-decimal">
									<li className="list-item text-base leading-7 text-gray-600">
										Look for Specific Details: Genuine reviews often contain
										specific details about the tenant&apos;s experience with the
										landlord. Vague praises, promotional language, or
										meaningless criticisms might be less trustworthy.
									</li>
									<li className="list-item text-base leading-7 text-gray-600">
										Balance of Reviews: If a negative review is suddenly
										followed by a highly positive one, take a moment to question
										this. It&apos;s possible for a landlord/company to have both
										good and bad traits, but drastic shifts in tone might
										indicate something is amiss.
									</li>
									<li className="list-item text-base leading-7 text-gray-600">
										Frequency of Reviews: A sudden influx of positive reviews
										after a string of negative ones might be a red flag.
										Authentic reviews tend to come in at a steady pace over
										time.
									</li>
									<li className="list-item text-base leading-7 text-gray-600">
										Consistency: Look for consistency in feedback across
										reviews. If several reviews mention similar pros or cons,
										they are likely reliable.
									</li>
								</ol>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
		</div>
	)
}

export default LandlordInfo
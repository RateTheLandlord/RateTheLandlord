import {Disclosure} from '@headlessui/react'
import {MinusSmIcon, PlusSmIcon} from '@heroicons/react/solid'

const faqs = [
	{
		question: 'What does Repairs mean for the reviews?',
		answer:
			'Landlords have a legal obligation to keep the rental property in a safe and habitable condition. Tenants should receive timely repairs by trained professionals to keep their vital systems like plumbing and heating in order.',
	},
	{
		question: 'What does Rental Stability mean for the reviews?',
		answer:
			"Landlords must abide by rental agreements and not engage in practices that would disrupt the tenant's rental stability, such as unjustified rent increases or arbitrary evictions.",
	},
	{
		question: 'What does Tenant Privacy mean for the reviews?',
		answer:
			"Landlords must respect their tenants' privacy, and may only enter the rental property with the tenant's consent or for specific reasons outlined in the rental agreement. Landlords should also refrain from probing into the personal lives of their tenants or asking for information that is not necessary to form a professional rental agreement.",
	},
	{
		question: 'What does Respect mean for the reviews?',
		answer:
			"Landlords must treat their tenants with respect, and must not engage in behavior that would violate the tenant's rights, such as discrimination or harassment.",
	},
	{
		question: 'What does Health and Safety mean for the reviews?',
		answer:
			'Landlords must ensure that the rental property complies with local health and safety standards, such as maintaining smoke detectors, removing mold, and employing pest control when necessary.',
	},
]

const Faq = () => {
	return (
		<div className="bg-white w-full" data-testid="about-faq-1">
			<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8">
				<div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
					<h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
						Frequently asked questions
					</h2>
					<dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
						{faqs.map((faq) => (
							<Disclosure as="div" key={faq.question} className="pt-6">
								{({open}) => (
									<>
										<dt>
											<Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
												<span className="text-base font-semibold leading-7">
													{faq.question}
												</span>
												<span className="ml-6 flex h-7 items-center">
													{open ? (
														<MinusSmIcon
															className="h-6 w-6"
															aria-hidden="true"
														/>
													) : (
														<PlusSmIcon
															className="h-6 w-6"
															aria-hidden="true"
														/>
													)}
												</span>
											</Disclosure.Button>
										</dt>
										<Disclosure.Panel as="dd" className="mt-2 pr-12">
											<p className="text-base leading-7 text-gray-600">
												{faq.answer}
											</p>
										</Disclosure.Panel>
									</>
								)}
							</Disclosure>
						))}
					</dl>
				</div>
			</div>
		</div>
	)
}

export default Faq

import {Disclosure} from '@headlessui/react'
import {MinusSmIcon, PlusSmIcon} from '@heroicons/react/solid'
import {useTranslation} from 'react-i18next'

const Faq = () => {
	const {t} = useTranslation('about')
	const faqs = [
		{
			question: t('about.faq.anonymous'),
			answer: t('about.faq.anonymous_description'),
		},
		{
			question: t('about.faq.fair'),
			answer: t('about.faq.fair_description'),
		},
		{
			question: t('about.faq.help'),
			answer: t('about.faq.help_description'),
		},
		{
			question: t('about.faq.dishonest'),
			answer: t('about.faq.dishonest_description'),
		},
		{
			question: t('about.faq.names'),
			answer: t('about.faq.names_description'),
		},
	]
	return (
		<div className="w-full bg-white" data-testid="about-faq-1">
			<div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
				<div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
					<h2 className="mt-2 block text-center text-xl font-bold leading-8 tracking-tight text-gray-900 sm:text-2xl">
						{t('about.faq.faq')}
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

import React from 'react'
import {useTranslation} from 'react-i18next'
import Privacy from '../svg/icons/privacy'

export default function IconSection() {
	const {t} = useTranslation()
	return (
		<div className="bg-white min-w-full">
			<div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
				<div className="bg-gray-50 rounded-3xl px-6 py-16 sm:p-16">
					<div className="max-w-xl mx-auto lg:max-w-none">
						<div className="text-center">
							<h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
								{t('home.icon.title')}
							</h2>
						</div>
						<div className="mt-12 max-w-sm mx-auto grid grid-cols-1 gap-y-10 gap-x-8 sm:max-w-none lg:grid-cols-3">
							<div className="text-center sm:flex sm:text-left lg:block lg:text-center">
								<div className="sm:flex-shrink-0 flex justify-center ">
									<div className="flow-root">
										<Privacy styling='className="w-16 h-16 mx-auto text-teal-600' />
									</div>
								</div>
								<div className="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
									<h3 className="text-2xl font-extrabold text-gray-900">
										{t('home.icon.anonymity')}
									</h3>
									<p className="mt-2 text-sm text-gray-900">
										{t('home.icon.anon-sub')}
									</p>
								</div>
							</div>
							<div className="text-center sm:flex sm:text-left lg:block lg:text-center">
								<div className="sm:flex-shrink-0">
									<div className="flow-root">
										<Privacy styling='className="w-16 h-16 mx-auto text-teal-600' />
									</div>
								</div>
								<div className="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
									<h3 className="text-2xl font-extrabold text-gray-900">
										{t('home.icon.solidarity')}
									</h3>
									<p className="mt-2 text-sm text-gray-900">
										{t('home.icon.sol-sub')}
									</p>
								</div>
							</div>
							<div className="text-center sm:flex sm:text-left lg:block lg:text-center">
								<div className="sm:flex-shrink-0">
									<div className="flow-root">
										<Privacy styling='className="w-16 h-16 mx-auto text-teal-600' />
									</div>
								</div>
								<div className="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
									<h3 className="text-2xl font-extrabold text-gray-900">
										{t('home.icon.transparency')}
									</h3>
									<p className="mt-2 text-sm text-gray-900">
										{t('home.icon.trans-sub')}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

import React from 'react'
import Privacy from '../svg/privacy'

export default function IconSection() {
	return (
		<div className="bg-white min-w-full">
			<div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
				<div className="bg-gray-50 rounded-2xl px-6 py-16 sm:p-16">
					<div className="max-w-xl mx-auto lg:max-w-none">
						<div className="text-center">
							<h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
								Help Keep Landlords Accountable
							</h2>
						</div>
						<div className="mt-12 max-w-sm mx-auto grid grid-cols-1 gap-y-10 gap-x-8 sm:max-w-none lg:grid-cols-3">
							<div className="text-center sm:flex sm:text-left lg:block lg:text-center">
								<div className="sm:flex-shrink-0 flex justify-center">
									<div className="flow-root">
										<Privacy styling='className="w-16 h-16 mx-auto"' />
									</div>
								</div>
								<div className="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
									<h3 className="text-sm font-medium text-gray-900">
										Anonymity
									</h3>
									<p className="mt-2 text-sm text-gray-500">
										Share your rental experience with confidence.
									</p>
								</div>
							</div>
							<div className="text-center sm:flex sm:text-left lg:block lg:text-center">
								<div className="sm:flex-shrink-0">
									<div className="flow-root">
										<Privacy />
									</div>
								</div>
								<div className="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
									<h3 className="text-sm font-medium text-gray-900">
										Solidarity
									</h3>
									<p className="mt-2 text-sm text-gray-500">
										Join fellow Tenants by creating an informed community.
									</p>
								</div>
							</div>
							<div className="text-center sm:flex sm:text-left lg:block lg:text-center">
								<div className="sm:flex-shrink-0">
									<div className="flow-root">
										<Privacy />
									</div>
								</div>
								<div className="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
									<h3 className="text-sm font-medium text-gray-900">
										Transparency
									</h3>
									<p className="mt-2 text-sm text-gray-500">
										Empower others to make decisions about housing.
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

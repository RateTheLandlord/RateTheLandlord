//This component will be for the Home page. It's layout will be determined by the Figma design

function Hero(): JSX.Element {
	return (
		<div className="relative min-w-full">
			<div className="relative pt-6 pb-16 sm:pb-24">
				<main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
					<div className="text-center">
						<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
							<span className="block text-teal-600 xl:inline">
								Share Information with Tenants Like You
							</span>
						</h1>
						<p className="mt-3 max-w-md mx-auto text-base  sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
							We are a community-driven platform that aims to elevate tenant
							voices and promote landlord accountability.
						</p>
						<div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
							<div className="rounded-md shadow">
								<a
									href="#"
									className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-lg md:px-10"
								>
									Submit Review
								</a>
							</div>
							<div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
								<a
									href="#"
									className="w-full flex items-center justify-center px-8 py-3 border border-teal-600 text-base font-medium rounded-md text-teal-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
								>
									Read Reviews
								</a>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}

export default Hero

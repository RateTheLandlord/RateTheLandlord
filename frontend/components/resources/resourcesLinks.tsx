import {resource_links} from './links'

const links = resource_links

const countries = ['Canada', 'United States', 'United Kingdom', 'Australia']

const ResourceTenantLinks = () => {
	return (
		<div
			data-testid="about-ResourceTenantLinks-1"
			className="flex w-full flex-col gap-4 bg-white"
		>
			{countries.map((country) => {
				return (
					<div
						key={country}
						className="mx-auto mt-4 flex max-w-7xl flex-row flex-wrap justify-center gap-4 px-6 text-lg lg:px-8"
					>
						<h3 className="mt-2 block w-full text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
							{country}
						</h3>
						{links.map((link) => {
							return link.country === country ? (
								<a
									data-umami-event={`Resource - ${link.name}`}
									href={link.link}
									key={link.name}
									className="w-full cursor-pointer rounded-lg bg-white px-4 py-5 text-center text-black shadow hover:bg-teal-600 hover:text-white sm:p-6 lg:w-auto lg:text-left"
								>
									<p className="mt-1 text-xl md:text-3xl font-semibold tracking-tight">
										{link.name}
									</p>
									{link.country === link.city ? (
										<p className="truncate text-center text-sm font-medium">
											{link.country}
										</p>
									) : (
										<p className="truncate text-center text-sm font-medium">
											{link.city}, {link.country}
										</p>
									)}
								</a>
							) : null
						})}
					</div>
				)
			})}
		</div>
	)
}

export default ResourceTenantLinks

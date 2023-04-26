import {resource_links} from './links'

const links = resource_links

const canadaLinks = links.filter((link) => link.country === 'Canada')
const usLinks = links.filter((link) => link.country === 'United States')
const ukLinks = links.filter((link) => link.country === 'United Kingdom')
const australiaLinks = links.filter((link) => link.country === 'Australia')

const ResourceTenantLinks = () => {
	return (
		<div data-testid="about-ResourceTenantLinks-1" className="w-full bg-white">
			<div className="mx-auto flex max-w-7xl flex-row flex-wrap gap-4 px-6 text-lg lg:px-8">
				<h3>Canada</h3>
				{canadaLinks.map((link) => {
					return (
						<a
							href={link.link}
							key={link.name}
							className="rounded-lg bg-white px-4 py-5 shadow sm:p-6"
						>
							<p className="truncate text-sm font-medium text-gray-500">
								{link.country}
							</p>
							<p className="truncate text-sm font-medium text-gray-500">
								{link.city}
							</p>
							<p className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
								{link.name}
							</p>
						</a>
					)
				})}
			</div>
		</div>
	)
}

export default ResourceTenantLinks

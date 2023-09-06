/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render} from '@testing-library/react'
import {Disclosure} from '@headlessui/react'
import MobileNav from './MobileNav'
import {INav} from '@/util/interfaces/interfaces'

describe('MobileNav', () => {
	const navigation: Array<INav> = [
		{
			href: '/reviews',
			name: 'layout.nav.reviews',
			umami: 'Navbar / Reviews Link',
			mobileumami: 'Mobile Navbar / Reviews Link',
		},
		{
			href: '/resources',
			name: 'layout.nav.resources',
			umami: 'Navbar / Resources Link',
			mobileumami: 'Mobile Navbar / Resources Link',
		},
		{
			href: '/about',
			name: 'layout.nav.about',
			umami: 'Navbar / About Link',
			mobileumami: 'Mobile Navbar / About Link',
		},
	]

	it('renders MobileNav component correctly', () => {
		render(
			<Disclosure>
				<MobileNav
					navigation={navigation}
					activeTab="/"
					maintenanceMode={false}
				/>
			</Disclosure>,
		)
	})
})
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
			umami: 'mobile navbar reviews link',
			mobileumami: 'mobile navbar reviews link',
		},
		{
			href: '/resources',
			name: 'layout.nav.resources',
			umami: 'mobile navbar resources link',
			mobileumami: 'mobile navbar resources link',
		},
		{
			href: '/about',
			name: 'layout.nav.about',
			umami: 'mobile navbar about link',
			mobileumami: 'mobile navbar about link',
		},
	]

	it('renders MobileNav component correctly', () => {
		render(
			<Disclosure>
				<MobileNav navigation={navigation} activeTab="/" />
			</Disclosure>,
		)
	})
})
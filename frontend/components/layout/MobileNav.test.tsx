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
		},
		{
			href: '/resources',
			name: 'layout.nav.resources',
		},
		{
			href: '/about',
			name: 'layout.nav.about',
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
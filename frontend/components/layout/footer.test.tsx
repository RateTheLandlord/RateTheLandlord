/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, screen} from '@testing-library/react'
import Footer from './footer'

describe('Footer', () => {
	test('renders the footer links', () => {
		render(<Footer />)

		const instagramLink = screen.getByRole('link', {name: 'Instagram'})
		expect(instagramLink).toBeInTheDocument()
		expect(instagramLink).toHaveAttribute(
			'href',
			'https://www.instagram.com/ratethelandlord',
		)

		const twitterLink = screen.getByRole('link', {name: 'Twitter'})
		expect(twitterLink).toBeInTheDocument()
		expect(twitterLink).toHaveAttribute(
			'href',
			'https://twitter.com/r8thelandlord',
		)

		const tiktokLink = screen.getByRole('link', {name: 'TikTok'})
		expect(tiktokLink).toBeInTheDocument()
		expect(tiktokLink).toHaveAttribute(
			'href',
			'https://www.tiktok.com/@ratethelandlord',
		)

		const githubLink = screen.getByRole('link', {name: 'Github'})
		expect(githubLink).toBeInTheDocument()
		expect(githubLink).toHaveAttribute(
			'href',
			'https://github.com/RateTheLandlord',
		)
	})
})

/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, screen} from '@testing-library/react'
import ResourcesInfo from './resourcesInfo'

jest.mock('react-i18next', () => ({
	useTranslation: jest.fn().mockReturnValue({t: jest.fn()}),
}))

describe('ResourcesInfo', () => {
	it('renders ResourcesInfo component correctly', () => {
		const mockT = jest.fn()
		const mockInfo = ['Info 1', 'Info 2']

		// Mock t function to return translated strings
		mockT.mockImplementation((key) => {
			if (key === 'title') return 'Resources Title'
			if (key === 'description') return 'Resources Description'
			if (key === 'info') return mockInfo
			return ''
		})

		render(<ResourcesInfo />)

		// Verify that the title is rendered
		const title = screen.getByText('Resources Title')
		expect(title).toBeInTheDocument()

		// Verify that the description is rendered
		const description = screen.getByText('Resources Description')
		expect(description).toBeInTheDocument()

		// Verify that the info items are rendered
		mockInfo.forEach((item) => {
			const infoItem = screen.getByText(item)
			expect(infoItem).toBeInTheDocument()
		})
	})
})
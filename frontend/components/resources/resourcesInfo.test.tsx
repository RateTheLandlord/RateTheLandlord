/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, screen} from '@testing-library/react'
import ResourcesInfo from './resourcesInfo'

jest.mock('react-i18next', () => ({
	useTranslation: jest.fn().mockReturnValue({
		t: jest.fn().mockImplementation((key) => {
			if (key === 'resources.title') {
				return 'Resources'
			} else if (key === 'resources.info') {
				return ['Info 1', 'Info 2', 'Info 3']
			}
		}),
	}),
}))

describe('ResourcesInfo', () => {
	it('renders ResourcesInfo component correctly', () => {
		render(<ResourcesInfo />)

		// Verify that the title is rendered
		const title = screen.getByText('Resources')
		expect(title).toBeInTheDocument()
	})
})
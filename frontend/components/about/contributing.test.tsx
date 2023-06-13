/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, RenderResult} from '@testing-library/react'
import {useTranslation} from 'react-i18next'
import Contributing from './contributing'

jest.mock('react-i18next')

describe('Contributing', () => {
	let renderResult: RenderResult

	beforeEach(() => {
		const tMock = jest.fn((key: string) => key)
		;(useTranslation as jest.Mock).mockReturnValue({t: tMock})

		renderResult = render(<Contributing />)
	})

	test('renders the component with translated content', () => {
		const {getByTestId, getByText} = renderResult

		// Check if the component renders correctly
		const contributingElement = getByTestId('about-contributing-1')
		expect(contributingElement).toBeInTheDocument()

		// Check if the contributing title is displayed correctly
		const titleElement = getByText('about.contributing.contributing')
		expect(titleElement).toBeInTheDocument()

		// Check if the contributing paragraph is displayed correctly
		const paragraphElement = getByText('about.contributing.info')
		expect(paragraphElement).toBeInTheDocument()
	})

	// Add more test cases as needed
})
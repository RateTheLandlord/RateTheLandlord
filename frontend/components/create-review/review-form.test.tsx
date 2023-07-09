/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import ReviewForm from './review-form'

beforeEach(() => {
	const mockIntersectionObserver = jest.fn()
	mockIntersectionObserver.mockReturnValue({
		observe: jest.fn().mockReturnValue(null),
		unobserve: jest.fn().mockReturnValue(null),
		disconnect: jest.fn().mockReturnValue(null),
	})
	window.IntersectionObserver = mockIntersectionObserver
})

test('Review Form component renders all fields', () => {
	const result = render(<ReviewForm />)

	expect(result.getByTestId('create-review-form-1')).toBeInTheDocument()
	expect(
		result.getByTestId('create-review-form-landlord-1'),
	).toBeInTheDocument()
	expect(result.getByTestId('create-review-form-city-1')).toBeInTheDocument()
	expect(
		result.getByTestId('create-review-form-postal-code-1'),
	).toBeInTheDocument()
	expect(result.getByTestId('create-review-form-text-1')).toBeInTheDocument()
	expect(result.getByTestId('create-review-form-captcha-1')).toBeInTheDocument()
	expect(
		result.getByTestId('create-review-form-submit-button-1'),
	).toBeInTheDocument()
})

test('Postal Code input shows/hides error message correctly', async () => {
	const result = render(<ReviewForm />)
	const errorMessage = 'Error. Postal Code / ZIP Invalid'

	// enter an invalid postal code
	const postalCodeInput = result.getByTestId('create-review-form-postal-code-1')
	fireEvent.change(postalCodeInput, {target: {value: 'invalid postal code'}})
	const errorElement = await result.findByText(errorMessage)
	expect(errorElement).toBeInTheDocument()

	// enter a valid postal code
	fireEvent.change(postalCodeInput, {target: {value: 'V2C 1S8'}})
	expect(result.container).not.toHaveTextContent(errorMessage)
})

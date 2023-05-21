/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render} from '@testing-library/react'
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
const result = render(<ReviewForm />)
test('Review Form component renders all fields', () => {
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

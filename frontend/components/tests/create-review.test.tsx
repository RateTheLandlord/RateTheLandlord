/**
 * @jest-environment jsdom
 */
import {render} from '@testing-library/react'
import React from 'react'

// import Faq from '@/components/about/faq'
import ReviewForm from '@/components/create-review/review-form'
import SuccessModal from '../create-review/success-modal'
import RatingsRadio from '../create-review/ratings-radio'

describe('Review Form Tests ', () => {
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
		expect(
			result.getByTestId('create-review-form-captcha-1'),
		).toBeInTheDocument()
		expect(
			result.getByTestId('create-review-form-submit-button-1'),
		).toBeInTheDocument()
	})

	test('Success modal renders', () => {
		const modal = render(<SuccessModal isOpen={true} setIsOpen={jest.fn()} />)
		expect(modal.getByTestId('success-modal-1')).toBeInTheDocument()
	})
	test('Ratings radio renders', () => {
		const radio = render(
			<RatingsRadio
				title={''}
				rating={0}
				setRating={jest.fn()}
				tooltip="test"
			/>,
		)
		expect(radio.getByTestId('ratings-radio-1')).toBeInTheDocument()
	})
})

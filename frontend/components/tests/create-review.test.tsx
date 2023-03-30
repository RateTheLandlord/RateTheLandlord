/**
 * @jest-environment jsdom
 */
import {render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
	test('Review Form is interactive', async () => {
		// TODO: Test form submission
		const result = render(<ReviewForm />)
		const user = userEvent.setup()
		await user.click(result.getByTestId('create-review-form-landlord-1'))
		await user.keyboard('Test Landlord Enteprises')
		await user.click(result.getByTestId('create-review-form-city-1'))
		await user.keyboard('Calgary')
		await user.click(result.getByTestId('create-review-form-postal-code-1'))
		await user.keyboard('T1T 1T1')
		await user.click(result.getByTestId('create-review-form-text-1'))
		await user.keyboard('Test Written Review')
		await waitFor(() =>
			expect(
				result.getByTestId('create-review-form-captcha-1'),
			).toBeInTheDocument(),
		)
		await waitFor(() =>
			user.click(result.getByTestId('create-review-form-captcha-1')),
		)
		await waitFor(() => user.click(result.getByTestId('submit-button-1')))
		expect(result).toMatchSnapshot()
		//TODO: expect(mockButtonSpy).toHaveBeenCalled();
	})

	test('Success modal renders', () => {
		const modal = render(<SuccessModal isOpen={true} setIsOpen={jest.fn()} />)
		expect(modal.getByTestId('success-modal-1')).toBeInTheDocument()
		expect(modal.getByTestId('success-modal-2')).toBeInTheDocument()
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

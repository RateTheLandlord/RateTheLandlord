/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import AddReviewModal from './add-review-modal'

jest.mock('react-i18next', () => ({
	useTranslation: jest.fn().mockReturnValue({
		t: jest.fn((key) => {
			if (key === 'create-review.modal.add-review') {
				return 'Add Review'
			}
			if (key === 'create-review.modal.add-review-desc') {
				return 'Please provide your review.'
			}
			if (key === 'create-review.modal.close') {
				return 'Close'
			}
			return ''
		}),
	}),
}))

describe('AddReviewModal component', () => {
	test('should render the modal when isOpen is true', () => {
		const setIsOpenMock = jest.fn()

		render(<AddReviewModal isOpen={true} setIsOpen={setIsOpenMock} />)

		// Verify that the modal is rendered
		const modalElement = screen.getByRole('dialog')
		expect(modalElement).toBeInTheDocument()

		// Verify that the modal title and description are displayed correctly
		expect(screen.getByText('Add Review')).toBeInTheDocument()
		expect(screen.getByText('Please provide your review.')).toBeInTheDocument()

		// Verify that the close button is rendered
		const closeButton = screen.getByText('Close')
		expect(closeButton).toBeInTheDocument()

		// Simulate clicking the close button
		fireEvent.click(closeButton)

		// Verify that the setIsOpen function is called with false when the close button is clicked
		expect(setIsOpenMock).toHaveBeenCalledWith(false)
	})

	test('should not render the modal when isOpen is false', () => {
		const setIsOpenMock = jest.fn()

		render(<AddReviewModal isOpen={false} setIsOpen={setIsOpenMock} />)

		// Verify that the modal is not rendered
		const modalElement = screen.queryByRole('dialog')
		expect(modalElement).toBeNull()

		// Verify that the setIsOpen function is not called when the component is not rendered
		expect(setIsOpenMock).not.toHaveBeenCalled()
	})

	// Add more tests as needed for other functionality in the component
})

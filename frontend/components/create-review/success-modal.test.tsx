/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, screen} from '@testing-library/react'
import SuccessModal from './success-modal'

jest.mock('next/router', () => require('next-router-mock'))

describe('SuccessModal', () => {
	test('renders', () => {
		const isOpen = true
		const setIsOpen = jest.fn()

		render(<SuccessModal isOpen={isOpen} setIsOpen={setIsOpen} />)

		// Check if the success modal is rendered
		const successModalElement = screen.getByTestId('success-modal-1')
		expect(successModalElement).toBeInTheDocument()

		// Check if the success modal content is rendered
		const successModalContent = screen.getByTestId('success-modal-2')
		expect(successModalContent).toBeInTheDocument()
	})
})
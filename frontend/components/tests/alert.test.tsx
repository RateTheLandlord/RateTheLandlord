/**
 * @jest-environment jsdom
 */
import {render, fireEvent, screen} from '@testing-library/react'
import Alert from '@/components/alerts/Alert'

describe('Alert Component', () => {
	test('renders success alert', () => {
		const mockSetAlertOpen = jest.fn()

		render(<Alert success={true} setAlertOpen={mockSetAlertOpen} />)
		expect(screen.getByText('Success!')).toBeInTheDocument()
		expect(screen.getByRole('button')).toBeInTheDocument()
	})

	test('renders failure alert', () => {
		const mockSetAlertOpen = jest.fn()

		render(<Alert success={false} setAlertOpen={mockSetAlertOpen} />)
		expect(
			screen.getByText('Failure: Something went wrong, please try again.'),
		).toBeInTheDocument()
		expect(screen.getByRole('button')).toBeInTheDocument()
	})

	test('calls setAlertOpen on dismiss button click', () => {
		const mockSetAlertOpen = jest.fn()

		render(<Alert success={true} setAlertOpen={mockSetAlertOpen} />)
		fireEvent.click(screen.getByRole('button'))

		expect(mockSetAlertOpen).toHaveBeenCalled()
		expect(mockSetAlertOpen).toHaveBeenCalledWith(expect.any(Function))
	})
})

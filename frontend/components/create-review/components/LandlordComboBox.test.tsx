/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import LandlordComboBox from './LandlordComboBox'

interface RenderComponentProps {
	state: string | undefined
	setState: (state: string) => void
	suggestions: string[]
	isSearching: boolean
}

describe('LandlordComboBox', () => {
	const suggestions = ['Daniel White', 'David Johnson', 'Michael Davis']

	const handleChange = jest.fn()

	const renderComponent = ({
		state,
		setState,
		suggestions,
		isSearching,
	}: RenderComponentProps) => {
		return render(
			<LandlordComboBox
				name="Landlord Name (or Property Management Company) - No Addresses"
				state={state}
				setState={setState}
				suggestions={suggestions}
				isSearching={isSearching}
			/>,
		)
	}

	test('renders component with label and placeholder', () => {
		renderComponent({
			state: '',
			setState: handleChange,
			suggestions: suggestions,
			isSearching: false,
		})

		const labelElement = screen.getByText('Landlord Name (or Property Management Company) - No Addresses')
		const inputElement = screen.getByPlaceholderText('Landlord Name (or Property Management Company) - No Addresses')

		expect(labelElement).toBeInTheDocument()
		expect(inputElement).toBeInTheDocument()
	})

	test('shows dropdown options when name matches and selects the first option on Enter', async () => {
		renderComponent({
			state: '',
			setState: handleChange,
			suggestions: suggestions,
			isSearching: false,
		})

		const inputElement = screen.getByPlaceholderText('Landlord Name (or Property Management Company) - No Addresses')
		fireEvent.change(inputElement, {target: {value: 'Da'}})

		await waitFor(() => {
			expect(screen.getByText('Daniel White')).toBeInTheDocument()
			expect(screen.getByText('David Johnson')).toBeInTheDocument()
			expect(screen.getByText('Michael Davis')).toBeInTheDocument()
		})

		fireEvent.keyDown(inputElement, {key: 'Enter', code: 'Enter'})
		expect(handleChange).toHaveBeenCalledWith('Daniel White')
	})

	test('highlights the selected name in dropdown on ArrowDown', async () => {
		renderComponent({
			state: '',
			setState: handleChange,
            suggestions: suggestions,
			isSearching: false,
		})

		const inputElement = screen.getByPlaceholderText('Landlord Name (or Property Management Company) - No Addresses')
		fireEvent.change(inputElement, {target: {value: 'Da'}})

		const option = await waitFor(() => screen.getByText('Daniel White'))
		expect(option).toBeInTheDocument()

		fireEvent.keyDown(option, {key: 'ArrowDown', code: 'ArrowDown'})

		await waitFor(() => {
			expect(option).toHaveClass('bg-teal-200')
		})
	})

	test("shows 'Loading...' message when searching prop is true", async () => {
		render(
			<LandlordComboBox
				name="Landlord Name (or Property Management Company) - No Addresses"
				state="some state"
				setState={handleChange}
				suggestions={[]}
				isSearching={true}
			/>,
		)

		const inputElement = screen.getByPlaceholderText('Landlord Name (or Property Management Company) - No Addresses')
		fireEvent.change(inputElement, {target: {value: 'O'}})

		await waitFor(() => {
			expect(screen.getByText('Loading...')).toBeInTheDocument()
		})
	})
})

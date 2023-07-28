/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import CityComboBox from './CityComboBox'
import {ILocationHookResponse} from '@/util/interfaces/interfaces'

interface RenderComponentProps {
	state: string | undefined
	setState: (state: string) => void
	options: Array<ILocationHookResponse>
	searching: boolean
	error: boolean
	errorText: string
}

describe('CityComboBox', () => {
	const options = [
		{id: 1, city: 'New York', state: 'New York'},
		{id: 2, city: 'Los Angeles', state: 'LA'},
		{id: 3, city: 'Chicago', state: 'Illinois'},
	]

	const handleChange = jest.fn()

	const renderComponent = ({
		state,
		setState,
		options,
		searching,
		error,
		errorText
	}: RenderComponentProps) => {
		return render(
			<CityComboBox
				name="City"
				state={state}
				setState={setState}
				options={options}
				searching={searching}
				error={error}
				errorText={errorText}
			/>,
		)
	}

	test('renders component with label and placeholder', () => {
		renderComponent({
			state: '',
			setState: handleChange,
			options: options,
			searching: false,
			error: false,
			errorText: ''
		})

		const labelElement = screen.getByText('City')
		const inputElement = screen.getByPlaceholderText('City')

		expect(labelElement).toBeInTheDocument()
		expect(inputElement).toBeInTheDocument()
	})

	test('shows dropdown options when valid city is entered and selects the first option on Enter', async () => {
		renderComponent({
			state: '',
			setState: handleChange,
			options: options,
			searching: false,
			error: false,
			errorText: ''
		})

		const inputElement = screen.getByPlaceholderText('City')
		fireEvent.change(inputElement, {target: {value: 'New'}})

		await waitFor(() => {
			expect(screen.getByText('New York')).toBeInTheDocument()
			expect(screen.getByText('Los Angeles')).toBeInTheDocument()
			expect(screen.getByText('Chicago')).toBeInTheDocument()
		})

		fireEvent.keyDown(inputElement, {key: 'Enter', code: 'Enter'})
		expect(handleChange).toHaveBeenCalledWith('New York')
	})

	test('highlights the selected city in dropdown on ArrowDown', async () => {
		renderComponent({
			state: '',
			setState: handleChange,
			options: options,
			searching: false,
			error: false,
			errorText: ''
		})

		const inputElement = screen.getByPlaceholderText('City')
		fireEvent.change(inputElement, {target: {value: 'New'}})

		const option = await waitFor(() => screen.getByText('New York'))
		expect(option).toBeInTheDocument()

		fireEvent.keyDown(option, {key: 'ArrowDown', code: 'ArrowDown'})

		await waitFor(() => {
			expect(option).toHaveClass('bg-teal-200')
		})
	})

	test("shows 'Loading...' message when searching prop is true", async () => {
		render(
			<CityComboBox
				name="City"
				state="some state"
				setState={handleChange}
				options={[]}
				searching={true}
				error={false}
				errorText=''
			/>,
		)

		const inputElement = screen.getByPlaceholderText('City')
		fireEvent.change(inputElement, {target: {value: 'N'}})

		await waitFor(() => {
			expect(screen.getByText('Loading...')).toBeInTheDocument()
		})
	})
})

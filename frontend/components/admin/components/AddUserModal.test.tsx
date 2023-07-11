/**
 * @jest-environment jsdom
 */
import {render, screen, fireEvent} from '@testing-library/react'
import AddUserModal from './AddUserModal'

describe('AddUserModal', () => {
	it('should update the name state when the name input changes', () => {
		const setName = jest.fn()
		render(
			<AddUserModal
				setName={setName}
				setEmail={jest.fn()}
				setPassword={jest.fn()}
				setAdmin={jest.fn()}
				isAdmin={false}
			/>,
		)

		const nameInput = screen.getByLabelText('Name')
		fireEvent.change(nameInput, {target: {value: 'John Doe'}})

		expect(setName).toHaveBeenCalledWith('John Doe')
	})

	it('should update the email state when the email input changes', () => {
		const setEmail = jest.fn()
		render(
			<AddUserModal
				setName={jest.fn()}
				setEmail={setEmail}
				setPassword={jest.fn()}
				setAdmin={jest.fn()}
				isAdmin={false}
			/>,
		)

		const emailInput = screen.getByLabelText('Email address')
		fireEvent.change(emailInput, {target: {value: 'john.doe@example.com'}})

		expect(setEmail).toHaveBeenCalledWith('john.doe@example.com')
	})

	it('should update the password state when the password input changes', () => {
		const setPassword = jest.fn()
		render(
			<AddUserModal
				setName={jest.fn()}
				setEmail={jest.fn()}
				setPassword={setPassword}
				setAdmin={jest.fn()}
				isAdmin={false}
			/>,
		)

		const passwordInput = screen.getByLabelText('Temporary Password')
		fireEvent.change(passwordInput, {target: {value: 'tempPassword'}})

		expect(setPassword).toHaveBeenCalledWith('tempPassword')
	})

	it('should update the admin state when the admin switch changes', () => {
		const setAdmin = jest.fn()
		render(
			<AddUserModal
				setName={jest.fn()}
				setEmail={jest.fn()}
				setPassword={jest.fn()}
				setAdmin={setAdmin}
				isAdmin={false}
			/>,
		)

		const adminSwitch = screen.getByLabelText('Admin?')
		fireEvent.click(adminSwitch)

		expect(setAdmin).toHaveBeenCalledWith(true)
	})
})

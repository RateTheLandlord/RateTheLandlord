/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, screen} from '@testing-library/react'
import LoginForm from './login-form'
import {Provider} from 'react-redux'
import {store} from '@/redux/store'

describe('LoginForm', () => {
	test('renders the login form ', async () => {
		render(
			<Provider store={store}>
				<LoginForm />
			</Provider>,
		)

		// Verify that the form inputs are rendered
		const emailInput = screen.getByTestId('login-form-email-1')
		const passwordInput = screen.getByTestId('login-form-password-1')
		const submitButton = screen.getByTestId('login-form-button-1')
	})
})
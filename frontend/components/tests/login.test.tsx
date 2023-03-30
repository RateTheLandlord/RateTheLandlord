/**
 * @jest-environment jsdom
 */
import {render} from '@testing-library/react'
import LoginForm from '@/components/login/login-form'
import {Provider} from 'react-redux'
import {store} from '@/redux/store'

describe('Login Form Tests ', () => {
	const result = render(
		<Provider store={store}>
			<LoginForm />
		</Provider>,
	)
	test('Login Form component renders all fields', () => {
		expect(result.getByTestId('login-form-1'))
		expect(result.getByTestId('login-form-email-1'))
		expect(result.getByTestId('login-form-password-1'))
		expect(result.getByTestId('login-form-button-1'))
	})
})

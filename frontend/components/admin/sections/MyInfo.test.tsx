/**
 * @jest-environment jsdom
 */
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import MyInfo from './MyInfo'

const mockStore = configureStore([])

describe('MyInfo', () => {
	test('renders MyInfo component with form inputs', () => {
		const initialState = {
			user: {
				result: {
					id: 1,
					name: 'John Doe',
					email: 'johndoe@example.com',
				},
			},
		}
		const store = mockStore(initialState)

		render(
			<Provider store={store}>
				<MyInfo />
			</Provider>,
		)

		expect(screen.getByLabelText('Name')).toBeInTheDocument()
		expect(screen.getByLabelText('Email address')).toBeInTheDocument()
		expect(screen.getByLabelText('New Password')).toBeInTheDocument()
		expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument()
		expect(screen.getByText('Save Information')).toBeInTheDocument()
		expect(screen.getByText('Save Password')).toBeInTheDocument()
	})
})

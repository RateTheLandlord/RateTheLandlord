/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, screen} from '@testing-library/react'
import Navbar from './navbar'
import {Provider} from 'react-redux'
import {store} from '@/redux/store'

jest.mock('next/router', () => ({
	useRouter: () => ({
		pathname: '/',
	}),
}))

jest.mock('@/redux/hooks', () => ({
	useAppSelector: jest.fn(),
	useAppDispatch: jest.fn(),
}))

describe('Navbar', () => {
	test('renders Navbar component correctly', () => {
		// Mock the user object with jwt property

		render(
			<Provider store={store}>
				<Navbar />
			</Provider>,
		)

		// Check if the Navbar title is rendered
		const titleElement = screen.getByText('Rate The Landlord')
		expect(titleElement).toBeInTheDocument()

		// You can add more assertions here based on your component's behavior
	})
})

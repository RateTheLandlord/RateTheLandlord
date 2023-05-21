/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import LandlordInfo from './LandlordInfo'
import {useRouter} from 'next/router'

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}))

describe('LandlordInfo', () => {
	const pushMock = jest.fn()

	beforeEach(() => {
		(useRouter as jest.Mock).mockImplementation(() => ({
			push: pushMock,
		}))
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('renders with correct name, average, and total', () => {
		const name = 'John Doe'
		const average = 4.5
		const total = 10

		render(<LandlordInfo name={name} average={average} total={total} />)

		const landlordName = screen.getByText(name)
		const reviewCount = screen.getByText(`Based on ${total} reviews`)

		expect(landlordName).toBeInTheDocument()
		expect(reviewCount).toBeInTheDocument()
	})
})

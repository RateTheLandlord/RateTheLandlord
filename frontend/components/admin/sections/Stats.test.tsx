/**
 * @jest-environment jsdom
 */
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import useSWR from 'swr'
import Stats, {IStats} from './Stats'

jest.mock('swr', () => jest.fn())

describe('Stats component', () => {
	const mockData: IStats = {
		total_reviews: 100,
		total_ca_reviews: {
			total: '50',
			states: [{key: 'CA', total: '50'}],
		},
		total_us_reviews: {
			total: '30',
			states: [{key: 'US', total: '30'}],
		},
		total_uk_reviews: {
			total: '10',
			states: [{key: 'UK', total: '10'}],
		},
		total_au_reviews: {
			total: '5',
			states: [{key: 'AU', total: '5'}],
		},
		total_nz_reviews: {
			total: '5',
			states: [{key: 'NZ', total: '5'}],
		},
	}

	beforeEach(() => {
		(useSWR as jest.Mock).mockReturnValue({data: mockData, error: null})
	})

	it('should render error state when there is an error', async () => {
		(useSWR as jest.Mock).mockReturnValue({
			data: null,
			error: new Error('Fetch error'),
		})
		render(<Stats />)
		await waitFor(() => {
			expect(screen.getByText('failed to load')).toBeInTheDocument()
		})
	})

	it('should render the total reviews count', async () => {
		render(<Stats />)
		await waitFor(() => {
			expect(
				screen.getByText(mockData.total_reviews.toString()),
			).toBeInTheDocument()
		})
	})

	it('should render the selected state stats', async () => {
		render(<Stats />)
		await waitFor(() => {
			const caButton = screen.getByText('Canadian Reviews')
			fireEvent.click(caButton)
			const stateStats = screen.getAllByText('50')
			expect(stateStats.length).toBeGreaterThanOrEqual(1)
		})
	})

	// Add more tests as needed
})

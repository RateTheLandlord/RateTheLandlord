/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import StateStats from './StateStats'

describe('StateStats', () => {
	it('should render state stats correctly', () => {
		const states = [
			{key: 'State 1', total: '100'},
			{key: 'State 2', total: '200'},
			{key: 'State 3', total: '300'},
		]

		render(<StateStats states={states} />)

		states.forEach((state) => {
			const stateName = screen.queryByText(state.key)
			const stateTotal = screen.queryByText(state.total)

			expect(stateName).toBeInTheDocument()
			expect(stateTotal).toBeInTheDocument()
		})
	})
})

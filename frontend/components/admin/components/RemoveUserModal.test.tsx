/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import RemoveUserModal from './RemoveUserModal'

describe('RemoveUserModal', () => {
	it('should render the confirmation message', () => {
		render(<RemoveUserModal />)

		const confirmationMessage = screen.getByText(
			'Are you sure you want to remove this User? This cannot be undone.',
		)

		expect(confirmationMessage).toBeInTheDocument()
	})
})

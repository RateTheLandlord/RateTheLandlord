/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import ReviewForm from './review-form'

beforeEach(() => {
	const mockIntersectionObserver = jest.fn()
	mockIntersectionObserver.mockReturnValue({
		observe: jest.fn().mockReturnValue(null),
		unobserve: jest.fn().mockReturnValue(null),
		disconnect: jest.fn().mockReturnValue(null),
	})
	window.IntersectionObserver = mockIntersectionObserver
})

test('Review Form component renders all fields', () => {
	const result = render(<ReviewForm />)

	expect(result.getByTestId('create-review-form-1')).toBeInTheDocument()
	expect(
		result.getByTestId('create-review-form-landlord-1'),
	).toBeInTheDocument()
	expect(result.getByTestId('create-review-form-city-1')).toBeInTheDocument()
	expect(
		result.getByTestId('create-review-form-postal-code-1'),
	).toBeInTheDocument()
	expect(result.getByTestId('create-review-form-text-1')).toBeInTheDocument()
	expect(result.getByTestId('create-review-form-captcha-1')).toBeInTheDocument()
	expect(
		result.getByTestId('create-review-form-submit-button-1'),
	).toBeInTheDocument()
})

test('Postal Code input shows/hides error message correctly', async () => {
	const result = render(<ReviewForm />)
	const errorMessage = 'Error. Postal Code / ZIP Invalid'

	// enter an invalid postal code
	const postalCodeInput = result.getByTestId('create-review-form-postal-code-1')
	fireEvent.change(postalCodeInput, {target: {value: 'invalid postal code'}})
	const errorElement = await result.findByText(errorMessage)
	expect(errorElement).toBeInTheDocument()

	// enter a valid postal code
	fireEvent.change(postalCodeInput, {target: {value: 'V2C 1S8'}})
	expect(result.container).not.toHaveTextContent(errorMessage)
})

test('Review content exceeds 2000 should show warning', async () => {
	const result = render(<ReviewForm />)
	const overflowReview = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et erat euismod magna tincidunt mattis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean vehicula nisl eu eros dictum, at porta felis pharetra. Curabitur eget tortor nunc. Morbi augue ante, semper a sagittis et, suscipit sed velit. Ut in molestie lacus. Morbi id rutrum est, nec aliquet mauris. Ut fermentum lacinia quam at commodo. Quisque id enim ultrices, vulputate ex ac, dignissim urna. Ut vel porttitor tellus, non egestas metus. Donec tempus sem tortor, ac ornare dolor commodo id. Integer vestibulum dapibus est auctor luctus. Aenean ut fermentum ante, sit amet vestibulum tellus. Vestibulum sodales nisl eget ante gravida, nec sodales augue pulvinar. Praesent vulputate tellus eros, sit amet mollis tortor egestas a. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ut quam sit amet turpis elementum efficitur vel vel lacus. Nulla risus mauris, posuere nec tempus sit amet, posuere eu lacus. Sed ultricies dapibus egestas. Nulla purus ante, pretium ut iaculis sed, ornare semper sapien. Sed eu justo varius, bibendum tellus nec, rutrum velit. Donec in facilisis mi, sagittis laoreet lectus. Suspendisse a orci in quam lobortis facilisis ut vitae nibh. Donec ullamcorper pulvinar velit at bibendum. Quisque quis magna vitae diam posuere suscipit eu sed eros. Nunc in sapien tincidunt, interdum justo eget, consectetur nunc. Cras laoreet nisi ut dictum viverra. Aliquam nec facilisis ante. Nunc nec sapien eu leo cursus facilisis. Sed vel felis et erat condimentum mattis. Phasellus sed ultrices enim. Nam eget sapien tellus. Quisque congue risus sit amet mattis pellentesque. Maecenas massa tortor, blandit lobortis leo eget, rhoncus faucibus turpis. Nunc in magna et tellus finibus iaculis in a ex. Quisque pretium, dui ullamcorper volutpat sagittis, lacus est lobortis lacus, ut vestibulum augue sapien non turpis. Nunc tincidunt lectus in eros luctus interdum. Donec justo dui, bibendum a auctor sed, rutrum vel justo. Ut imperdiet varius vehicula. Praesent pellentesque est vitae augue finibus gravida. Ut condimentum urna ac urna sagittis gravida non vitae purus. Aliquam in ante sagittis, pharetra velit nec, accumsan leo. Proin varius quam eget nisi volutpat semper. Curabitur in enim condimentum ante eleifend congue. Maecenas tristique sem vel ligula efficitur hendrerit`

	// enter less than 2000 characters
	const textAreaInput = result.getByTestId('create-review-form-text-1')
	fireEvent.change(textAreaInput, {target: {value: 'review'}})
	const charLimitText = await result.findByText('Character Limit: 6/2000')
	expect(charLimitText).toBeInTheDocument()

	// enter more than 2000 characters
	fireEvent.change(textAreaInput, {target: {value: overflowReview}})
	const charWarningText = await result.findByText('Character Limit: 2449/2000')
	expect(charWarningText).toBeInTheDocument()
	expect(charWarningText).toHaveClass('text-red-400')
})

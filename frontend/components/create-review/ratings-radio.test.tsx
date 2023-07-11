/**
 * @jest-environment jsdom
 */
import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import RatingsRadio from './ratings-radio'

describe('RatingsRadio component', () => {
	test('should handle rating changes correctly', () => {
		const setRatingMock = jest.fn()
		const title = 'Rating Title'
		const rating = 3
		const tooltip = 'Tooltip text'

		const {getByText} = render(
			<RatingsRadio
				title={title}
				rating={rating}
				setRating={setRatingMock}
				tooltip={tooltip}
			/>,
		)

		fireEvent.click(getByText('4'))

		expect(setRatingMock).toHaveBeenCalledWith(4)
	})
})

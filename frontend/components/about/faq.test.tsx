/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import Faq from '@/components/about/faq'

test('FAQ component renders', () => {
	render(<Faq />)
	expect(screen.getByTestId('about-faq-1')).toBeInTheDocument()
})

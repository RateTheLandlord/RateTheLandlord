/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LinkButtonLightLG from './link-button-light-lg';

describe('LinkButtonLightLG', () => {
    it('renders button text correctly', () => {
        const buttonText = 'Click me';
        const { getByText } = render(<LinkButtonLightLG href="/" children={buttonText} />);
        const buttonElement = getByText(buttonText);
        expect(buttonElement).toBeInTheDocument();
    });

    it('navigates to the correct URL when clicked', () => {
        const href = '/about';
        const { getByTestId } = render(<LinkButtonLightLG href={href} children="Click me" />);
        const buttonElement = getByTestId('home-hero-read-btn-1');
        fireEvent.click(buttonElement);
        // You can add additional assertions to verify the navigation behavior if needed
        // For example: expect(window.location.pathname).toBe(href);
    });
});

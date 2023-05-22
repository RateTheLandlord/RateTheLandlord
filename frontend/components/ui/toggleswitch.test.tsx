/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ToggleSwitch from './toggleswitch';

describe('ToggleSwitch', () => {
    it('renders switch correctly', () => {
        const enabled = true;
        const setEnabled = jest.fn();
        const { getByTestId } = render(
            <ToggleSwitch enabled={enabled} setEnabled={setEnabled} />
        );
        const switchElement = getByTestId('toggle-switch-1');
        expect(switchElement).toBeInTheDocument();
    });

    it('calls setEnabled function when the switch is toggled', () => {
        const enabled = true;
        const setEnabled = jest.fn();
        const { getByTestId } = render(
            <ToggleSwitch enabled={enabled} setEnabled={setEnabled} />
        );
        const switchElement = getByTestId('toggle-switch-1');
        fireEvent.click(switchElement);
        expect(setEnabled).toHaveBeenCalled();
    });
});

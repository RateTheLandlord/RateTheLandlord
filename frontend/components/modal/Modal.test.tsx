/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
    it('renders the component with the correct content', () => {
        const mockSetOpen = jest.fn();
        const mockOnSubmit = jest.fn();
        const mockElement = <div>Mock Element</div>;

        render(
            <Modal
                open={true}
                setOpen={mockSetOpen}
                title="Modal Title"
                description="Modal Description"
                element={mockElement}
                onSubmit={mockOnSubmit}
                buttonColour="blue"
                selectedId={1}
            />
        );

        const modalElement = screen.getByTestId('modal-1');
        expect(modalElement).toBeInTheDocument();

        const titleElement = screen.getByRole('heading', { level: 3 });
        expect(titleElement).toHaveTextContent('Modal Title');

        const descriptionElement = screen.getByText('Modal Description');
        expect(descriptionElement).toBeInTheDocument();

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        expect(submitButton).toBeInTheDocument();

        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        expect(cancelButton).toBeInTheDocument();

        fireEvent.click(submitButton);
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith(1);

        fireEvent.click(cancelButton);
        expect(mockSetOpen).toHaveBeenCalledTimes(1);
        expect(mockSetOpen).toHaveBeenCalledWith(false);
    });
});
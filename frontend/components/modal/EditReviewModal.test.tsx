/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import EditReviewModal from './EditReviewModal';

describe('EditReviewModal', () => {
    const mockSelectedReview = {
        landlord: 'John Doe',
        country_code: 'US',
        city: 'New York',
        state: 'NY',
        zip: '12345',
        review: 'Great experience',
        health: "4",
        repair:"4",
        respect: "3",
        privacy: "2",
        id: 123,
        stability: "1",
        date_added: new Date().toLocaleDateString(),
        flagged: false,
        flagged_reason: "",
        admin_approved: null,
        admin_edited: false
    };

    test('renders EditReviewModal with selected review data', () => {
        render(
            <EditReviewModal
                selectedReview={mockSelectedReview}
                mutateString=""
                setEditReviewOpen={jest.fn()}
                setSuccess={jest.fn()}
                setRemoveAlertOpen={jest.fn()}
                editReviewOpen={true}
                setSelectedReview={jest.fn()}
            />
        );

        expect(screen.getByLabelText('Landlord')).toHaveValue(mockSelectedReview.landlord);
        expect(screen.getByLabelText('Country')).toHaveValue(mockSelectedReview.country_code);
        expect(screen.getByLabelText('City')).toHaveValue(mockSelectedReview.city);
        expect(screen.getByLabelText('Province / State')).toHaveValue(mockSelectedReview.state);
        expect(screen.getByLabelText('Postal Code / ZIP')).toHaveValue(mockSelectedReview.zip);
        expect(screen.getByLabelText('Review')).toHaveValue(mockSelectedReview.review);
    });


});
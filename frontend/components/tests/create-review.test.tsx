/**
 * @jest-environment jsdom
 */
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// import Faq from '@/components/about/faq'
import ReviewForm from '@/components/create-review/review-form'

describe("Review Form Tests ", () => {
    const result = render(<ReviewForm/>);
    test("Review Form component renders all fields", () => {
        expect(result.getByTestId('create-review-form-1')).toBeInTheDocument();
        expect(result.getByTestId('create-review-form-landlord-1')).toBeInTheDocument();
        expect(result.getByTestId('create-review-form-city-1')).toBeInTheDocument();
        expect(result.getByTestId('create-review-form-postal-code-1')).toBeInTheDocument();
        expect(result.getByTestId('create-review-form-text-1')).toBeInTheDocument();
        expect(result.getByTestId('create-review-form-captcha-1')).toBeInTheDocument();
        expect(result.getByTestId('create-review-form-submit-button-1')).toBeInTheDocument();
    });
    test("Review Form is interactive", async () => { // TODO: Test form submission
        const result = render(<ReviewForm/>);
        const user = userEvent.setup();
        await user.click(result.getByTestId("create-review-form-landlord-1"));
        await user.keyboard('Test Landlord Enteprises');
        await user.click(result.getByTestId("create-review-form-city-1"));
        await user.keyboard('Calgary');
        await user.click(result.getByTestId("create-review-form-postal-code-1"));
        await user.keyboard('T1T 1T1');
        await user.click(result.getByTestId("create-review-form-text-1"));
        await user.keyboard("Test Written Review");
        await waitFor(() => expect(result.getByTestId("create-review-form-captcha-1")).toBeInTheDocument());
        await waitFor(() => user.click(result.getByTestId("create-review-form-captcha-1")));
        await waitFor(() => user.click(result.getByTestId("submit-button-1"))); 
        expect(result).toMatchSnapshot();
        //TODO: expect(mockButtonSpy).toHaveBeenCalled();
    })
})
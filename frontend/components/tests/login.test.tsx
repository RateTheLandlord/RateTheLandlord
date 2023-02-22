/**
 * @jest-environment jsdom
 */
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '@/components/login/login-form';
import { Provider } from 'react-redux';

describe("Login Form Tests ", () => {
    const result = render(
        // TODO: Mock Provider/redux store
        <LoginForm/>
    );
    test("Login Form component renders all fields", () => {
        expect(result.getByTestId("login-form-1"));
        expect(result.getByTestId("login-form-email-1"));
        expect(result.getByTestId("login-form-password-1"));
        expect(result.getByTestId("login-form-button-1"));
    });
    test("Login form fields are interactive", async () => {
        const user = userEvent.setup();
        await user.click(result.getByTestId("login-form-email-1"));
        await user.keyboard('test@example.com');
        await user.click(result.getByTestId("login-form-password-1"));
        await user.keyboard('password1');
        await user.click(result.getByTestId("login-form-button-1"));
        expect(result).toMatchSnapshot();
    })
    // TODO: POST testing
})
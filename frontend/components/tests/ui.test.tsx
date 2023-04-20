/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import Modal from '@/components/modal/Modal'
import Button from '@/components/ui/button';
import LinkButtonLG from '@/components/ui/link-button-lg';
import LinkButtonLightLG from '@/components/ui/link-button-light-lg';
import ButtonLight from '@/components/ui/button-light';
import ToggleSwitch from '@/components/ui/toggleswitch';
import Alert from '@/components/alerts/Alert'

describe("Generic UI tests", () => {
    test("Button component renders", () => {
        render(<Button>
            {''}
        </Button>);
        expect(screen.getByTestId('submit-button-1')).toBeInTheDocument();
    })
    test("Button Light component renders", () => {
        render(<ButtonLight>
            {''}
        </ButtonLight>);
        expect(screen.getByTestId('light-button')).toBeInTheDocument();
    })
    test("Link Button component renders", () => {
        render(<LinkButtonLG href={''}>
            {''}
        </LinkButtonLG>);
        expect(screen.getByTestId('home-hero-submit-btn-1')).toBeInTheDocument();
    })
    test("Link Button Light component renders", () => {
        render(<LinkButtonLightLG href={''}>
            {''}
        </LinkButtonLightLG>);
        expect(screen.getByTestId('home-hero-read-btn-1')).toBeInTheDocument();
    })
    test("ToggleSwitch component renders", () => {
        render(<ToggleSwitch enabled={false} setEnabled={jest.fn()}/>);
        expect(screen.getByTestId('toggle-switch-1')).toBeInTheDocument();
    })
    test("Alert component renders", ()=>{
        render(<Alert success={false} setAlertOpen={jest.fn()}/>);
        expect(screen.getByTestId("alert-1"));
    })
})
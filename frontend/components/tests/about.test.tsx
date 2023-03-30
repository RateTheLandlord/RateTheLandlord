/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import AboutUs from '@/components/about/aboutUs'
import Contact from '@/components/about/contact'
import Faq from '@/components/about/faq'
import Moderation from '@/components/about/moderation'
import Privacy from '@/components/about/privacy'

describe("About Section ", () => {
    test("AboutUs component renders", () => {
        render(<AboutUs/>);
        expect(screen.getByTestId('about-aboutus-1')).toBeInTheDocument();
    })
    test("Contact component renders", () => {
        render(<Contact/>);
        expect(screen.getByTestId('about-contact-1')).toBeInTheDocument();
    })
    test("FAQ component renders", () => {
        render(<Faq/>);
        expect(screen.getByTestId('about-faq-1')).toBeInTheDocument();
    })
    test("Moderation component renders", () => {
        render(<Moderation/>);
        expect(screen.getByTestId('about-moderation-1')).toBeInTheDocument();
    })
    test("Privacy component renders", () => {
        render(<Privacy/>);
        expect(screen.getByTestId('about-privacy-1')).toBeInTheDocument();
    })
    
})
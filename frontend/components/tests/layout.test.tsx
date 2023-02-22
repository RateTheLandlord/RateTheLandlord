/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Navbar from '@/components/layout/navbar';
import Layout from '@/components/layout/layout';
import Footer from '@/components/layout/footer';
import * as mockRouter from 'next/router';

describe("Layout Tests", () => {
    // TODO: Mock next router
    test("Navbar renders", () => {
        render(<Navbar/>);
        expect(screen.getByTestId("navbar-1")).toBeInTheDocument();
    })
    test("Layout renders", () => {
        render(<Layout><div></div></Layout>);
        expect(screen.getByTestId("layout-1")).toBeInTheDocument();
    })
    test("Footer renders", () => {
        render(<Footer/>);
        expect(screen.getByTestId("footer-1")).toBeInTheDocument();
    })
})
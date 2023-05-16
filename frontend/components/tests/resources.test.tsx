/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import ResourcesInfo from '@/components/resources/resourcesInfo';

describe('ResourcesInfo Component', () => {
  test('renders the component', () => {
    render(<ResourcesInfo />);
    expect(screen.getByTestId('about-Resources-1')).toBeInTheDocument();
  });

  test('displays the title "Resources"', () => {
    render(<ResourcesInfo />);
    expect(screen.getByRole('heading', { name: /Resources/i, level: 1 })).toBeInTheDocument();
  });  

  test('displays the message about joining local tenant unions', () => {
    render(<ResourcesInfo />);
    expect(screen.getByText(/Need support\? Consider joining your local tenant union!/i)).toBeInTheDocument();
  });

  test('displays the information about tenant unions', () => {
    render(<ResourcesInfo />);
    const paragraphs = screen.getAllByText(/tenant/i);
    expect(paragraphs).toHaveLength(4);
  });
});

/**
 * @jest-environment jsdom
 */
import { render, fireEvent, screen } from '@testing-library/react';
import MaliciousStringAlert from '@/components/alerts/MaliciousStringAlert';

describe('MaliciousStringAlert Component', () => {
  test('renders correctly', () => {
    const mockSetMaliciousAlertOpen = jest.fn();

    render(<MaliciousStringAlert setMaliciousAlertOpen={mockSetMaliciousAlertOpen} />);
    expect(screen.getByTestId('alert-1')).toBeInTheDocument();
  });
  
  test('displays alert text', () => {
    const mockSetMaliciousAlertOpen = jest.fn();

    render(<MaliciousStringAlert setMaliciousAlertOpen={mockSetMaliciousAlertOpen} />);
    expect(screen.getByText(/Warning! We've detected that a link or script in your entry. Please remove or rephrase before submitting./i)).toBeInTheDocument();
  });
  

  test('has dismiss button with correct role', () => {
    const mockSetMaliciousAlertOpen = jest.fn();

    render(<MaliciousStringAlert setMaliciousAlertOpen={mockSetMaliciousAlertOpen} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  test('calls setMaliciousAlertOpen on dismiss button click', () => {
    const mockSetMaliciousAlertOpen = jest.fn();

    render(<MaliciousStringAlert setMaliciousAlertOpen={mockSetMaliciousAlertOpen} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockSetMaliciousAlertOpen).toHaveBeenCalled();
    expect(mockSetMaliciousAlertOpen).toHaveBeenCalledWith(expect.any(Function));
  });
});

/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import Tabs from './Tabs';

const mockTabs = [
  { name: 'Tab 1', current: true, component: <div>Tab 1 Content</div> },
  { name: 'Tab 2', current: false, component: <div>Tab 2 Content</div> },
  { name: 'Tab 3', current: false, component: <div>Tab 3 Content</div> },
];

describe('Tabs component', () => {
  test('should render the component with correct tabs', () => {
    render(
      <Tabs
        currentTab={mockTabs[0]}
        setCurrentTab={jest.fn()}
        tabs={mockTabs}
        setTabs={jest.fn()}
        setCurrentSection={jest.fn()}
      />
    );

    // Verify that the component renders the correct tabs
    const tabElements = screen.getAllByRole('button');
    expect(tabElements).toHaveLength(mockTabs.length);
    expect(tabElements[0]).toHaveTextContent('Tab 1');
    expect(tabElements[1]).toHaveTextContent('Tab 2');
    expect(tabElements[2]).toHaveTextContent('Tab 3');
  });

  test('should update the current tab and sections when a tab is clicked', () => {
    const setCurrentTabMock = jest.fn();
    const setTabsMock = jest.fn();
    const setCurrentSectionMock = jest.fn();

    render(
      <Tabs
        currentTab={mockTabs[0]}
        setCurrentTab={setCurrentTabMock}
        tabs={mockTabs}
        setTabs={setTabsMock}
        setCurrentSection={setCurrentSectionMock}
      />
    );

    // Find the second tab and click it
    const tabElement = screen.getAllByRole('button')[1];
    fireEvent.click(tabElement);

    // Verify that the setCurrentTab, setTabs, and setCurrentSection functions are called with the correct arguments
    expect(setCurrentTabMock).toHaveBeenCalledWith(mockTabs[1]);
    expect(setTabsMock).toHaveBeenCalledWith(mockTabs.map(tab => tab.name === mockTabs[1].name ? { ...tab, current: true } : { ...tab, current: false }));
    expect(setCurrentSectionMock).toHaveBeenCalledWith(mockTabs[1].component);
  });

  // Add more tests as needed for other functionality in the component
});

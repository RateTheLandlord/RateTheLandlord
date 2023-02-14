/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import ReviewTable from '@/components/reviews/review-table'
import ReviewFilters from '@/components/reviews/review-filters'

// Test review so the table renders
const testReview = 	{
    city: "Testville",
	country_code: "CA",
	health: "3",
	id: 123,
	landlord: "Fuxtons Realty and Lechery Associates",
	privacy: "1",
	repair: "1",
	respect: "1",
	review: "I'm going to write stuff here so that it models the average review, we'll expand these later to include weird stuff.",
	stability: "5",
	state: "AB",
	zip: "T1T 1T1",
	flagged: false,
	flagged_reason: "",
	admin_approved: null,
	admin_edited: false
}

describe("Reviews Page", () => {
    test("Reviews Table component renders", () => {
        render(<ReviewTable data={[testReview]} setReportOpen={jest.fn()} setSelectedReview={jest.fn()} />) 
        expect(screen.queryByTestId("review-table-1")).toBeInTheDocument();
    })
    test("Reviews Table component does not render when there is no data", () => {
        render(<ReviewTable data={[]} setReportOpen={jest.fn()} setSelectedReview={jest.fn()} />)
        expect(screen.queryByTestId("review-table-1")).not.toBeInTheDocument();
    })
    test("Review Filters component renders", () => {
        render(<ReviewFilters selectedSort={{id: 12345, name: "test", value:"test"} }
            setSelectedSort={jest.fn()} 
            sortOptions={[]} 
            countryFilter={null} 
            setCountryFilter={jest.fn()} 
            stateFilter={null} 
            setStateFilter= {jest.fn()} 
            cityFilter={null} 
            setCityFilter={jest.fn()} 
            activeFilters={null} 
            cityOptions={[]} 
            countryOptions={[]} 
            stateOptions={[]} 
            removeFilter={jest.fn()} 
            setSearchState={jest.fn()}/>)
            expect(screen.getByTestId("review-filters-1")).toBeInTheDocument();
    })
})
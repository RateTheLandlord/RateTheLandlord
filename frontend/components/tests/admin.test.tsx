/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import AddUserModal from '@/components/admin/components/AddUserModal';
import EditReviewModal from '@/components/admin/components/EditReviewModal';
import RemoveReviewModal from '@/components/admin/components/RemoveReviewModal';
import RemoveUserModal from '@/components/admin/components/RemoveUserModal';

describe("Admin Modals", () => {
    test("Add User Modal renders", () => {
        render(<AddUserModal setName={jest.fn()} setEmail={jest.fn()} setPassword={jest.fn()} setAdmin={jest.fn()} isAdmin={false}/>);
        expect(screen.getByTestId("add-user-modal-1")).toBeInTheDocument();
    })
    test("Edit Review Modal renders", () => {
        render(<EditReviewModal review={undefined} setReview={jest.fn()}/>);
        expect(screen.getByTestId("edit-review-modal-1")).toBeInTheDocument();
    })
    test("Remove Review Modal renders", () => {
        render(<RemoveReviewModal/>);
        expect(screen.getByTestId("remove-review-modal-1")).toBeInTheDocument();
    })
    test("Remove User Modal renders", () => {
        render(<RemoveUserModal/>);
        expect(screen.getByTestId("remove-user-modal-1")).toBeInTheDocument();
    })
    
})
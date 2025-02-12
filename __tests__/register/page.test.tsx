import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import Register from '../../app/register/page';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import type { Mock } from 'vitest';

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

describe("Register Page", () => {
    let mockPush: Mock;

    beforeEach(() => {
        mockPush = vi.fn();
        (useRouter as Mock).mockReturnValue({ push: mockPush });
        render(<Register />);
    });

    afterEach(() => {
        cleanup();
    });

    it("should render the required sections of the registration page", () => {
        expect(screen.getByRole("form", { name: /register/i })).toBeInTheDocument();
        expect(screen.getByLabelText("Register Panel")).toBeInTheDocument();
        expect(screen.getByLabelText("Name")).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
        expect(screen.getByLabelText("Back to login")).toBeInTheDocument();
    });
});
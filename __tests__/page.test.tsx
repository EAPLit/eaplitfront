import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import Home from '../app/page';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import type { Mock } from 'vitest';

// Mock the authOnAppLoad function
vi.mock('@services/auth', () => ({
    authOnAppLoad: vi.fn(),
}));
import { authOnAppLoad } from '@services/auth';

// Mock the next/navigation
vi.mock("next/navigation", () => ({
    useRouter: vi.fn(),
}));

describe("Landing Page", () => {
    let mockPush: Mock;

    beforeEach(() => {
        mockPush = vi.fn();
        (useRouter as Mock).mockReturnValue({ push: mockPush });
        render(<Home />);
    });

    afterEach(() => {
        cleanup();
    })

    it("should render the required sections of the landing page", () => {
        expect(screen.getByLabelText('navigation')).toBeInTheDocument();
        expect(screen.getByLabelText('header')).toBeInTheDocument();
        expect(screen.getByLabelText('promo-first')).toBeInTheDocument();
        expect(screen.getByLabelText('promo-second')).toBeInTheDocument();
        expect(screen.getByLabelText('promo-third')).toBeInTheDocument();
        expect(screen.getByLabelText('promo-fourth')).toBeInTheDocument();
    });

    it("should call authOnAppLoad on mount", async () => {
        await waitFor(() => {
            expect(authOnAppLoad).toHaveBeenCalledTimes(2);
        });
    });

    it("should render a login and a registration button", () => {
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
    });

    it("should navigate to the login page when the login button is clicked", async () => {

        const loginButton = screen.getByRole("button", { name: /login/i });
        await userEvent.click(loginButton);

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith("/login");
        });
    });

    it("should navigate to the register page when the registration button is clicked", async () => {
        const registerButton = screen.getByRole("button", {name: /register/i });
        await userEvent.click(registerButton);

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith("/register");
        });
    })
});
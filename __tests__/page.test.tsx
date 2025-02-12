import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import Home from '../app/page';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

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
    beforeEach(() => {
        render(<Home />);
    });

    afterEach(() => {
        cleanup();
    })

    it("should render the required sections of the landing page", () => {
        expect(screen.getByTestId('navigation')).toBeInTheDocument();
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('promo-first')).toBeInTheDocument();
        expect(screen.getByTestId('promo-second')).toBeInTheDocument();
        expect(screen.getByTestId('promo-third')).toBeInTheDocument();
        expect(screen.getByTestId('promo-fourth')).toBeInTheDocument();
    });

    it("should call authOnAppLoad on mount", async () => {
        await waitFor(() => {
            expect(authOnAppLoad).toHaveBeenCalledTimes(2);
        });
    });

    it("should render a login and a registration button", () => {
        expect(screen.getByRole("button", { name: '/login/i' })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: '/register/i' })).toBeInTheDocument();
    });

    it("should navigate to the login page when the login button is clicked", async () => {
        const mockPush = vi.fn();
        (useRouter as vi.Mock).mockReturnvalue({ push: mockPush });

        const loginButton = screen.getByRole("button", { name: /login/i });
        await userEvent.click(loginButton);

        expect(mockPush).toHaveBeenCalledWith("/login");
    });
});
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import Home from '../app/page';

// Mock the authOnAppLoad function
vi.mock('@services/auth', () => ({
    authOnAppLoad: vi.fn(),
}));
import { authOnAppLoad } from '@services/auth';

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
});
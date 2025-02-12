import { expect, describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../app/page';

// Mock the authOnAppLoad function
vi.mock('@services/auth', () => ({
    authOnAppLoad: vi.fn(),
}));
import { authOnAppLoad } from '@services/auth';

describe("Landing Page", () => {
    it("should render the required sections of the landing page", () => {
        render(<Home />);
        
        expect(screen.getByTestId('navigation')).toBeInTheDocument();
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('promo-first')).toBeInTheDocument();
        expect(screen.getByTestId('promo-second')).toBeInTheDocument();
        expect(screen.getByTestId('promo-third')).toBeInTheDocument();
        expect(screen.getByTestId('promo-fourth')).toBeInTheDocument();
    });

    it("should call authOnAppLoad on mount", async () => {
        render(<Home />);

        await waitFor(() => {
            expect(authOnAppLoad).toHaveBeenCalledTimes(2);
        });
    });
});
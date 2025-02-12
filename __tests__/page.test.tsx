import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

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
});
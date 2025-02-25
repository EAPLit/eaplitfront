import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import Login from '../../app/login/page';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { useError } from '@/app/context/ErrorContext';
import { useAuth } from '@/app/context/AuthContext';
import type { Mock } from 'vitest';

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

vi.mock('@/app/context/ErrorContext', () => ({
    useError: () => ({
        error: null,
        showError: vi.fn(),
        clearError: vi.fn(),
    }),
}));

vi.mock('@/app/context/AuthContext', () => ({
    useAuth: () => ({
        login: vi.fn(),
        loading: false,
        user: null,
    }),
}));

describe("Login Page", () => {
    let mockPush: Mock;

    beforeEach(() => {
        mockPush = vi.fn();
        (useRouter as Mock).mockReturnValue({ push: mockPush });
        render(<Login />);
    });

    afterEach(() => {
        cleanup();
    });

    it("should render the required sections of the login page", () => {
        expect(screen.getByRole("form", { name: /login/i })).toBeInTheDocument();
        expect(screen.getByLabelText("Login Panel")).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });

    
});
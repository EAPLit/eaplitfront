import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useError } from '@/app/context/ErrorContext';
import type { Mock } from 'vitest';

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

// Mock the components that get rendered in this page
vi.mock('../../app/components/MyLearningHead', () => ({
    default: () => <div data-testid="mylearning-head" />
}));

vi.mock('../../app/components/ProjectsList', () => ({
    default: () => <div data-testid="projects-list" />
}));

vi.mock('../../app/components/AdminGuide', () => ({
    default: () => <div data-testid="admin-guide" />
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

import MyLearning from '../../app/mylearning/page';

describe("My Learning Page", () => {
    let mockPush: Mock;

    beforeEach(() => {
        mockPush = vi.fn();
        (useRouter as Mock).mockReturnValue({ push: mockPush });
        render(<MyLearning />);
    });

    afterEach(() => {
        cleanup();
    });

    it("should render all the components on the page", () => {
        expect(screen.getByTestId("mylearning-head")).toBeInTheDocument();
        expect(screen.getByTestId("projects-list")).toBeInTheDocument();
        expect(screen.getByTestId("admin-guide")).toBeInTheDocument();
    });
});
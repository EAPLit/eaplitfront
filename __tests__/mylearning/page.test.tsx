import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import MyLearning from '../../app/mylearning/page';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import type { Mock } from 'vitest';

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(),
}));

// Mock the components that get rendered in this page
vi.mock('../../components/MyLearningHead', () => ({
    default: () => <div data-testid="mylearning-head" />
}));

vi.mock('../../components/ProjectsList', () => ({
    default: () => <div data-testid="projects-list" />
}));

vi.mock('../../components/AdminGuide', () => ({
    default: () => <div data-testid="admin-guide" />
}));

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
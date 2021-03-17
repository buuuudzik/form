import { render, screen } from '@testing-library/react';
import AfterPage from './AfterPage';

describe("<AfterPage />", () => {
        it("should show thank you", () => {
            render(<AfterPage />);
            const thankYouText = screen.getByText(/Thank you for submitting/i);
            expect(thankYouText).toBeInTheDocument();
        });
});
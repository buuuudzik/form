import { render, screen, fireEvent, act } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import EventForm from "../components/FormPage/EventForm/EventForm";
import { Provider } from 'react-redux';

describe("<EventForm />", () => {
    let store;
    const mockStore = configureStore({
        submitted: false,
        fetchError: "",
        fetching: false,
    });

    describe("Form", () => {
        it("Should have all inputs", () => {
            store = mockStore({
                submitted: false,
                fetchError: "",
                fetching: false,
            });
            render(<Provider store={store}>
                <EventForm />
            </Provider>);

            const firstName = screen.getByLabelText("First Name");
            expect(firstName).toBeInTheDocument();

            const lastName = screen.getByLabelText("Last Name");
            expect(lastName).toBeInTheDocument();

            const email = screen.getByLabelText("Email Address");
            expect(email).toBeInTheDocument();

            const eventDate = screen.getByLabelText("Event Date")
            expect(eventDate).toBeInTheDocument();

            const submit = screen.getByText(/Send/i);
            expect(submit).toBeInTheDocument();
        });

        it("Should show form errorMessage", () => {
            store = mockStore({
                submitted: false,
                fetchError: "Test error",
                fetching: false,
            });
            render(<Provider store={store}>
                <EventForm />
            </Provider>);

            const testError = screen.getByText(/test error/i);
            expect(testError).toBeInTheDocument();
        });
    });
});
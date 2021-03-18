import { render, screen, fireEvent, act } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import EventForm from "./EventForm";
import { Provider } from 'react-redux';

describe("<EventForm />", () => {
    let store;
    const mockStore = configureStore({
        submitted: false,
        fetchError: "",
        fetching: false,
    });

    // Wypełnij pola i naciśnij przycisk submit
    // gdy wypełniono poprawnymi danymi powinien się zmienić stan fetching
    // gdy wypełniono błędnymi danymi nie powinien się zmienić stan fetching
    // czy pokazują się błędy
    // czy nie pokazują się błędy

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

            const firstName = screen.getAllByText(/First Name/i);
            expect(firstName[0]).toBeInTheDocument();

            const lastName = screen.getAllByText(/Last Name/i);
            expect(lastName[0]).toBeInTheDocument();

            const email = screen.getAllByText(/Email/i);
            expect(email[0]).toBeInTheDocument();

            const eventDate = screen.getAllByText(/Event Date/i);
            expect(eventDate[0]).toBeInTheDocument();

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

        // Testy poszczególnych pól, które mają zwracać błąd

        it("Empty form should be failed", (done) => {
            store = mockStore({
                submitted: false,
                fetchError: "",
                fetching: false,
            });
            render(<Provider store={store}>
                <EventForm />
            </Provider>);

            const sendBtn = screen.getByText(/send/i);
            expect(sendBtn).toBeInTheDocument();

            act(() => {
                store.subscribe(() => {
                    const { fetching } = store.getState();
                    expect(fetching).toBeFalsy();

                    console.log("Hello");

                    const requiredMessages = screen.getAllByText(/required/i);
                    expect(requiredMessages[0]).toBeInTheDocument();

                    done();
                });

                fireEvent.click(sendBtn);
            });
        });
    });
});
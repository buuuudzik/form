import { render, screen } from '@testing-library/react';
import App from './App';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

test('renders learn react link', () => {
  let store;

  const mockStore = configureStore({
    submitted: false,
  });

  store = mockStore({
    submitted: false,
  });

  render(<Provider store={store}>
    <App />
</Provider>);

  const formTitle = screen.getByText(/new event/i);
  expect(formTitle).toBeInTheDocument();
});

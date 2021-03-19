import { render, screen } from '@testing-library/react';
import App from '../App';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('<App /> render proper page', () => {
  it('should render <FormPage /> when not submitted', () => {
    let store;
  
    const mockStore = configureStore({
      submitted: false,
    });
  
    store = mockStore({
      submitted: false,
    });
  
    const { getByTestId } = render(<Provider store={store}>
      <App />
  </Provider>);
  
    const formTitle = getByTestId('event-form');
    expect(formTitle).toBeInTheDocument();
  });
  
  it('should render <AfterPage /> with thanks when submitted', () => {
    let store;
  
    const mockStore = configureStore({
      submitted: false,
    });
  
    store = mockStore({
      submitted: true,
    });
  
    const { queryByTestId } = render(<Provider store={store}>
      <App />
  </Provider>);
  
  const afterPage = queryByTestId('after-page');
  expect(afterPage).toBeInTheDocument();
  expect(afterPage).toHaveTextContent("Thank you for submitting");
  });  
});
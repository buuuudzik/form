import { render, screen } from '@testing-library/react';
import App from './App';
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
  
    render(<Provider store={store}>
      <App />
  </Provider>);
  
    const formTitle = screen.getByText(/new event/i);
    expect(formTitle).toBeInTheDocument();
  });
  
  it('should render <AfterPage /> when submitted', () => {
    let store;
  
    const mockStore = configureStore({
      submitted: false,
    });
  
    store = mockStore({
      submitted: true,
    });
  
    render(<Provider store={store}>
      <App />
  </Provider>);
  
    const thankYouMessage = screen.getByText(/thank you for submitting/i);
    expect(thankYouMessage).toBeInTheDocument();
  });  
});
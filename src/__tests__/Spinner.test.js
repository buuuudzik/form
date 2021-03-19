import * as React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Spinner from '../components/Spinner/Spinner';

describe('<Spinner />', () => {
  it('should render while fetching', () => {
    let store;
  
    const mockStore = configureStore({
      fetching: true,
    });
  
    store = mockStore({
      fetching: true,
    });
  
    const { getByTestId } = render(<Provider store={store}>
      <Spinner />
    </Provider>);
  
    expect(getByTestId('spinner')).toBeInTheDocument();
  });
  
  it('should not render while not fetching', () => {
    let store;
  
    const mockStore = configureStore({
      fetching: false,
    });
  
    store = mockStore({
      fetching: false,
    });
  
    const { queryByTestId } = render(<Provider store={store}>
      <Spinner />
    </Provider>);
  
    expect(queryByTestId('spinner')).toBeNull();
  });  
});
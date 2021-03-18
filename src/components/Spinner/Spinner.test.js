import * as React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Spinner from './Spinner';

describe('<Spinner /> render properly', () => {
  it('should render <CircularProgress /> while fetching', () => {
    let store;
  
    const mockStore = configureStore({
      fetching: true,
    });
  
    store = mockStore({
      fetching: true,
    });
  
    const { container } = render(<Provider store={store}>
      <Spinner />
    </Provider>);
  
    expect(container.childNodes).toHaveLength(1);
  });
  
  it('should not render <CircularProgress /> while not fetching', () => {
    let store;
  
    const mockStore = configureStore({
      fetching: false,
    });
  
    store = mockStore({
      fetching: false,
    });
  
    const { container } = render(<Provider store={store}>
      <Spinner />
    </Provider>);
  
    expect(container.childNodes).toHaveLength(0);
  });  
});
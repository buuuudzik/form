import React from 'react';
import './App.css';
import FormPage from './components/FormPage/FormPage';
import AfterPage from './components/AfterPage/AfterPage';
import Spinner from './components/Spinner/Spinner';
import { connect } from 'react-redux';
import { submittedSelector } from './store/selectors';

function App({submitted}) {
  return (
    <React.Fragment>
      <Spinner />
      {!submitted ? <FormPage /> : <AfterPage />}
    </React.Fragment>
  );
}

export default connect(state => ({
  ...submittedSelector(state)
}), null)(App);

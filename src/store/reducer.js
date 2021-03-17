const initialState = {
  fetching: false,
  fetchError: "",
  submitted: false,
};

const actions = {
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCHING:
      return { ...state, fetching: true, fetchError: "", submitted: false };
    case actions.FETCHED:
      return { ...state, fetching: false, fetchError: action.payload, submitted: !action.payload };
    default:
      return state;
  }
};

export default reducer;

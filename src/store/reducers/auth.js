import { LOGIN } from "../actions/auth";

const initialState = {
  userId: null
};

export default (state = initialState, action) => {
  console.log('in reducer action: ', action);
  console.log('in reducer state: ', state);
  switch (action.type) {
    case LOGIN:
      console.log('in Login !');
      return {
        ...state,
        userId: action.userId,
      };
    default:
      return state;
  }
};

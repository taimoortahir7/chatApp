export const LOGIN = "LOGIN";

export const login = (userId) => {
  console.log('in action: ', userId);
  return async (dispatch) => {
    dispatch({ type: LOGIN, userId: userId });
  };
};
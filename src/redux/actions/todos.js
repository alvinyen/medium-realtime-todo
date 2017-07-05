export const INITIAL_TODOS = 'INITIAL_TODOS';

export const initialTodos = (resultArray) => ({
  type: INITIAL_TODOS,
  todos: resultArray,
});

/** *************************************************************************************** */
/* Async Action items using - Sockets */
/** *************************************************************************************** */

export const loadInitialDataSocket = (socket) => {
  return (dispatch) => {
    socket.on('initialList', (resultArray) => {
      dispatch(initialTodos(resultArray));
    });
  };
};

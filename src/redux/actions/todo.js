export const ADD_TODO = 'ADD_TODO';

export const addTodo = (todo) => ({
  type: ADD_TODO,
  todo,
});

/***************************************************************************************** */
/* Async Action items using - Sockets													   */
/***************************************************************************************** */

export const addNewTodoSocket = (socket, id, title) => {
  console.log(title, id);
  return (dispatch) => {
    const todo = {
      id,
      title,
      completed: false,
    };
    socket.emit('addTodo', todo);
  };
}
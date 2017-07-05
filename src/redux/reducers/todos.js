import { List } from 'immutable';
import { INITIAL_TODOS } from './../actions/todos';
import { ADD_TODO } from './../actions/todo';

const initialState = { todos: List([]) };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_TODOS:
      return {
        ...state,
        todos: List(action.todos),
      };
    case ADD_TODO:
      return {
        ...state,
        todos: state.todos.push(action.todo),
      };
    default:
      return state;
  }
};

export default reducer;

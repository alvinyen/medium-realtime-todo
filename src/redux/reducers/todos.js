import { List } from 'immutable';
import { INITIAL_TODOS } from './../actions/todos';

const initialState = { todos: List([]) };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_TODOS:
      return {
        ...state,
        todos: List(action.todos),
      };
    default:
      return state;
  }
};

export default reducer;

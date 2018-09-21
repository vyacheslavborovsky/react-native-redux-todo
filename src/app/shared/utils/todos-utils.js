import {createSelector} from "reselect";
import {TYPES} from "../constants";

export const getTodos = (state, screen) => {
    const todos = state.todoState.todos;

    switch (screen) {
        case TYPES.ALL:
            return todos;
        case TYPES.ACTIVE:
            return todos.filter(todo => todo.completed === false)
        case TYPES.COMPLETED:
            return todos.filter(todo => todo.completed === true)
        default:
            return todos
    }

}

export const getFilteredTodos = state => createSelector(
    [getTodos], (todos) => {

        return {
            todoState: {
                ...state.todoState,
                todos: todos.sort((a, b) => a.createdAt - b.createdAt)
            }
        }
    }
);

import React from 'react'
import TodoContainer from '../containers/TodosContainer'

const TodosScreen = props => (
    <TodoContainer screen={props.navigation.state.key} {...props}/>
);

export default TodosScreen;

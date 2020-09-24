import React, { Component } from 'react';
import Todo from './Todo';

class TodoList extends Component {
  render() {
    const { todos } = this.props;
    
    return (
      <div>
        <ul>
          {todos.map(todo => (
            <Todo 
              key={todo.id}
              {...this.props}
              todo={todo}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoList;
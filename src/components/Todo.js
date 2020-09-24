import React, { Component } from 'react';


class Todo extends Component {
 
  render() {
    const { handleMark, todo, handleDelete } = this.props;
    return (
      <div className="todo-wrapper">
        <li className={`todo-item ${todo.completed === true ? "completed" : ""}`}>
          <div 
          className={`switch ${todo.completed === true ? "marked" : ""}`}
          onClick={() => handleMark(todo)}
          ></div>
          <p className="todo-text">{todo.title}</p>
        </li>
        <div 
        className="close-todo"
        onClick={() => handleDelete(todo)}
        >&#10006;
        </div>
      </div>
    );
  }
}

export default Todo;
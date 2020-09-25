import React, { Component } from 'react';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  
  handleChangeTodo = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit = (event) => {
    // const { todo } = this.props;
    event.preventDefault();
    // const newTitle = this.state.value;
    const edited = !todo.edited;
    
  }

  render() {
    const { handleMark, todo, handleDelete, handleEdit } = this.props;
    return (
      <div className="todo-wrapper">
        <li className={`todo-item ${todo.completed === true ? "completed" : ""}`}>
          <div 
          className={`switch ${todo.completed === true ? "marked" : ""}`}
          onClick={() => handleMark(todo)}
          ></div>
          {!todo.edited && 
          <p 
          className="todo-text"
          onDoubleClick={() => handleEdit(todo)}
          >{todo.title}</p>
          }
          {todo.edited &&
          <input 
          className="editing-todo"
          type='text'
          value={todo.text}
          onChange={this.handleChangeTodo}

          />
          }
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
import React, { Component } from 'react';
import classnames from 'classnames'

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.todo.title
    };
  }

  //Начать отсюда, добавить connect, import action 
  handleDoneTodo = () => {
    this.props.updateTodo({
      ...this.props.todo,
      isCompleted: !this.props.todo.isCompleted
    });
  }

  handleDelete = () => {
    this.props.deleteTodo(this.props.todo);
  }

  handleSetEditedTodo = () => {
    this.props.setEditedTodo(this.props.todo.id)
  }

  handleChangeTodo = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmitChanges = (event) => {
    event.preventDefault();
    this.props.updateTodo({
      ...this.props.todo,
      title: this.state.value
    });
    this.cancelEditing();
  }

  handleCancelEscape = (event) => {
    if (event.key === 'Escape') {
      this.cancelEditing();
    }
  }

  cancelEditing = () => {
    this.props.setEditedTodo(null);
  }

  render() {
    const { todo, isEdited } = this.props;
    const itemClass = classnames({
      'todo-item': true,
      'completed': todo.isCompleted,
      'edited': isEdited
    });
    const switchClass = classnames({
      'switch': true,
      'marked': todo.isCompleted
    })

    return (
      <li
        className={itemClass}
        onClick={this.cancelEditing}
        onDoubleClick={this.handleSetEditedTodo}
      >
        <div
          className={switchClass}
          onClick={this.handleDoneTodo}
          onDoubleClick={(e) => { e.stopPropagation() }}
        />

        {!isEdited && (
          <p
            className="todo-text"
          >
            {todo.title}
          </p>
        )}

        {isEdited && (
          <form onSubmit={this.handleSubmitChanges}>
            <input
              onClick={(e) => { e.stopPropagation() }}
              className="editing-todo"
              autoFocus
              type='text'
              value={this.state.value}
              onChange={this.handleChangeTodo}
              onKeyDown={this.handleCancelEscape}
            />
          </form>
        )}
        
        <div
          className="close-todo"
          onClick={this.handleDelete}
        >
          {'✖'}
        </div>
      </li>
    );
  }
}

export default Todo;
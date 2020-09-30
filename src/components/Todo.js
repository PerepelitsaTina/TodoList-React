import React, { Component } from 'react';
import classnames from 'classnames'

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.todo.title
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.todo.edited !== this.props.todo.edited) {
      this.setState({
        value: this.props.todo.title
      });
    }
  }

  handleDoneTodo = () => {
    this.props.doneTodo(this.props.todo);
  }

  handleDelete = () => {
    this.props.deleteTodo(this.props.todo);
  }

  handleEdit = () => {
    this.props.editTodo(this.props.todo);
  }

  handleChangeTodo = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmitChanges = (event) => {
    event.preventDefault();
    this.props.changeTitle(this.state.value);
    this.setState({
      value: this.props.todo.title
    });
  }

  handleCancelEscape = (event) => {
    if (event.key === 'Escape') {
      this.props.cancelEditing();
    }
  }

  handleCancelEditing = () => {
    this.props.cancelEditing();
  }

  render() {
    const { todo } = this.props;
    const itemClass = classnames({
      'todo-item': true,
      'completed': todo.isCompleted
    });
    const switchClass = classnames({
      'switch': true,
      'marked': todo.isCompleted
    })

    return (
      <li
        className={itemClass}
        onClick={this.handleCancelEditing}
      >
        <div
          className={switchClass}
          onClick={this.handleDoneTodo}
        />
        {!todo.edited &&
          <p
            className="todo-text"
            onDoubleClick={this.handleEdit}
          >
            {todo.title}
          </p>
        }
        {todo.edited &&
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
        }
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
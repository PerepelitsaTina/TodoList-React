import React, { Component } from 'react';
import classnames from 'classnames'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateTodo, deleteTodo } from "../store/todos/actions"

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.todo.title
    };
  }

  handleDoneTodo = () => {
    const updatedTodo = {
      ...this.props.todo,
      isCompleted: !this.props.todo.isCompleted
    };
    this.props.updateTodo(updatedTodo);
  }

  handleDelete = () => {
    this.props.deleteTodo(this.props.todo.id);
  }

  handleSetEditedTodo = () => {
    this.props.setEditedTodo(this.props.todo.id);
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
    const itemClass = classnames('todo-item', {
      'completed': todo.isCompleted,
      'edited': isEdited
    });
    const switchClass = classnames('switch', {
      'marked': todo.isCompleted
    });

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
          <p className="todo-text">
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

const mapDispatchToProps = (dispatch) => ({
  updateTodo: (todo) => dispatch(updateTodo(todo)),
  deleteTodo: (id) => dispatch(deleteTodo(id))
});

export default connect(null, mapDispatchToProps)(Todo);

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool
  }),
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  isEdited: PropTypes.bool.isRequired,
  setEditedTodo: PropTypes.func.isRequired
}

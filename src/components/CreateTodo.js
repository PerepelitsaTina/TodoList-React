import React, { Component } from 'react';
import uuidv4 from 'uuid/dist/v4'
import { connect } from 'react-redux';
import { createTodo } from "../actions/index"

class CreateTodo extends Component {
  state = {
    value: '',
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
      id: uuidv4(),
      title: this.state.value,
      isCompleted: false
    };
    if (this.state.value.length > 0) {
      this.props.createTodo(newTodo);
    }
  }

  render() {
    return (
      <form
        className="todo-form"
        onSubmit={this.handleSubmit}
      >
        <input
          className="creating-todo"
          type="text"
          placeholder="Add your todo here"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  todos: state.todos_store.todos
});

const mapDispatchToProps = dispatch => ({
  createTodo: (todo) => dispatch(createTodo(todo))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTodo);
import React, { Component } from 'react';

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
    if (this.state.value.length > 0) {
      this.props.createTodo(this.state.value);
    }
    this.setState({
      value: '',
    });
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

export default CreateTodo;
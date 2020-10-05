import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createTodo } from '../store/todos/actions';

class CreateTodo extends Component {
  state = {
    value: ''
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
      value: ''
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

const mapDispatchToProps = (dispatch) => ({
  createTodo: (title) => dispatch(createTodo(title))
});

export default connect(null, mapDispatchToProps)(CreateTodo);

CreateTodo.propTypes = {
  createTodo: PropTypes.func
};

CreateTodo.defaultProps = {
  createTodo: () => null
};

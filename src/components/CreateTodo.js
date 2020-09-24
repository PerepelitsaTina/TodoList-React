import React, { Component } from 'react';

class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.add(this.state.value);
    this.setState({
      value: '',
    });
  }

  render() {
    return (
      <form 
      onSubmit={this.handleSubmit}  
      >
        <input 
        className="creating-todo"
        type='text'
        placeholder='Add your todo here'
        value={this.state.value}
        onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default CreateTodo;
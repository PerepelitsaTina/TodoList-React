import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid'
import CreateTodo from './CreateTodo';
import TodoList from './TodoList';
import Footer from './Footer';


class Todos extends Component {
  state = {
    todos: [],
    filter: 'all',
  }

  createTodo = (title) => {
    let newTodo = {
      id: uuidv4(),
      title,
      isCompleted: false,
      edited: false
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  }

  changeTitle = (title) => {
    const mappedTodos = this.state.todos.map(todo => {
      if (todo.edited) {
        const edited = !todo.edited;
        return {
          ...todo,
          title,
          edited
        };
      }
      return todo;
    });
    this.setState({
      todos: mappedTodos
    });
  }

  handleEdit = (editedTodo) => {
    const mappedTodos = this.state.todos.map(todo => {
      if (todo.id === editedTodo.id) {
        const edited = !todo.edited;
        return {
          ...todo,
          edited
        };
      }
      return todo;
    });
    this.setState({
      todos: mappedTodos
    });
  }

  cancelEditing = () => {
    const mappedTodos = this.state.todos.map(todo => ({ ...todo, edited: false }));
    this.setState({
      todos: mappedTodos
    });
  }

  checkEdited = () => {
    return Boolean(
      this.state.todos.filter(todo => (
        todo.edited
      )).length
    );
  }

  handleDoneTodo = (markedTodo) => {
    const todos = this.state.todos.map(todo => {
      if (todo.id === markedTodo.id) {
        const isCompleted = !todo.isCompleted;
        return {
          ...todo,
          isCompleted
        };
      }
      return todo;
    });
      this.setState({
      todos
    }, this.setAllCompleted);
  }

  handleMarkAll = () => {
    const { completedCounter } = this.showFilteredTodos();
    const isAllCompleted = this.state.todos.length === completedCounter;
    const markedTodos = this.state.todos.map((todo) => {
      return {
        ...todo,
        isCompleted: !isAllCompleted
      }
    });

    this.setState({
      todos: markedTodos
    });
  }

  handleDelete = (deletedTodo) => {
    const filteredTodos = this.state.todos.filter(todo => {
      return todo.id !== deletedTodo.id;
    });
    this.setState({
      todos: filteredTodos
    });
  }

  handleClearCompleted = () => {
    const clearedTodos = this.state.todos.filter((todo) => (
      !todo.isCompleted
    ));
    this.setState({
      todos: clearedTodos
    });
  }

  setFilter = (buttonName) => {
    this.setState({
      filter: buttonName
    });
  }

  showFilteredTodos = () => {
    let completedCounter = 0;
    const todos = this.state.todos.filter((todo) => {
      if (todo.isCompleted) { completedCounter++; };

      if (this.state.filter === 'all') {
        return true;
      }
      if (this.state.filter === 'active' && !todo.isCompleted) {
        return true;
      }
      if (this.state.filter === 'completed' && todo.isCompleted) {
        return true;
      }
      return false
    });
    return {
      todos,
      completedCounter,
      activeCounter: this.state.todos.length - completedCounter
    };
  }

  render() {
    const { todos, activeCounter, completedCounter } = this.showFilteredTodos();

    return (
      <div className="todos">
        <div className="header">
          <div
            className={`main-switch ${this.state.todos.length === completedCounter && this.state.todos.length !== 0 ? "marked" : ""}`}
            onClick={this.handleMarkAll}
          />
          <CreateTodo
            todos={this.state.todos}
            createTodo={this.createTodo}
            handleChange={this.handleChange}
          />
        </div>
        <TodoList
          todos={todos}
          handleDoneTodo={this.handleDoneTodo}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleChange={this.handleChange}
          changeTitle={this.changeTitle}
          checkEdited={this.checkEdited}
          cancelEditing={this.cancelEditing}
        />
        {this.state.todos.length > 0 &&
          <Footer
            filter={this.state.filter}
            activeCounter={activeCounter}
            completedCounter={completedCounter}
            setFilter={this.setFilter}
            handleClearCompleted={this.handleClearCompleted}
          />}
      </div>
    );
  }
}


export default Todos;
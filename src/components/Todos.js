import React, { Component } from 'react';
import uuidv4 from 'uuid/dist/v4'
import classnames from 'classnames'

import CreateTodo from './CreateTodo';
import Todo from './Todo';
import Footer from './Footer';

class Todos extends Component {
  state = {
    todos: [],
    filter: 'all',
  }

  createTodo = (title) => {
    const newTodo = {
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

  editTodo = (editedTodo) => {
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
    const isEdited = this.checkEdited();
    if (!isEdited) {
      return
    };
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

  doneTodo = (id) => {
    const todos = this.state.todos.map(todo => {
      if (todo.id === id) {
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
    });
  }

  // doneTodo = (id) => {
  //   const todos = this.state.todos;
  //   const index = this.state.todos.map(todo => todo.id).indexOf(id);
  //   let isCompleted = !this.state.todos[index].isCompleted;
  //   todos[index].isCompleted = isCompleted;
  //   this.setState({
  //     todos
  //   });
  // }

  handleDoneAll = () => {
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

  deleteTodo = (deletedTodo) => {
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

  setFilter = (value) => {
    this.setState({
      filter: value
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
    const switchClass = classnames({
      'main-switch': true,
      'marked': this.state.todos.length === completedCounter && this.state.todos.length !== 0
    })

    return (
      <div className="todos">
        <div className="header">
          <div
            className={switchClass}
            onClick={this.handleDoneAll}
          />

          <CreateTodo
            createTodo={this.createTodo}
            handleChange={this.handleChange}
          />
        </div>

        <ul>
          {todos.map(todo => (
            <Todo
              key={todo.id}
              todos={todos}
              doneTodo={this.doneTodo}
              deleteTodo={this.deleteTodo}
              editTodo={this.editTodo}
              handleChange={this.handleChange}
              changeTitle={this.changeTitle}
              cancelEditing={this.cancelEditing}
              todo={todo}
            />
          ))}
        </ul>

        {this.state.todos.length > 0 && (
          <Footer
            filter={this.state.filter}
            activeCounter={activeCounter}
            completedCounter={completedCounter}
            setFilter={this.setFilter}
            handleClearCompleted={this.handleClearCompleted}
          />
        )}
      </div>
    );
  }
}

export default Todos;
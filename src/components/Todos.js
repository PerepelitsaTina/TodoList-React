import React, { Component } from 'react';
import CreateTodo from './CreateTodo';
import TodoList from './TodoList';
import Footer from './Footer';


class Todos extends Component {
  state = {
    todos: [],
    filter: 'all',
    isAllSelected: false,
    activeCount: 0,
    completedCount: 0
  }

  count = 1;

  createTodo = (title) => {
    let newTodo = {
      id: this.count++,
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

  handleMark = (markedTodo) => {
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
    });
  }

  handleMarkAll = () => {
    const markedTodos = this.state.todos.map((todo) => {
      return {
        ...todo,
        isCompleted: this.state.isAllSelected
      }
    });

    this.setState({
      todos: markedTodos
    });
  }

  handleSelectAll = () => {
    let isAllSelected = !this.state.isAllSelected;
    this.setState({
      isAllSelected
    }, this.handleMarkAll);
  }

  handleDelete = (deletedTodo) => {
    const filteredTodos = this.state.todos.filter(todo => {
      if (deletedTodo.isCompleted) {
        let completedCount = this.state.completedCount;
        this.setState({
          completedCount: this.setState.completedCount - 1
        });
      } else {
        let activeCount = this.state.activeCount;
        this.setState({
          activeCount: this.state.activeCount - 1
        });
      }
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

  handleChangeFilter = (event) => {
    this.setState({
      filter: event.target.id
    });
  }

  showFilteredTodos = () => {
    return this.state.todos.filter((todo) => {
      // здесь ты считаешь каунты
      if (this.state.filter === 'active') {
        this.setState({
          activeCount: this.setState.activeCount + 1
        });
      }
      if (this.state.filter === 'completed') { 
        this.setState({
          completedCount: this.setState.completedCount + 1
        });
      }
      // а здесь уже основная логика функции
      if (this.state.filter === 'all') { 
        return true;
      }
      if (this.state.filter === 'active' && !todo.isCompleted) { return true }
      if (this.state.filter === 'completed' && todo.isCompleted) { return true }
      return false
    });
  }

  render() {
    const sortedTodos = this.showFilteredTodos();

    return (
      <div className="todos">
        <div className="header">
          <div
            className={`main-switch ${this.state.isAllSelected ? "marked" : ""}`}
            onClick={this.handleSelectAll}
          />
          <CreateTodo
            todos={this.state.todos}
            createTodo={this.createTodo}
            handleChange={this.handleChange}
          />
        </div>
        <TodoList
          todos={sortedTodos}
          handleMark={this.handleMark}
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
            activeCount={this.state.activeCount}
            completedCount={this.state.completedCount}
            handleChangeFilter={this.handleChangeFilter}
            handleClearCompleted={this.handleClearCompleted}
          />}
      </div>
    );
  }
}


export default Todos;
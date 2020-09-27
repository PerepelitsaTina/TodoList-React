import React, { Component } from 'react';
import CreateTodo from './CreateTodo';
import TodoList from './TodoList';
import Footer from './Footer';

let count = 0;

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      status: 'all',
      selectedAll: true
    };
  }
  createTodo = (value) => {
    let newTodo = {
      id: count + 1,
      title: value,
      completed: false,
      edited: false
    };
    count++;
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  }

  changeTitle = (value) => {
    const mappedTodos = this.state.todos.map(todo => {
      if (todo.edited) {
        const edited = !todo.edited;
        return {
          ...todo,
          title: value,
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
      return Boolean(this.state.todos.filter(todo => (
        todo.edited
      )).length);
    }

  handleMark = (markedTodo) => {
    const mappedTodos = this.state.todos.map(todo => {
      if (todo.id === markedTodo.id) {
        const completed = !todo.completed;
        return {
          ...todo,
          completed
        };
      }
      return todo;
    });
    this.setState({
      todos: mappedTodos
    });
  }

  handleMarkAll = () => {
    const todos = this.state.todos;
    let markedTodos;

    if (this.state.selectedAll) {
      markedTodos = todos.map((todo) => {
        return {
          ...todo,
          completed: true
        }
      });
    } else if (!this.state.selectedAll) {
      markedTodos = todos.map((todo) => {
        return {
          ...todo,
          completed: false
        }
      });
    }
    this.setState({
      todos: markedTodos
    });
  }

  handleSelectAll = () => {
    const status = this.state.selectedAll;
    this.handleMarkAll();
    this.setState({
      selectedAll: !status
    })
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
      todo.completed === false
    ));
    this.setState({
      todos: clearedTodos
    });
  }
  handleChangeStatus = (event) => {
    this.setState({
      status: event.target.id
    });
  }
  filterCompleted = () => {
    return this.state.todos.filter((todo) => todo.completed === true);
  }
  filterActive = () => {
    return this.state.todos.filter((todo) => todo.completed === false);
  }
  showSortedTodos = (todos, status) => {
    switch (status) {
      case 'active':
        return this.filterActive(todos);
      case 'completed':
        return this.filterCompleted(todos);
      default:
        return todos;
    }
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

  render() {
    const todos = this.showSortedTodos(this.state.todos, this.state.status);
    const activeTodos = this.filterActive(this.state.todos);
    const completedTodos = this.filterCompleted(this.state.todos);
    return (
      <div className="todos">
        <div className="header">
          <div 
            className={`main-switch ${this.state.selectedAll === true ? "marked" : ""}`}
            onClick={this.handleSelectAll}
          >
          </div>
          <CreateTodo
            todos={todos}
            add={this.createTodo}
            handleChange={this.handleChange}
          />
        </div>
        <TodoList
          todos={todos}
          handleMark={this.handleMark}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleChange={this.handleChange}
          changeTitle={this.changeTitle}
          checkEdited={this.checkEdited}
          cancelEditing={this.cancelEditing}
        />
        {todos.length > 0 &&
        <Footer 
          status={this.state.status}
          activeTodos={activeTodos}
          completedTodos={completedTodos}
          handleChangeStatus={this.handleChangeStatus}
          handleClearCompleted={this.handleClearCompleted}          
        />}
      </div>
    );
  }
}

export default Todos;
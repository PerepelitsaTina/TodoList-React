import React, { Component } from 'react';
import classnames from 'classnames'

import CreateTodo from './CreateTodo';
import Todo from './Todo';
import Footer from './Footer';
import { connect } from 'react-redux';

const storage = {
  filter: {
    key: 'filter',
    get: function () {
      try {
        const data = JSON.parse(localStorage.getItem(this.key));
        return data || 'all';
      } catch (error) {
        return 'all';
      }
    },
    set: function (data) {
      return localStorage.setItem(this.key, JSON.stringify(data));
    }
  },
  todoList: {
    key: 'todos',
    get: function () {
      try {
        const data = JSON.parse(localStorage.getItem(this.key));
        return data || [];
      } catch (error) {
        return [];
      }
    },
    set: function (data) {
      return localStorage.setItem(this.key, JSON.stringify(data));
    }
  }
};

class Todos extends Component {
  state = {
    todos: storage.todoList.get(),
    filter: storage.filter.get(),
    editedTodo: null
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.todos !== prevState.todos) {
      storage.todoList.set(this.state.todos);
    }
    if (this.state.filter !== prevState.filter) {
      storage.filter.set(this.state.filter);
    }
  }

  updateTodo = (todo) => {
    this.setState((state) => ({
      todos: state.todos.map((item) => {
        if (item.id !== todo.id) {
          return item;
        }
        return todo;
      })
    }));
  }

  // setEditedTodo = (editedTodo) => {
  //   this.setState({ editedTodo });
  // }

  // handleDoneAll = () => {
  //   const { completedCounter } = this.showFilteredTodos();
  //   const isAllCompleted = this.state.todos.length === completedCounter;
  //   const markedTodos = this.state.todos.map((todo) => {
  //     return {
  //       ...todo,
  //       isCompleted: !isAllCompleted
  //     }
  //   });
  //   this.setState({ todos: markedTodos });
  // }

  // deleteTodo = (deletedTodo) => {
  //   const filteredTodos = this.state.todos.filter(todo => {
  //     return todo.id !== deletedTodo.id;
  //   });
  //   this.setState({
  //     todos: filteredTodos
  //   });
  // }

  // handleClearCompleted = () => {
  //   const clearedTodos = this.state.todos.filter((todo) => (
  //     !todo.isCompleted
  //   ));
  //   this.setState({
  //     todos: clearedTodos
  //   });
  // }

  setFilter = (filter) => {
    this.setState({ filter });
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
    const switchClassNames = classnames(
      'main-switch',
      {
        'marked': this.state.todos.length === completedCounter && this.state.todos.length !== 0
      }
    );

    return (
      <div className="todos">
        <div className="header">
          <div
            className={switchClassNames}
            onClick={this.handleDoneAll}
          />

          <CreateTodo
            // createTodo={this.createTodo}
          />
        </div>

        <ul>
          {todos.map(todo => (
            <Todo
              todo={todo}
              key={todo.id}
              isEdited={this.state.editedTodo === todo.id}
              setEditedTodo={this.setEditedTodo}
              updateTodo={this.updateTodo}
              deleteTodo={this.deleteTodo}
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
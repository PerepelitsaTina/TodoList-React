import classnames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreateTodo from './CreateTodo';
import Footer from './Footer';
import Todo from './Todo';

import { clearCompleted, completeAllTodos } from '../store/todos/actions';
import { showFilteredTodos } from '../store/selectors/index';

class Todos extends Component {
  state = {
    editedTodo: null
  }

  setEditedTodo = (editedTodo) => {
    this.setState({ editedTodo });
  }

  getCounters = () => {
    let completedCounter = 0;
    this.props.todos.forEach((todo) => {
      if (todo.isCompleted) { completedCounter++; }
    });
    return {
      completedCounter,
      activeCounter: this.props.todos.length - completedCounter
    };
  }

  render() {
    const { activeCounter, completedCounter } = this.getCounters();
    const switchClassNames = classnames(
      'main-switch',
      {
        marked: this.props.todos.length === completedCounter
      }
    );

    return (
      <div className="todos">
        <div className="header">
          {this.props.todos.length > 0 && (
            <div
              className={switchClassNames}
              onClick={this.props.completeAllTodos}
            />
          )}

          <CreateTodo />
        </div>

        <ul>
          {this.props.filteredTodos.map((todo) => (
            <Todo
              todo={todo}
              key={todo.id}
              isEdited={this.state.editedTodo === todo.id}
              setEditedTodo={this.setEditedTodo}
            />
          ))}
        </ul>

        {this.props.todos.length > 0 && (
          <Footer
            filter={this.props.filter}
            activeCounter={activeCounter}
            completedCounter={completedCounter}
            handleClearCompleted={this.props.clearCompleted}
          />
        )}
      </div>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  completeAllTodos: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  filteredTodos: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired
};

const connectFunction = connect(
  (state) => ({
    todos: state.todosStore.todos,
    filteredTodos: showFilteredTodos(state),
    filter: state.filterStore.filter
  }),
  {
    completeAllTodos,
    clearCompleted
  }
);

export default connectFunction(Todos);

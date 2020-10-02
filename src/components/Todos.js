import classnames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { clearCompleted, completeAllTodos } from "../store/todos/actions";
import { showFilteredTodos } from "../store/selectors/index";
import CreateTodo from './CreateTodo';
import Footer from './Footer';
import Todo from './Todo';

class Todos extends Component {
  state = {
    editedTodo: null
  }

  setEditedTodo = (editedTodo) => {
    this.setState({ editedTodo });
  }

  countCompleted = () => {
    let completedCounter = 0;
    this.props.todos.forEach((todo) => {
      if (todo.isCompleted) { completedCounter++; };
    });
    return {
      completedCounter,
      activeCounter: this.props.todos.length - completedCounter
    };
  }

  render() {
    const { activeCounter, completedCounter } = this.countCompleted();
    const switchClassNames = classnames(
      'main-switch',
      {
        'marked': this.props.todos.length === completedCounter && this.props.todos.length !== 0
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
          {this.props.filteredTodos.map(todo => (
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

const mapStateToProps = state => ({
  todos: state.todosStore.todos,
  filteredTodos: showFilteredTodos(state),
  filter: state.filterStore.filter
});

const mapDispatchToProps = dispatch => ({
  completeAllTodos: () => dispatch(completeAllTodos()),
  clearCompleted: () => dispatch(clearCompleted())
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
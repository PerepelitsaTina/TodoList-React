import React, {
  Component
} from 'react';
import CreateTodo from './CreateTodo';
import TodoList from './TodoList';

let count = 0;

class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };
  }

  createTodo = (value) => {
    let newTodo = {
      id: count + 1,
      title: value,
      completed: false,
    };
    count++;
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
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

  handleDelete = (deletedTodo) => {
    const filterTodos = this.state.todos.filter(todo => {
      return todo.id !== deletedTodo.id;
    });

    this.setState({
      todos: filterTodos
    });
  }


render() {
  return ( 
    <div className="todos">
    <CreateTodo 
    add = {this.createTodo}
    /> 
    <TodoList 
    todos = {this.state.todos}
    handleMark = {this.handleMark}
    handleDelete ={this.handleDelete}
    /> 
    <div className="footer">
      <div className="footer__info">
        <p>Active: </p>
        <p>Completed: </p>
      </div>
      <div className="footer__buttons">
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
    </div>
  );
}
}

export default Todos;
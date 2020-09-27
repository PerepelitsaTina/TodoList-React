import React, { Component } from 'react';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    this.setState({
      value: this.props.todo.title
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.todo.edited !== this.props.todo.edited) {
      this.setState({
        value: this.props.todo.title
      })
    }
  } 
  
  handleEdit = () => {
    this.props.handleEdit(this.props.todo);
  }
  
  handleChangeTodo = (event) => {
    this.setState({
      value: event.target.value
    });
  }
  
  handleSubmitChanges = (event) => {
    event.preventDefault();
    this.props.changeTitle(this.state.value);
    this.setState({
      value: this.props.todo.title
    });
  }

  handleClick = (event) => {
    if (!event.target.childNodes.length) return;    // Если мы нажали на активный input 
    
    const isEdited = this.props.checkEdited()  
    if (!isEdited) return;    // Если никакая тудушка не редактируется 
    
    this.props.cancelEditing();   // Отмена режима редактирования без каких-либо изменений 
  }

  render() {
    const { handleMark, todo, handleDelete } = this.props;
    return (
      <div className="todo-wrapper" id={todo.id} onClick={this.handleClick}>
        <li className={`todo-item ${todo.completed === true ? "completed" : ""}`} id={todo.id}>
          <div 
            className={`switch ${todo.completed === true ? "marked" : ""}`}
            onClick={() => handleMark(todo)}
          ></div>
          {!todo.edited && 
            <p 
              className="todo-text"
              onDoubleClick={this.handleEdit}
            >
              {todo.title}
            </p>
          }
          {todo.edited &&
          
            <form onSubmit={this.handleSubmitChanges}>
              <input 
                className="editing-todo"
                autoFocus
                type='text'
                value={this.state.value}
                onChange={this.handleChangeTodo}
              />

            </form>
          }
        </li>
        <div 
        className="close-todo"
        onClick={() => handleDelete(todo)}
        >&#10006;
        </div>
      </div>
    );
  }
}

export default Todo;
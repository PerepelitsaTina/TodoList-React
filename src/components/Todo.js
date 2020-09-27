import React, { Component } from 'react';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.todo.title,
    };
  }

  handleEdit = () => {
    this.props.handleEdit(this.props.todo);
  }
  
  handleChangeTodo = (event) => {
    this.setState({
      value: event.target.value
    });

    console.log('handleChange')
  }
  
  handleSubmitChanges = (event) => {
    event.preventDefault();
    this.props.changeTitle(this.state.value);
    this.setState({
      value: ''
    });
  }

  handleClick = (event) => {
    if (!event.target.childNodes.length) return;
    
    const isEdited = this.props.checkEdited()
    if (!isEdited) return;    
    
    // console.log(this.props.todo.title)
    this.props.changeTitle(this.props.todo.title);
    console.log(this.props.todo.title);
    
    setTimeout(() => {
      this.setState({
        value: this.props.todo.title
      }, () => console.log(this.state))
    }, 500);
  }

  handleBlur = (e) => {
    // const handler = (event) => {
    //   console.log(event.target.id)

    //   document.removeEventListener('click', handler)
    // }
    // document.addEventListener('click', handler );


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
              // onBlur={this.handleBlur}
            />

          </form>
          }
        </li>
        <div 
        className="close-todo"
        // onClick={() => handleDelete(todo)}
        onClick={() => console.log(this.state)}
        >&#10006;
        </div>
      </div>
    );
  }
}

export default Todo;
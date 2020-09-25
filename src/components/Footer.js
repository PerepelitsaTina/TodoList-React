import React, { Component } from 'react';

class Footer extends Component {
  render() {
    const { handleChangeStatus, handleClearCompleted, activeTodos, completedTodos } = this.props;
    return (
      <div className="footer">
        <div className="footer__info">
          <p>{activeTodos.length} {activeTodos.length > 1 ? 'items' : 'item'} left</p>
          <p
            className="clear-completed"
            onClick={() => handleClearCompleted()}
          >
            Clear all completed: {completedTodos.length}
          </p>
        </div>
        <div className="footer__buttons">
          <button
            className={`footer__btn ${this.props.status === 'all' ? "active" : ""}`}
            id="all"
            onClick={handleChangeStatus}
          >All</button>
          <button
            className={`footer__btn ${this.props.status === 'active' ? "active" : ""}`}
            id="active"
            onClick={handleChangeStatus}
          >Active</button>
          <button
            className={`footer__btn ${this.props.status === 'completed' ? "active" : ""}`}
            id="completed"
            onClick={handleChangeStatus}
          >Completed</button>
        </div>
      </div>
    );
  }
}

export default Footer;

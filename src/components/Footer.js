import React, { Component } from 'react';

class Footer extends Component {
  render() {
    const { handleChangeFilter, handleClearCompleted, activeCount, completedCount } = this.props;
    return (
      <div 
        className="footer"
      >
        <div 
          className="footer__info"
        >
          <p>
            {activeCount} {activeCount > 1 ? 'items' : 'item'} left
          </p>
          <p
            className="clear-completed"
            onClick={() => handleClearCompleted()}
          >
            Clear all completed: {completedCount}
          </p>
        </div>
        <div 
          className="footer__buttons"
        >
          <button
            className={`footer__btn ${this.props.filter === 'all' ? "active" : ""}`}
            id="all"
            onClick={handleChangeFilter}
          >
            All
          </button>
          <button
            className={`footer__btn ${this.props.filter === 'active' ? "active" : ""}`}
            id="active"
            onClick={handleChangeFilter}
          >
            Active
          </button>
          <button
            className={`footer__btn ${this.props.filter === 'completed' ? "active" : ""}`}
            id="completed"
            onClick={handleChangeFilter}
          >
            Completed
          </button>
        </div>
      </div>
    );
  }
}

export default Footer;

import React, { Component } from 'react';
import FilterButton from './FilterButton';

class Footer extends Component {
  render() {
    const { setFilter, activeCounter, completedCounter, filter, handleClearCompleted } = this.props;

    return (
      <div className="footer">
        <div className="footer__info">
          <p>
            {activeCounter} {activeCounter > 1 ? 'items' : 'item'} left
          </p>
          <p
            className="clear-completed"
            onClick={handleClearCompleted}
          >
            Clear all completed: {completedCounter}
          </p>
        </div>
        <div className="footer__buttons">
          <FilterButton
            buttonName="all"
            setFilter={setFilter}
            filter={filter}
          />
          <FilterButton
            buttonName="active"
            setFilter={setFilter}
            filter={filter}
          />
          <FilterButton
            buttonName="completed"
            setFilter={setFilter}
            filter={filter}
          />
        </div>
      </div>
    );
  }
}

export default Footer;

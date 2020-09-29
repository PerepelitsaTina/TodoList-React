import React, { Component } from 'react';

class FilterButton extends Component {
  render() {
    const { buttonName, setFilter, filter } = this.props;
    return (
      <button
        className={`footer__btn ${filter === buttonName ? "active" : ""}`}
        onClick={() => setFilter(buttonName)}
      >
        {buttonName}
      </button>
    );
  }
}

export default FilterButton;

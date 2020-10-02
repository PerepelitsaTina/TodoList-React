import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

function FilterButton(props) {
  const { value, children, setFilter, filter } = props;
  const btnClass = classnames('footer__btn', {
    'active': filter === value
  })

  return (
    <button
      className={btnClass}
      onClick={() => setFilter(value)}
    >
      {children}
    </button>
  );
}

export default FilterButton;

FilterButton.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired
}
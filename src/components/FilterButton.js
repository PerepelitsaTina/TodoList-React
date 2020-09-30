import React from 'react';
import classnames from 'classnames'

function FilterButton(props) {
  const { value, children, setFilter, filter } = props;
  const btnClass = classnames({
    'footer__btn': true,
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

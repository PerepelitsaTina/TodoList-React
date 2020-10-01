import React from 'react';
import FilterButton from './FilterButton';

function Footer(props) {
  const {
    setFilter,
    activeCounter,
    completedCounter,
    filter,
    handleClearCompleted
  } = props;

  return (
    <footer className="footer">
      <div className="footer__info">
        <p>
          {activeCounter || 'No'} {activeCounter === 1 ? 'item' : 'items'} left
        </p>

        <p
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear all completed: {completedCounter}
        </p>
      </div>

      <div className="footer__buttons">
        {filterButtons.map(({ label, value }, index) => (
          <FilterButton
            key={index}
            value={value}
            setFilter={setFilter}
            filter={filter}
          >
            {label}
          </FilterButton>
        ))}
      </div>
    </footer>
  );
}

const filterButtons = [
  {
    value: 'all',
    label: 'All'
  }, {
    value: 'active',
    label: 'Active'
  }, {
    value: 'completed',
    label: 'Completed'
  }
];

export default Footer;

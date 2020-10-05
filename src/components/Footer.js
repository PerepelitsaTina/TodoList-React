import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setFilter } from '../store/filter/actions';
import { visibilityFilters } from '../store/constants/visibilityFilters';
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
    value: visibilityFilters.SHOW_ALL,
    label: 'All'
  }, {
    value: visibilityFilters.SHOW_ACTIVE,
    label: 'Active'
  }, {
    value: visibilityFilters.SHOW_COMPLETED,
    label: 'Completed'
  }
];

const mapDispatchToProps = (dispatch) => ({
  setFilter: (filter) => dispatch(setFilter(filter))
});

export default connect(null, mapDispatchToProps)(Footer);

Footer.propTypes = {
  setFilter: PropTypes.func.isRequired,
  activeCounter: PropTypes.number.isRequired,
  completedCounter: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  handleClearCompleted: PropTypes.func.isRequired
};

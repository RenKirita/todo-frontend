import React from 'react';

function FilterControls({ filterCategory, setFilterCategory, showCompleted, setShowCompleted }) {
  return (
    <div>
      <label>
        Filter by Category:
        <input
          type="text"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          placeholder="Enter category to filter"
        />
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
        />
        Show Completed Todos
      </label>
    </div>
  );
}

export default FilterControls;
import React from 'react';

interface FilterTextBoxProps {
  filterText: string;
  onFilterChange: (value: string) => void;
}

const FilterTextBox: React.FC<FilterTextBoxProps> = ({ filterText, onFilterChange }) => {
  return (
    <input
        type="text"
        placeholder="Filter by title..."
        className="form-control mb-3"
        value={filterText}
        onChange={(e) => onFilterChange(e.target.value)}
      />
  );
};

export default FilterTextBox;

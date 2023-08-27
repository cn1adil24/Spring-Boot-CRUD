import React from 'react';

const AddButton: React.FC = () => {
  return (
    <div className="d-flex justify-content-end mb-2">
      <button className="btn btn-success">+ Add Book</button>
    </div>
  );
};

export default AddButton;

import React, { useState } from 'react';
import { AddBookModel } from '../models';
import AddBookModal from './AddBookModal';

interface AddButtonProps {
  onAdd: (newBook: AddBookModel) => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onAdd }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex justify-content-end mb-2">
      <button className="btn btn-success" onClick={() => setShowModal(true)}>
        Add
      </button>
      <AddBookModal show={showModal} onClose={handleCloseModal} onAdd={onAdd} />
    </div>
  );
};

export default AddButton;

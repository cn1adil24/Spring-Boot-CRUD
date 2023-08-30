import React, { useState } from 'react';
import { AddBookModel } from '../models';
import AddBookModal from './AddBookModal';

interface ButtonsProps {
  onAdd: (newBook: AddBookModel) => void;
  onApply: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({ onAdd, onApply }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex justify-content-between mb-2">
      <button className="btn btn-success" onClick={() => setShowModal(true)}>
        Add Book
      </button>
      <AddBookModal show={showModal} onClose={handleCloseModal} onAdd={onAdd} />
      <div>
        <button className="btn btn-primary mr-2" onClick={onApply}>
          Apply filter
        </button>
      </div>
    </div>
  );
};

export default Buttons;

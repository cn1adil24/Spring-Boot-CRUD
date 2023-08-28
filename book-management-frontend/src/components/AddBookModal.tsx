import React, { useState } from 'react';
import { AddBookModel } from '../models';

interface AddBookModalProps {
  show: boolean;
  onClose: () => void;
  onAdd: (newBook: AddBookModel) => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ show, onClose, onAdd }) => {
  const [newBook, setNewBook] = useState<AddBookModel>(getEmptyBookObj());

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  
    const numberFields = ['first_publish_year', 'number_of_pages_median'];
    const newValue = numberFields.includes(name) ? parseInt(value) : value;
  
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: newValue,
    }));
  };

  const handleAddBook = () => {
    console.log(newBook);
    onAdd(newBook);
    setNewBook(getEmptyBookObj());
    onClose();
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Book</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Title:</label>
              <input type="text" className="form-control" name="title" value={newBook.title} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input type="text" className="form-control" name="author_name" value={newBook.author_name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Published Year:</label>
              <input type="number" className="form-control" name="first_publish_year" value={newBook.first_publish_year} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Pages:</label>
              <input type="number" className="form-control" name="number_of_pages_median" value={newBook.number_of_pages_median} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Image URL:</label>
              <input type="text" className="form-control" name="cover_url" value={newBook.cover_url} onChange={handleInputChange} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleAddBook}>Add Book</button>
          </div>
        </div>
      </div>
    </div>
  );
};

function getEmptyBookObj(): AddBookModel | (() => AddBookModel) {
    return {
        title: '',
        author_name: '',
        number_of_pages_median: 0,
        first_publish_year: 0,
        cover_url: ''
      };
}

export default AddBookModal;

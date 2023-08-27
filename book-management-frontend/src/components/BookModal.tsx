import React from 'react';
import { Book } from '../models';

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
}

const BookModal: React.FC<BookModalProps> = ({ book, onClose }) => {
  return (
    <div className={`modal ${book ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: book ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{book?.title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{book?.details}</div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;

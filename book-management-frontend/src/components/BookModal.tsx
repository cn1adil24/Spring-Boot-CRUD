import React from 'react';
import { Book } from '../models';

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
}

const BookModal: React.FC<BookModalProps> = ({ book, onClose }) => {
  return (
    <div className={`modal ${book ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: book ? 'block' : 'none' }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{book?.title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {book && (
            <div className="modal-body">
              <div className="row">
                <div className="col-md-4">
                  <img src={book.covers.L} alt={`${book.title} cover`} className="img-fluid" />
                </div>
                <div className="col-md-8">
                  <p><strong>Author:</strong> {book.author_name}</p>
                  <p><strong>Published Year:</strong> {book.first_publish_year}</p>
                  <p><strong>Pages:</strong> {book.number_of_pages_median}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookModal;
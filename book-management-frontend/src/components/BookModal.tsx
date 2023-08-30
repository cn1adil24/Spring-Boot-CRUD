import React, { useState } from 'react';
import { AddBookModel, Book } from '../models';

interface BookModalProps {
  book: Book | null;
  onClose: () => void;
  onEdit: (editedBook: AddBookModel) => void;
}

const BookModal: React.FC<BookModalProps> = ({ book, onClose, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState<AddBookModel>({
    title: '',
    author_name: '',
    number_of_pages_median: 0,
    first_publish_year: 0,
    cover_url: '',
  });

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedFields({
      title: book?.title || '',
      author_name: book?.author_name || '',
      number_of_pages_median: book?.number_of_pages_median || 0,
      first_publish_year: book?.first_publish_year || 0,
      cover_url: removeSizeFromCoverURL(book!.covers.L) || '',
    });
  };

  const handleSaveClick = () => {
    onEdit(editedFields);
    onClose();
    setIsEditing(false);
  };

  const handleCloseClick = () => {
    onClose();
    setIsEditing(false);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  return (
    <div className={`modal ${book ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: book ? 'block' : 'none' }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            {isEditing ? (
              <input type="text" className="form-control" name="title" value={editedFields.title} onChange={handleInputChange} form="editBookForm" required />
            ) : (
              <h5 className="modal-title">{book?.title}</h5>
            )}
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
                  {isEditing ? (
                    <form id="editBookForm" onSubmit={handleSaveClick}>
                      <div className="modal-body">
                        <div className="form-group">
                          <label>Author:</label>
                          <input type="text" className="form-control" name="author_name" value={editedFields.author_name} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                          <label>Published Year:</label>
                          <input type="number" className="form-control" name="first_publish_year" value={editedFields.first_publish_year} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                          <label>Pages:</label>
                          <input type="number" className="form-control" name="number_of_pages_median" value={editedFields.number_of_pages_median} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                          <label>Image URL:</label>
                          <input type="text" className="form-control" name="cover_url" value={editedFields.cover_url} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={handleCloseClick}>Close</button>
                      <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                    </form>
                  ) : (
                    <>
                      <p><strong>Author:</strong> {book.author_name}</p>
                      <p><strong>Published Year:</strong> {book.first_publish_year}</p>
                      <p><strong>Pages:</strong> {book.number_of_pages_median}</p>
                      <div className="modal-footer">
                        <button className="btn btn-primary" onClick={handleEditClick}>Edit</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function removeSizeFromCoverURL(url: string) {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const filenameParts = filename.split('-');
  const idPart = filenameParts[0];
  const newFilename = `${idPart}.jpg`;
  parts[parts.length - 1] = newFilename;
  const newURL = parts.join('/');
  return newURL;
}

export default BookModal;
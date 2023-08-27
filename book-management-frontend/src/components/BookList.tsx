import React from 'react';
import { Book } from '../models';

interface BookListProps {
    books: Book[];
    onRowClick: (book: Book) => void;
    onDelete: (id: number) => void;
  }
  
  const BookList: React.FC<BookListProps> = ({ books, onRowClick, onDelete }) => {
    const handleDeleteClick = (event: React.MouseEvent, id: number) => {
      // Stop the event propagation to prevent row click event
      event.stopPropagation();
  
      onDelete(id);
    };
  
    return (
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} onClick={() => onRowClick(book)}>
              <td>
                <img src={book.imageUrl} alt={`${book.title} thumbnail`} />
              </td>
              <td>{book.title}</td>
              <td>
                <button className="btn btn-danger" onClick={(e) => handleDeleteClick(e, book.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default BookList;

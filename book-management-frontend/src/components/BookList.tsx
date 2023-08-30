import React from 'react';
import { Book } from '../models';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface BookListProps {
    books: Book[];
    onRowClick: (book: Book) => void;
    onDelete: (id: number) => void;
  }
  
  const BookList: React.FC<BookListProps> = ({ books, onRowClick, onDelete }) => {
    const handleDeleteClick = (event: React.MouseEvent, id: number) => {
      event.stopPropagation();

      confirmAlert({
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this item?',
        buttons: [
          {
            label: 'Cancel',
            onClick: () => {}
          },
          {
            label: 'Delete',
            onClick: () => {
              onDelete(id);
            }
          }
        ]
      });
    }
  
    return (
    <>
      {books.length > 0 ? (
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
                <img src={book.covers.S} alt={`${book.title} thumbnail`} />
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
      ) : (
      <p className="text-center no-records-message">No records found.</p> )}
    </>
    );
  };
  
  export default BookList;

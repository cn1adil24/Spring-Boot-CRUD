import React, { useState, useEffect } from 'react';
import './App.css';
import BookList from './components/BookList';
import BookModal from './components/BookModal';
import FilterTextBox from './components/FilterTextBox';
import AddButton from './components/AddButton';
import { Book, AddBookModel, Cover, BookModel } from './models';
import { Page } from './models';
import axios from 'axios';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    populateList(setBooks);
  }, []);

  const handleRowClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleDelete = (id: number) => {
    const url = "http://localhost:8080/books/" + id;
    axios.delete(url)
      .then(() => {
        populateList(setBooks);
        alert("Successfully deleted book.");
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
        alert(`Error deleting book: ${error}`);
      })
  };

  const handleEditBook = (editBookModel: AddBookModel) => {
    const editedBook: BookModel = getBookFromAddBookModel(editBookModel);
    const url = "http://localhost:8080/books/" + selectedBook?.id;
  
    axios.put<Book>(url, editedBook)
      .then(response => {
        const updatedBook: Book = response.data;
        const updatedBooks = books.map(bookItem => bookItem.id === updatedBook.id ? updatedBook : bookItem);
        setBooks(updatedBooks);
        alert("Successfully updated book.");
      })
      .catch(error => {
        console.error("Error updating book:", error);
        alert(`Error updating book: ${error}`);
      });
  };

  const handleFilterChange = (value: string) => {
    setFilterText(value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleAddBook = (newBookModel: AddBookModel) => {
    const newBook: BookModel = getBookFromAddBookModel(newBookModel);
    const url = "http://localhost:8080/books"; 
    axios.post<Book>(url, newBook)
      .then((response) => {
        const addedBook: Book = response.data;
        setBooks([...books, addedBook]);
        alert("Successfully added book.");
      })
      .catch(error => {
        console.error("Error adding book:", error);
        alert(`Error adding book: ${error}`);
      })
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Book List</h1>
      <AddButton onAdd={handleAddBook} />
      <FilterTextBox filterText={filterText} onFilterChange={handleFilterChange} />
      <BookList books={filteredBooks} onRowClick={handleRowClick} onDelete={handleDelete} />
      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} onEdit={handleEditBook} />
    </div>
  );
};

function getBookFromAddBookModel(newBookModel: AddBookModel): BookModel {
  return {
    title: newBookModel.title,
    author_name: newBookModel.author_name,
    number_of_pages_median: newBookModel.number_of_pages_median,
    first_publish_year: newBookModel.first_publish_year,
    covers: {
      L: addSizeToCoverURL(newBookModel.cover_url, 'L'),
      M: addSizeToCoverURL(newBookModel.cover_url, 'M'),
      S: addSizeToCoverURL(newBookModel.cover_url, 'S'),
    }
  };
}

function populateList(setBooks: React.Dispatch<React.SetStateAction<Book[]>>) {
  const url = "http://localhost:8080/books?page=0&size=10";
  axios.get<Page>(url)
    .then((response) => {
      setBooks(response.data.content);
    })
    .catch(error => {
      console.error("Error loading books:", error);
    });
}

function addSizeToCoverURL(url: string, letter: string) {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  const filenameParts = filename.split('.');
  const idPart = filenameParts[0];
  const newFilename = `${idPart}-${letter}.jpg`;
  parts[parts.length - 1] = newFilename;
  const newURL = parts.join('/');
  return newURL;
}

export default App;

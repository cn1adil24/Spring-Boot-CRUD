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
    const url = "http://localhost:8080/books?page=0&size=10"; 
    axios.get<Page>(url).then((response) =>{
      setBooks(response.data.content);
    })
  }, []);

  const handleRowClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleDelete = (id: number) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  const handleFilterChange = (value: string) => {
    setFilterText(value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleAddBook = (newBookModel: AddBookModel) => {
    const newBook: BookModel = {
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
    const url = "http://localhost:8080/books"; 
    axios.post<Book>(url, newBook)
      .then((response) => {
        const addedBook: Book = response.data;
        setBooks([...books, addedBook]);
        console.log("Successfully added book.");
      })
      .catch(error => {
        console.error("Error adding book:", error);
        alert(error);
      })
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Book List</h1>
      <AddButton onAdd={handleAddBook} />
      <FilterTextBox filterText={filterText} onFilterChange={handleFilterChange} />
      <BookList books={filteredBooks} onRowClick={handleRowClick} onDelete={handleDelete} />
      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
};

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

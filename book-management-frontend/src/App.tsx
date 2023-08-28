import React, { useState, useEffect } from 'react';
import './App.css';
import BookList from './components/BookList';
import BookModal from './components/BookModal';
import FilterTextBox from './components/FilterTextBox';
import AddButton from './components/AddButton';
import { Book } from './models';
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

  return (
    <div className="container mt-4">
      <h1 className="text-center">Book List</h1>
      <AddButton />
      <FilterTextBox filterText={filterText} onFilterChange={handleFilterChange} />
      <BookList books={filteredBooks} onRowClick={handleRowClick} onDelete={handleDelete} />
      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
};

export default App;

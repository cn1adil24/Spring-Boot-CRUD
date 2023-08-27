import React, { useState } from 'react';
import './App.css';
import BookList from './components/BookList';
import BookModal from './components/BookModal';
import FilterTextBox from './components/FilterTextBox';
import AddButton from './components/AddButton';

interface Book {
  id: number;
  title: string;
  imageUrl: string;
  details: string;
}

const initialBooks: Book[] = [
  {
    id: 1,
    title: 'Book 1',
    imageUrl: 'https://via.placeholder.com/50',
    details: 'Details about Book 1',
  },
  {
    id: 2,
    title: 'Book 2',
    imageUrl: 'https://via.placeholder.com/50',
    details: 'Details about Book 2',
  }
];

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [filterText, setFilterText] = useState('');

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

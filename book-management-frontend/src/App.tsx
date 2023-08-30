import React, { useState, useEffect } from 'react';
import './App.css';
import BookList from './components/BookList';
import BookModal from './components/BookModal';
import FilterTextBox from './components/FilterTextBox';
import Buttons from './components/Buttons';
import { Book, AddBookModel, BookModel } from './models';
import { Page } from './models';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from './components/Pagination';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    populateList(0, filterText);
  }, []);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      populateList(0, filterText);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [filterText]);

  const handleRowClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleDelete = (id: number) => {
    const url = "http://localhost:8080/books/" + id;
    axios.delete(url)
      .then(() => {
        populateList(currentPage, filterText);
        toast.success("Successfully deleted book.");
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
        toast.error(`Error deleting book: ${error}`);
      })
  };

  const handleEditBook = (editBookModel: AddBookModel) => {
    const editedBook: BookModel = getBookFromAddBookModel(editBookModel);
    const url = "http://localhost:8080/books/" + selectedBook?.id;
  
    axios.put<Book>(url, editedBook)
      .then(() => {
        populateList(currentPage, filterText);
        toast.success("Successfully updated book.");
      })
      .catch(error => {
        console.error("Error updating book:", error);
        toast.error(`Error updating book: ${error}`);
      });
  };

  const handleFilterChange = (value: string) => {
    setFilterText(value);
  };

  const handleAddBook = (newBookModel: AddBookModel) => {
    const newBook: BookModel = getBookFromAddBookModel(newBookModel);
    const url = "http://localhost:8080/books"; 
    axios.post<Book>(url, newBook)
      .then((response) => {
        const addedBook: Book = response.data;
        setBooks([...books, addedBook]);
        toast.success("Successfully added book.");
      })
      .catch(error => {
        console.error("Error adding book:", error);
        toast.error(`Error adding book: ${error}`);
      })
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    populateList(page - 1, filterText);
  };

  return (
    <div className="container mt-4">
      <h1 className="fancy-title text-center">Book Management</h1>
      <FilterTextBox filterText={filterText} onFilterChange={handleFilterChange}/>
      <Buttons onAdd={handleAddBook} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <BookList books={books} onRowClick={handleRowClick} onDelete={handleDelete} />
      <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} onEdit={handleEditBook} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <ToastContainer />
    </div>
  );

  function populateList(page: number, filterText: string) {
    let url: string = `http://localhost:8080/books?page=${page}&size=10`;
    if (filterText !== null && filterText !== ''){
      url = url + `&title=${filterText}`;
    }
    axios.get<Page>(url)
      .then((response) => {
        setBooks(response.data.content);
        setCurrentPage(page);
        setTotalPages(response.data.totalPages);
        console.log("Books fetched.");
      })
      .catch(error => {
        console.error("Error loading books:", error);
      });
  }
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

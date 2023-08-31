package de.anevis.backend;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import de.anevis.backend.controller.BookController;
import de.anevis.backend.domain.Book;
import de.anevis.backend.model.BookModel;
import de.anevis.backend.service.BookService;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BackendApplicationTests {

	@InjectMocks
    private BookController bookController;

    @Mock
    private BookService bookService;
    
    @Test
    public void testFindAllBooksWithoutTitle() {
        Page<Book> mockPage = mock(Page.class);
        Pageable pageable = Pageable.unpaged();
        when(bookService.findAll(pageable)).thenReturn(mockPage);

        Page<Book> result = bookController.findAllBooks(Optional.empty(), pageable);

        assertEquals(mockPage, result);
    }

    @Test
    public void testFindAllBooksWithTitle() {
        Page<Book> mockPage = mock(Page.class);
        Pageable pageable = Pageable.unpaged();
        when(bookService.findByTitle(anyString(), eq(pageable))).thenReturn(mockPage);

        Page<Book> result = bookController.findAllBooks(Optional.of("Some Title"), pageable);

        assertEquals(mockPage, result);
    }

    @Test
    public void testGetBookById() {
        long bookId = 1L;
        Book mockBook = new Book();
        when(bookService.findById(bookId)).thenReturn(mockBook);

        Book result = bookController.getBookById(bookId);

        assertEquals(mockBook, result);
    }
    
    @Test
    public void testCreateBook() {
        BookModel bookModel = new BookModel();
        bookModel.setTitle("New Book");
        bookModel.setAuthorName("Author");

        Book mockBook = new Book();
        when(bookService.createBook(bookModel)).thenReturn(mockBook);

        Book createdBook = bookController.createBook(bookModel);

        assertEquals(mockBook, createdBook);
    }

    @Test
    public void testUpdateBook() {
        long bookId = 1L;
        BookModel bookModel = new BookModel();
        bookModel.setTitle("Updated Book");
        bookModel.setAuthorName("New Author");

        Book mockUpdatedBook = new Book();
        when(bookService.updateBook(bookId, bookModel)).thenReturn(mockUpdatedBook);

        Book updatedBook = bookController.updateBook(bookId, bookModel);

        assertEquals(mockUpdatedBook, updatedBook);
    }

    @Test
    public void testDeleteBookById() {
        long bookId = 1L;

        String result = bookController.deleteBookById(bookId);

        assertEquals("Successfully deleted", result);
        verify(bookService, times(1)).deleteById(bookId);
    }
}

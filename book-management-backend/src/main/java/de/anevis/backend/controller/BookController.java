package de.anevis.backend.controller;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import de.anevis.backend.domain.Book;
import de.anevis.backend.model.BookModel;
import de.anevis.backend.service.BookService;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public Page<Book> findAllBooks(@RequestParam Optional<String> title, Pageable page) {
        if (title.isPresent() == false) {
        	return bookService.findAll(page);
        }
        else {
        	return bookService.findByTitle(title.get(), page);
        }
    }
    
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable long id) {
    	return bookService.findById(id);
    }
    
    @DeleteMapping("/{id}")
    public String deleteBookById(@PathVariable long id) {
    	bookService.deleteById(id);
    	return "Successfully deleted";
    }
    
    @PostMapping
    public Book createBook(@RequestBody BookModel bookModel) {
    	return bookService.createBook(bookModel);
    }
    
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable long id, @RequestBody BookModel bookModel) {
    	return bookService.updateBook(id, bookModel);
    }
}

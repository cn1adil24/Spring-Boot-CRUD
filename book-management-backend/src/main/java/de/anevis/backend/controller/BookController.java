package de.anevis.backend.controller;

import de.anevis.backend.domain.Book;
import de.anevis.backend.service.BookService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public Page<Book> findAllBooks(@RequestParam(required = false) String title, Pageable page) {
        if (title == null) {
        	return bookService.findAll(page);
        }
        else {
        	return bookService.findByTitle(title, page);
        }
    }
    
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable(required = true) long id) {
    	return bookService.findById(id);
    }
    
    @DeleteMapping("/{id}")
    public String deleteBookById(@PathVariable(required = true) long id) {
    	bookService.deleteById(id);
    	return "Successfully deleted";
    }
}

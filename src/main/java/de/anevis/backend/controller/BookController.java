package de.anevis.backend.controller;

import de.anevis.backend.domain.Book;
import de.anevis.backend.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> findAllBooks() {
        return bookService.findAll();
    }

}

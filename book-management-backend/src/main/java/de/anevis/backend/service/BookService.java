package de.anevis.backend.service;

import de.anevis.backend.repository.BookRepository;
import de.anevis.backend.domain.Book;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

	private final BookRepository bookRepository;

	public BookService(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}

	public List<Book> findAll() {
		return bookRepository.findAll();
	}

}
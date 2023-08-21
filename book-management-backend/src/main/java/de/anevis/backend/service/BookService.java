package de.anevis.backend.service;

import de.anevis.backend.repository.BookRepository;
import de.anevis.backend.domain.Book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BookService {

	private final BookRepository bookRepository;

	public BookService(BookRepository bookRepository) {
		this.bookRepository = bookRepository;
	}

	public Page<Book> findAll(Pageable page) {
		return bookRepository.findAll(page);
	}

}

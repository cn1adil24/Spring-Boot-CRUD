package de.anevis.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import de.anevis.backend.domain.Book;
import de.anevis.backend.exceptions.NotFoundException;
import de.anevis.backend.model.BookModel;
import de.anevis.backend.repository.BookRepository;

@Service
public class BookService {

	private final BookRepository bookRepository;
	
	private final BookModelToEntityMapper mapper;

	public BookService(BookRepository bookRepository, BookModelToEntityMapper mapper) {
		this.bookRepository = bookRepository;
		this.mapper = mapper;
	}

	public Page<Book> findAll(Pageable page) {
		return bookRepository.findAll(page);
	}
	
	public Page<Book> findByTitle(String title, Pageable page) {
		return bookRepository.findByTitleContainingIgnoreCase(title, page);
	}

	public Book findById(long id) {
		return bookRepository.findById(id).orElseThrow(NotFoundException::new);
	}
	
	public void deleteById(long id) {
		bookRepository.deleteById(id);
	}
	
	public Book createBook(BookModel bookModel) {
		Book book = mapper.mapModelToEntity(bookModel);
		return bookRepository.save(book);
	}

	public Book updateBook(long id, BookModel bookModel) {
		Book book = mapper.mapModelToEntity(bookModel);
		book.setId(id);
		return bookRepository.save(book);
	}
}

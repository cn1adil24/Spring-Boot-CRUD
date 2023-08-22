package de.anevis.backend.repository;

import de.anevis.backend.domain.Book;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface BookRepository extends PagingAndSortingRepository<Book, Long> {
	
	Page<Book> findByTitleContainingIgnoreCase(String title, Pageable pageable);
	
	Book findById(long id);
}

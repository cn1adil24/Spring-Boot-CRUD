package de.anevis.backend.service;

import org.springframework.stereotype.Component;

import de.anevis.backend.domain.Book;
import de.anevis.backend.model.BookModel;

@Component
public class BookModelToEntityMapper {
	public Book mapModelToEntity(BookModel bookModel) {
		Book book = new Book();
		book.setTitle(bookModel.getTitle());
		book.setAuthorName(bookModel.getAuthorName());
		book.setFirstPublishYear(bookModel.getFirstPublishYear());
		book.setNumberOfPagesMedian(bookModel.getNumberOfPagesMedian());
		book.setCovers(bookModel.getCovers());
		return book;
	}
}

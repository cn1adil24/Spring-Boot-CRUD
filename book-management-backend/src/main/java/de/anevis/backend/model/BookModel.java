package de.anevis.backend.model;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import de.anevis.backend.domain.Book.BookCovers;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class BookModel {

	private String title;

	private Integer firstPublishYear;

	private Integer numberOfPagesMedian;

	private String smallCover;

	private String mediumCover;

	private String largeCover;

	private String authorName;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getFirstPublishYear() {
		return firstPublishYear;
	}

	public void setFirstPublishYear(Integer firstPublishYear) {
		this.firstPublishYear = firstPublishYear;
	}

	public Integer getNumberOfPagesMedian() {
		return numberOfPagesMedian;
	}

	public void setNumberOfPagesMedian(Integer numberOfPagesMedian) {
		this.numberOfPagesMedian = numberOfPagesMedian;
	}

	public BookCovers getCovers() {
		return new BookCovers(smallCover, mediumCover, largeCover);
	}
	
	public void setCovers(BookCovers covers) {
		this.smallCover = covers.S();
		this.mediumCover = covers.M();
		this.largeCover = covers.L();
	}

	public String getAuthorName() {
		return authorName;
	}

	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}
	
}

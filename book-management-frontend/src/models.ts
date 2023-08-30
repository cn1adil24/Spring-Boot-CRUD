export interface Book extends BookInfo {
    id: number;
    covers: Cover;
};

export interface Cover {
    L: string;
    M: string;
    S: string;
}

export interface AddBookModel extends BookInfo {
    cover_url: string;
}

interface BookInfo {
    title: string;
    author_name: string;
    number_of_pages_median: number;
    first_publish_year: number;
}

export interface BookModel extends BookInfo {
    covers: Cover;
}

export interface Page {
    content: Book[];
    first: boolean;
    last: boolean;
    empty: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
};
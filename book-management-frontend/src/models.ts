export interface Book {
    id: number;
    title: string;
    author_name: string;
    number_of_pages_median: number;
    first_publish_year: number;
    covers: Cover;
};

interface Cover {
    L: string;
    M: string;
    S: string;
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
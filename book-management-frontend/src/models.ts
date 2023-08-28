export interface Book {
    id: number;
    title: string;
    imageUrl: string;
};

export interface Page {
    content: Book[];
    first: boolean;
    last: boolean;
    empty: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
};
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages === 0)
    return null;

  const maxVisiblePages = 5;
  const pageButtons = [];

  for (let page = 1; page <= totalPages; page++) {
    if (
      page === 1 ||
      page === totalPages ||
      Math.abs(page - currentPage) <= Math.floor(maxVisiblePages / 2)
    ) {
      pageButtons.push(
        <li key={page} className={`page-item ${currentPage + 1 === page ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </button>
        </li>
      );
    } else if (page === 2 && currentPage > Math.floor(maxVisiblePages / 2) + 2) {
      pageButtons.push(<li key="start-ellipsis" className="page-item disabled"><span className="page-link">...</span></li>);
    } else if (page === totalPages - 1 && currentPage < totalPages - Math.floor(maxVisiblePages / 2) - 1) {
      pageButtons.push(<li key="end-ellipsis" className="page-item disabled"><span className="page-link">...</span></li>);
    }
  }

  return (
    <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation">
            <ul className="pagination">
            <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                <button className="page-link btn-secondary" onClick={() => onPageChange(currentPage)} disabled={currentPage === 0}>
                Previous
                </button>
            </li>
            {pageButtons}
            <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                <button className="page-link btn-secondary" onClick={() => onPageChange(currentPage + 2)} disabled={currentPage === totalPages - 1}>
                Next
                </button>
            </li>
            </ul>
        </nav>
    </div>
  );
};

export default Pagination;

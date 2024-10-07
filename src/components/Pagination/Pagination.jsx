const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="join flex justify-center mt-6">
            <button 
                onClick={() => onPageChange(currentPage - 1)} 
                className="join-item btn" 
                disabled={currentPage === 1}
            >
                «
            </button>

            <span className="join-item btn">Page {currentPage} of {totalPages}</span>

            <button 
                onClick={() => onPageChange(currentPage + 1)} 
                className="join-item btn" 
                disabled={currentPage === totalPages}
            >
                »
            </button>
        </div>
    );
};

export default Pagination;

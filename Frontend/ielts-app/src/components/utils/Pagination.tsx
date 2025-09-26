interface PaginationProps {
	totalItems: number;
	currentPage: number;
	itemsPerPage?: number;
	onPageChange: (page: number) => void;
}

function Pagination({ 
	totalItems, 
	currentPage, 
	itemsPerPage = 10, 
	onPageChange 
}: PaginationProps) {
	// Calculate total pages
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	
	// Don't render pagination if there's only one page or no items
	if (totalPages <= 1) {
		return null;
	}

	// Calculate which page numbers to show
	const getVisiblePages = () => {
		const pages: number[] = [];
		const maxVisiblePages = 5;
		
		if (totalPages <= maxVisiblePages) {
			// Show all pages if total is small
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Show pages around current page
			let start = Math.max(1, currentPage - 2);
			let end = Math.min(totalPages, currentPage + 2);
			
			// Adjust if we're near the beginning or end
			if (end - start < maxVisiblePages - 1) {
				if (start === 1) {
					end = Math.min(totalPages, start + maxVisiblePages - 1);
				} else {
					start = Math.max(1, end - maxVisiblePages + 1);
				}
			}
			
			for (let i = start; i <= end; i++) {
				pages.push(i);
			}
		}
		
		return pages;
	};

	const handlePageClick = (page: number) => {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			onPageChange(page);
		}
	};

	const visiblePages = getVisiblePages();

	return (
		<div className="row align-items-center mt-4">
			<div className="col-md-2">
				<p className="pagination-text">
					Page {currentPage} of {totalPages}
				</p>
			</div>
			<div className="col-md-10">
				<ul className="pagination lms-page justify-content-center justify-content-md-end mt-2 mt-md-0">
					{/* Previous button */}
					<li className={`page-item prev ${currentPage === 1 ? 'disabled' : ''}`}>
						<button 
							className="page-link" 
							type="button"
							tabIndex={currentPage === 1 ? -1 : 0}
							disabled={currentPage === 1}
							onClick={() => handlePageClick(currentPage - 1)}
						>
							<i className="fas fa-angle-left"></i>
						</button>
					</li>

					{/* First page if not visible */}
					{visiblePages[0] > 1 && (
						<>
							<li className="page-item">
								<button 
									className="page-link" 
									type="button"
									onClick={() => handlePageClick(1)}
								>
									1
								</button>
							</li>
							{visiblePages[0] > 2 && (
								<li className="page-item disabled">
									<span className="page-link">...</span>
								</li>
							)}
						</>
					)}

					{/* Visible page numbers */}
					{visiblePages.map((page) => (
						<li 
							key={page}
							className={`page-item ${page === currentPage ? 'active' : ''}`}
						>
							<button 
								className="page-link" 
								type="button"
								onClick={() => handlePageClick(page)}
							>
								{page}
							</button>
						</li>
					))}

					{/* Last page if not visible */}
					{visiblePages[visiblePages.length - 1] < totalPages && (
						<>
							{visiblePages[visiblePages.length - 1] < totalPages - 1 && (
								<li className="page-item disabled">
									<span className="page-link">...</span>
								</li>
							)}
							<li className="page-item">
								<button 
									className="page-link" 
									type="button"
									onClick={() => handlePageClick(totalPages)}
								>
									{totalPages}
								</button>
							</li>
						</>
					)}

					{/* Next button */}
					<li className={`page-item next ${currentPage === totalPages ? 'disabled' : ''}`}>
						<button 
							className="page-link" 
							type="button"
							tabIndex={currentPage === totalPages ? -1 : 0}
							disabled={currentPage === totalPages}
							onClick={() => handlePageClick(currentPage + 1)}
						>
							<i className="fas fa-angle-right"></i>
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Pagination;
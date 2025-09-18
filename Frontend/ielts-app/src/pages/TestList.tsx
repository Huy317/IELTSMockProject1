import { TestCardNew } from "../components/student/TestCard";
import { useEffect, useState } from "react";
import type { TestWithAuthorName } from "../types/Test";
import { useSearchParams } from "react-router-dom";
import { getFilteredTests } from "../services/testService";

function TestList() {
  const [tests, setTests] = useState<TestWithAuthorName[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 9;
  const totalPages = Math.ceil(tests.length / testsPerPage);
  const startIndex = (currentPage - 1) * testsPerPage;
  const endIndex = startIndex + testsPerPage;
  const currentTests = tests.slice(startIndex, endIndex);

  // Pagination functions
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const fetchFilteredTests = async () => {
      setLoading(true);
      try {
        const skillNames = searchParams.getAll("skillName");
        const instructorNames = searchParams.getAll("instructorName");
        const searchTerm = searchParams.get("search");
        const sortBy = searchParams.get("sort");

        const data = await getFilteredTests({
          skillName: skillNames.length > 0 ? skillNames : undefined,
          instructorName:
            instructorNames.length > 0 ? instructorNames : undefined,
          search: searchTerm || undefined,
          sort: sortBy || undefined,
        });
        setTests(data);
        
        // Reset to first page when filters change
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching filtered tests:", error);
        setTests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredTests();
  }, [searchParams]);

  return (
    <div className="row">
      {loading ? (
        <div className="col-12 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading tests...</p>
        </div>
      ) : currentTests.length > 0 ? (
        currentTests.map((test, idx) => (
          <TestCardNew
            key={test.id || idx}
            image="/assets/img/course/course-01.jpg"
            adminAvatar="/assets/img/user/user-29.jpg"
            adminName={test.instructorName.toUpperCase()}
            title={test.testName}
            rating={4.9}
            reviewCount={test.submissionCount}
            skillType={test.typeName}
          />
        ))
      ) : (
        <div className="col-12 text-center">
          <p>No tests found for the selected filters.</p>
          <p>Try adjusting your filter criteria.</p>
        </div>
      )}
      
      {/* Pagination - only show if there are tests and multiple pages */}
      {tests.length > 0 && totalPages > 1 && (
        <div className="col-md-12">
          <ul className="pagination lms-page justify-content-center justify-content-md-end mt-2 mt-md-0">
            {/* Previous button */}
            <li className={`page-item prev ${currentPage === 1 ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                tabIndex={-1}
              >
                <i className="fas fa-angle-left"></i>
              </button>
            </li>
            
            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isActive = pageNumber === currentPage;
              
              // Show first page, last page, current page, and pages around current
              const showPage = 
                pageNumber === 1 || 
                pageNumber === totalPages || 
                Math.abs(pageNumber - currentPage) <= 1;
              
              if (!showPage) {
                // Show ellipsis for gaps
                if (pageNumber === 2 && currentPage > 4) {
                  return (
                    <li key={`ellipsis-start`} className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  );
                }
                if (pageNumber === totalPages - 1 && currentPage < totalPages - 3) {
                  return (
                    <li key={`ellipsis-end`} className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  );
                }
                return null;
              }
              
              return (
                <li key={pageNumber} className={`page-item ${isActive ? 'active' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => goToPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            })}
            
            {/* Next button */}
            <li className={`page-item next ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button 
                className="page-link" 
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <i className="fas fa-angle-right"></i>
              </button>
            </li>
          </ul>
          
          {/* Page info */}
          <div className="text-center mt-2">
            <small className="text-muted">
              Showing {startIndex + 1}-{Math.min(endIndex, tests.length)} of {tests.length} tests 
              (Page {currentPage} of {totalPages})
            </small>
          </div>
        </div>
      )}

    </div>
  );
}

export default TestList;

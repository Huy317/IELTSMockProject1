import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import "../../assets/css/custom.css";
import { useEffect, useState } from "react";
import { getAllAuthorNames } from "../../services/testService";

function TestCategoriesLayout() {
  const [instructors, setInstructors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [selectedInstructor, setSelectedInstructor] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Hardcoded categories
  const categories = [
    { id: "listening", name: "Listening" },
    { id: "reading", name: "Reading" },
    { id: "writing", name: "Writing" },
    { id: "speaking", name: "Speaking" },
  ];

  useEffect(() => {
    const fetchInstructorNames = async () => {
      setLoading(true);
      try {
        const names = await getAllAuthorNames();
        setInstructors(names);
      } catch (error) {
        console.error("Error fetching instructor names:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructorNames();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    selectedCategory.forEach((category) => {
      params.append("skillName", category);
    });

    selectedInstructor.forEach((instructor) => {
      params.append("instructorName", instructor);
    });

    const newSearch = params.toString();
    navigate(`${location.pathname}?${newSearch}`, { replace: true });
  }, [JSON.stringify(selectedCategory), JSON.stringify(selectedInstructor), navigate, location.pathname]);

  return (
    <div className="course-content">
      <div className="container">
        <div className="row align-items-baseline">
          <div className="col-lg-3 theiaStickySidebar">
            <div className="filter-clear">
              <div className="clear-filter mb-4 pb-lg-2 d-flex align-items-center justify-content-between">
                <h5>
                  <i className="feather-filter me-2"></i>Filters
                </h5>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory([]);
                    setSelectedInstructor([]);
                  }}
                  className="clear-text"
                >
                  Clear
                </a>
              </div>

              <div className="accordion accordion-customicon1 accordions-items-seperate">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingcustomicon1One">
                    <a
                      href="#"
                      className="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsecustomicon1One"
                      aria-expanded="false"
                      aria-controls="collapsecustomicon1One"
                    >
                      Categories <i className="fa-solid fa-chevron-down"></i>
                    </a>
                  </h2>
                  <div
                    id="collapsecustomicon1One"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingcustomicon1One"
                    data-bs-parent="#accordioncustomicon1Example"
                  >
                    <div className="accordion-body">
                      <div>
                        <label className="custom_check">
                          <input
                            type="checkbox"
                            checked={
                              selectedCategory.length === categories.length
                            }
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategory(
                                  categories.map((cat) => cat.id)
                                );
                              } else {
                                setSelectedCategory([]);
                              }
                            }}
                          />
                          <span className="checkmark"></span> All Categories
                        </label>
                      </div>
                      {categories.map((category) => (
                        <div key={category.id}>
                          <label className="custom_check">
                            <input
                              type="checkbox"
                              name="category_filter"
                              value={category.id}
                              checked={selectedCategory.includes(category.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedCategory((prev) => [
                                    ...prev,
                                    category.id,
                                  ]);
                                } else {
                                  setSelectedCategory((prev) =>
                                    prev.filter((cat) => cat !== category.id)
                                  );
                                }
                              }}
                            />
                            <span className="checkmark"></span> {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingcustomicon1Two">
                    <a
                      href="#"
                      className="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsecustomicon1Two"
                      aria-expanded="false"
                      aria-controls="collapsecustomicon1Two"
                    >
                      Instructors<i className="fa-solid fa-chevron-down"></i>
                    </a>
                  </h2>
                  <div
                    id="collapsecustomicon1Two"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingcustomicon1Two"
                    data-bs-parent="#accordioncustomicon1Example"
                  >
                    <div className="accordion-body">
                      {loading ? (
                        <div>Loading instructors...</div>
                      ) : (
                        <>
                          <div>
                            <label className="custom_check">
                              <input
                                type="checkbox"
                                checked={
                                  selectedInstructor.length ===
                                  instructors.length
                                }
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedInstructor([...instructors]);
                                  } else {
                                    setSelectedInstructor([]);
                                  }
                                }}
                              />
                              <span className="checkmark"></span> All
                              Instructors
                            </label>
                          </div>
                          {instructors.map((instructor, index) => (
                            <div key={index}>
                              <label className="custom_check">
                                <input
                                  type="checkbox"
                                  name="instructor_filter"
                                  value={instructor}
                                  checked={selectedInstructor.includes(
                                    instructor
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedInstructor((prev) => [
                                        ...prev,
                                        instructor,
                                      ]);
                                    } else {
                                      setSelectedInstructor((prev) =>
                                        prev.filter(
                                          (inst) => inst !== instructor
                                        )
                                      );
                                    }
                                  }}
                                />
                                <span className="checkmark"></span> {instructor}
                              </label>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="showing-list mb-4">
              <div className="row align-items-center">
                <div className="col-lg-4">
                  <div className="show-result text-center text-lg-start">
                    <h6 className="fw-medium">Showing 1-9 of 50 results</h6>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="show-filter add-course-info">
                    <form action="#">
                      <div className="d-sm-flex justify-content-center justify-content-lg-end mb-1 mb-lg-0">
                        <div className="view-icons mb-2 mb-sm-0">
                          <NavLink
                            to="/course-grid"
                            className="grid-view active"
                          >
                            <i className="feather-grid"></i>
                          </NavLink>
                          <NavLink to="/course-list" className="list-view">
                            <i className="isax isax-task"></i>
                          </NavLink>
                        </div>
                        <select className="form-select">
                          <option>Newly Published</option>
                          <option>Most Attempts</option>
                          <option>Top Rated</option>
                        </select>
                        <div className="search-group">
                          <i className="isax isax-search-normal-1"></i>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestCategoriesLayout;

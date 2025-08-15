import { Outlet, NavLink } from "react-router-dom";
import "../../assets/css/custom.css";

function TestCategoriesLayout() {
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
                <a onClick={(e) => e.preventDefault()} className="clear-text">
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
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span> Backend (3)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span> CSS (2)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span> Frontend (2)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span> General (2)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input
                            type="checkbox"
                            name="select_specialist"
                            defaultChecked
                          />
                          <span className="checkmark"></span> IT & Software (2)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span> Photography (2)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span> Programming
                          Language (3)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check mb-0">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span> Technology (2)
                        </label>
                      </div>
                      <a
                        onClick={(e) => e.preventDefault()}
                        className="see-more-btn"
                      >
                        See More
                      </a>
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
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span> Keny White (10)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span> Hinata Hyuga (5)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span> John Doe (3)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check mb-0">
                          <input
                            type="checkbox"
                            name="select_specialist"
                            defaultChecked
                          />
                          <span className="checkmark"></span> Nicole Brown
                        </label>
                      </div>
                      <a href="javascript:void(0);" className="see-more-btn">
                        See More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingcustomicon1Three">
                    <a
                      href="#"
                      className="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsecustomicon1Three"
                      aria-expanded="false"
                      aria-controls="collapsecustomicon1Three"
                    >
                      Price<i className="fa-solid fa-chevron-down"></i>
                    </a>
                  </h2>
                  <div
                    id="collapsecustomicon1Three"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingcustomicon1Three"
                    data-bs-parent="#accordioncustomicon1Example"
                  >
                    <div className="accordion-body">
                      <div>
                        <label className="custom_check custom_one">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span> All (10)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check custom_one">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span> Free (5)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check custom_one mb-0">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span> Paid (3)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="accordion-item">
                  <h2 className="accordion-header" id="headingcustomicon1Four">
                    <a
                      href="#"
                      className="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsecustomicon1Four"
                      aria-expanded="false"
                      aria-controls="collapsecustomicon1Four"
                    >
                      Range<i className="fa-solid fa-chevron-down"></i>
                    </a>
                  </h2>
                  <div
                    id="collapsecustomicon1Four"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingcustomicon1Four"
                    data-bs-parent="#accordioncustomicon1Example"
                  >
                    <div className="accordion-body">
                      <div className="filter-range">
                        <input type="text" className="input-range" />
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingcustomicon1Five">
                    <a
                      href="#"
                      className="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsecustomicon1Five"
                      aria-expanded="false"
                      aria-controls="collapsecustomicon1Five"
                    >
                      Level<i className="fa-solid fa-chevron-down"></i>
                    </a>
                  </h2>
                  <div
                    id="collapsecustomicon1Five"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingcustomicon1Five"
                    data-bs-parent="#accordioncustomicon1Example"
                  >
                    <div className="accordion-body">
                      <div>
                        <label className="custom_check custom_one">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span>Beginner (10)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check custom_one">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span> Intermediate (5)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check custom_one">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span>Advanced (21)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check custom_one mb-0">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span>Expert (3)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingcustomicon1Six">
                    <a
                      href="#"
                      className="accordion-button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapsecustomicon1Six"
                      aria-expanded="false"
                      aria-controls="collapsecustomicon1Six"
                    >
                      Reviews <i className="fa-solid fa-chevron-down"></i>
                    </a>
                  </h2>
                  <div
                    id="collapsecustomicon1Six"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingcustomicon1Six"
                    data-bs-parent="#accordioncustomicon1Example"
                  >
                    <div className="accordion-body">
                      <div>
                        <label className="custom_check custom_one">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span>
                          <i className="fa-solid fa-star text-warning me-1"></i>
                          <i className="fa-solid fa-star text-warning me-1"></i>
                          <i className="fa-solid fa-star text-warning me-1"></i>
                          <i className="fa-solid fa-star text-warning me-1"></i>
                          <i className="fa-solid fa-star text-warning"></i>
                        </label>
                      </div>
                      <div>
                        <label className="custom_check custom_one">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span>
                          <i className="fa-solid fa-star text-warning me-1"></i>
                          <i className="fa-solid fa-star text-warning me-1"></i>
                          <i className="fa-solid fa-star text-warning me-1"></i>
                          <i className="fa-solid fa-star text-warning me-1"></i>
                          <i className="fa-solid fa-star text-light"></i>
                        </label>
                      </div>
                      <div>
                        <label className="custom_check custom_one">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span>
                          <i className="fa-solid fa-star text-warning me-1"></i>
                          <i className="fa-solid fa-star text-warning me-1"></i>
                          <i className="fa-solid fa-star text-warning me-1"></i>
                          <i className="fa-solid fa-star text-light me-1"></i>
                          <i className="fa-solid fa-star text-light"></i>
                        </label>
                      </div>
                      <div>
                        <label className="custom_check custom_one">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span>
                          <i className="fa-solid fa-star text-warning me-1"></i>
                          <i className="fa-solid fa-star text-warning me-1"></i>
                          <i className="fa-solid fa-star text-light me-1"></i>
                          <i className="fa-solid fa-star text-light me-1"></i>
                          <i className="fa-solid fa-star text-light"></i>
                        </label>
                      </div>
                      <div>
                        <label className="custom_check custom_one mb-0">
                          <input type="checkbox" name="select_specialist" />
                          <span className="checkmark"></span>
                          <i className="fa-solid fa-star text-warning me-1"></i>
                          <i className="fa-solid fa-star text-light me-1"></i>
                          <i className="fa-solid fa-star text-light me-1"></i>
                          <i className="fa-solid fa-star text-light me-1"></i>
                          <i className="fa-solid fa-star text-light"></i>
                        </label>
                      </div>
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
                          <option>Trending Courses</option>
                          <option>Top Rated</option>
                          <option>Free Courses</option>
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

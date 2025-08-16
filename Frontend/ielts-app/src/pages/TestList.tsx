import { Link } from "react-router-dom";

function TestList() {
  return (
    <div className="row">
      <div className="col-xl-4 col-md-6">
        <div className="course-item-two course-item mx-0">
          <div className="course-img">
            <Link to="/course-details">
              <img
                src="../assets/img/course/course-01.jpg"
                alt="img"
                className="img-fluid"
              />
            </Link>
            <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-3">
              <div className="badge text-bg-danger">15% off</div>
              <Link to="#" className="fav-icon ms-auto">
                <i className="isax isax-heart"></i>
              </Link>
            </div>
          </div>
          <div className="course-content">
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex align-items-center">
                <Link to="/instructor-details" className="avatar avatar-sm">
                  <img
                    src="../assets/img/user/user-29.jpg"
                    alt="img"
                    className="img-fluid avatar avatar-sm rounded-circle"
                  />
                </Link>
                <div className="ms-2">
                  <Link to="/instructor-details" className="link-default fs-14">
                    Brenda Slaton
                  </Link>
                </div>
              </div>
              <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">
                Design
              </span>
            </div>
            <h6 className="title mb-2">
              <Link to="/course-details">
                Information About UI/UX Design Degree
              </Link>
            </h6>
            <p className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-star text-warning me-2"></i>4.9 (200
              Reviews)
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="text-secondary mb-0">$120</h5>
              <Link
                to="/course-details"
                className="btn btn-dark btn-sm d-inline-flex align-items-center"
              >
                View Course<i className="isax isax-arrow-right-3 ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-md-6">
        <div className="course-item-two course-item mx-0">
          <div className="course-img">
            <Link to="/course-details">
              <img
                src="../assets/img/course/course-02.jpg"
                alt="img"
                className="img-fluid"
              />
            </Link>
            <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-3">
              <Link to="#" className="fav-icon ms-auto">
                <i className="isax isax-heart"></i>
              </Link>
            </div>
          </div>
          <div className="course-content">
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex align-items-center">
                <Link to="/instructor-details" className="avatar avatar-sm">
                  <img
                    src="../assets/img/user/user-30.jpg"
                    alt="img"
                    className="img-fluid avatar avatar-sm rounded-circle"
                  />
                </Link>
                <div className="ms-2">
                  <Link to="/instructor-details" className="link-default fs-14">
                    Ana Reyes
                  </Link>
                </div>
              </div>
              <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">
                Wordpress
              </span>
            </div>
            <h6 className="title mb-2">
              <Link to="/course-details">
                Wordpress for Beginners - Master Wordpress Quickly
              </Link>
            </h6>
            <p className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-star text-warning me-2"></i>4.4 (160
              Reviews)
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="text-secondary mb-0">$140</h5>
              <Link
                to="/course-details"
                className="btn btn-dark btn-sm d-inline-flex align-items-center"
              >
                View Course<i className="isax isax-arrow-right-3 ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-md-6">
        <div className="course-item-two course-item mx-0">
          <div className="course-img">
            <Link to="/course-details">
              <img
                src="../assets/img/course/course-03.jpg"
                alt="img"
                className="img-fluid"
              />
            </Link>
            <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-3">
              <Link to="#" className="fav-icon ms-auto">
                <i className="isax isax-heart"></i>
              </Link>
            </div>
          </div>
          <div className="course-content">
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex align-items-center">
                <Link to="/instructor-details" className="avatar avatar-sm">
                  <img
                    src="../assets/img/user/user-31.jpg"
                    alt="img"
                    className="img-fluid avatar avatar-sm rounded-circle"
                  />
                </Link>
                <div className="ms-2">
                  <Link to="/instructor-details" className="link-default fs-14">
                    Andrew Pirtle
                  </Link>
                </div>
              </div>
              <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">
                Design
              </span>
            </div>
            <h6 className="title mb-2">
              <Link to="/course-details">
                Sketch from A to Z (2024): Become an app designer
              </Link>
            </h6>
            <p className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-star text-warning me-2"></i>4.4 (160
              Reviews)
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="text-secondary mb-0">$140</h5>
              <Link
                to="/course-details"
                className="btn btn-dark btn-sm d-inline-flex align-items-center"
              >
                View Course<i className="isax isax-arrow-right-3 ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-md-6">
        <div className="course-item-two course-item mx-0">
          <div className="course-img">
            <Link to="/course-details">
              <img
                src="../assets/img/course/course-04.jpg"
                alt="img"
                className="img-fluid"
              />
            </Link>
            <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-3">
              <Link to="#" className="fav-icon ms-auto">
                <i className="isax isax-heart"></i>
              </Link>
            </div>
          </div>
          <div className="course-content">
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex align-items-center">
                <Link to="/instructor-details" className="avatar avatar-sm">
                  <img
                    src="../assets/img/user/user-32.jpg"
                    alt="img"
                    className="img-fluid avatar avatar-sm rounded-circle"
                  />
                </Link>
                <div className="ms-2">
                  <Link to="/instructor-details" className="link-default fs-14">
                    Christy Garner
                  </Link>
                </div>
              </div>
              <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">
                Programming
              </span>
            </div>
            <h6 className="title mb-2">
              <Link to="/course-details">
                Build Responsive Real World Websites with Crash Course
              </Link>
            </h6>
            <p className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-star text-warning me-2"></i>4.2 (220
              Reviews)
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="text-secondary mb-0">$200</h5>
              <Link
                to="/course-details"
                className="btn btn-dark btn-sm d-inline-flex align-items-center"
              >
                View Course<i className="isax isax-arrow-right-3 ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-md-6">
        <div className="course-item-two course-item mx-0">
          <div className="course-img">
            <Link to="/course-details">
              <img
                src="../assets/img/course/course-05.jpg"
                alt="img"
                className="img-fluid"
              />
            </Link>
            <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-3">
              <Link to="#" className="fav-icon ms-auto">
                <i className="isax isax-heart"></i>
              </Link>
            </div>
          </div>
          <div className="course-content">
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex align-items-center">
                <Link to="/instructor-details" className="avatar avatar-sm">
                  <img
                    src="../assets/img/user/user-32.jpg"
                    alt="img"
                    className="img-fluid avatar avatar-sm rounded-circle"
                  />
                </Link>
                <div className="ms-2">
                  <Link to="/instructor-details" className="link-default fs-14">
                    Justin Gregory
                  </Link>
                </div>
              </div>
              <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">
                Programming
              </span>
            </div>
            <h6 className="title mb-2">
              <Link to="/course-details">
                Learn JavaScript and Express to become a Expert
              </Link>
            </h6>
            <p className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-star text-warning me-2"></i>4.4 (180
              Reviews)
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="text-secondary mb-0">$130</h5>
              <Link
                to="/course-details"
                className="btn btn-dark btn-sm d-inline-flex align-items-center"
              >
                View Course<i className="isax isax-arrow-right-3 ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-md-6">
        <div className="course-item-two course-item mx-0">
          <div className="course-img">
            <Link to="/course-details">
              <img
                src="../assets/img/course/course-06.jpg"
                alt="img"
                className="img-fluid"
              />
            </Link>
            <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-3">
              <Link to="#" className="fav-icon ms-auto">
                <i className="isax isax-heart"></i>
              </Link>
            </div>
          </div>
          <div className="course-content">
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex align-items-center">
                <Link to="/instructor-details" className="avatar avatar-sm">
                  <img
                    src="../assets/img/user/user-33.jpg"
                    alt="img"
                    className="img-fluid avatar avatar-sm rounded-circle"
                  />
                </Link>
                <div className="ms-2">
                  <Link to="/instructor-details" className="link-default fs-14">
                    Carolyn Hines
                  </Link>
                </div>
              </div>
              <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">
                Programming
              </span>
            </div>
            <h6 className="title mb-2">
              <Link to="/course-details">
                Introduction to Python Programming
              </Link>
            </h6>
            <p className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-star text-warning me-2"></i>4.4 (180
              Reviews)
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="text-secondary mb-0">$130</h5>
              <Link
                to="/course-details"
                className="btn btn-dark btn-sm d-inline-flex align-items-center"
              >
                View Course<i className="isax isax-arrow-right-3 ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-md-6">
        <div className="course-item-two course-item mx-0">
          <div className="course-img">
            <Link to="/course-details">
              <img
                src="../assets/img/course/course-07.jpg"
                alt="img"
                className="img-fluid"
              />
            </Link>
            <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-3">
              <Link to="#" className="fav-icon ms-auto">
                <i className="isax isax-heart"></i>
              </Link>
            </div>
          </div>
          <div className="course-content">
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex align-items-center">
                <Link to="/instructor-details" className="avatar avatar-sm">
                  <img
                    src="../assets/img/user/user-34.jpg"
                    alt="img"
                    className="img-fluid avatar avatar-sm rounded-circle"
                  />
                </Link>
                <div className="ms-2">
                  <Link to="/instructor-details" className="link-default fs-14">
                    Rafael Miller
                  </Link>
                </div>
              </div>
              <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">
                Programming
              </span>
            </div>
            <h6 className="title mb-2">
              <Link to="/course-details">
                Build Responsive Websites with HTML5 and CSS3
              </Link>
            </h6>
            <p className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-star text-warning me-2"></i>4.4 (180
              Reviews)
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="text-secondary mb-0">$170</h5>
              <Link
                to="/course-details"
                className="btn btn-dark btn-sm d-inline-flex align-items-center"
              >
                View Course<i className="isax isax-arrow-right-3 ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-md-6">
        <div className="course-item-two course-item mx-0">
          <div className="course-img">
            <Link to="/course-details">
              <img
                src="../assets/img/course/course-08.jpg"
                alt="img"
                className="img-fluid"
              />
            </Link>
            <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-3">
              <Link to="#" className="fav-icon ms-auto">
                <i className="isax isax-heart"></i>
              </Link>
            </div>
          </div>
          <div className="course-content">
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex align-items-center">
                <Link to="/instructor-details" className="avatar avatar-sm">
                  <img
                    src="../assets/img/user/user-35.jpg"
                    alt="img"
                    className="img-fluid avatar avatar-sm rounded-circle"
                  />
                </Link>
                <div className="ms-2">
                  <Link to="/instructor-details" className="link-default fs-14">
                    Nancy Duarte
                  </Link>
                </div>
              </div>
              <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">
                Design
              </span>
            </div>
            <h6 className="title mb-2">
              <Link to="/course-details">
                Information About Photoshop Design Degree
              </Link>
            </h6>
            <p className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-star text-warning me-2"></i>4.4 (180
              Reviews)
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="text-secondary mb-0">$170</h5>
              <Link
                to="/course-details"
                className="btn btn-dark btn-sm d-inline-flex align-items-center"
              >
                View Course<i className="isax isax-arrow-right-3 ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-md-6">
        <div className="course-item-two course-item mx-0">
          <div className="course-img">
            <Link to="/course-details">
              <img
                src="../assets/img/course/course-09.jpg"
                alt="img"
                className="img-fluid"
              />
            </Link>
            <div className="position-absolute start-0 top-0 d-flex align-items-start w-100 z-index-2 p-3">
              <Link to="#" className="fav-icon ms-auto">
                <i className="isax isax-heart"></i>
              </Link>
            </div>
          </div>
          <div className="course-content">
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex align-items-center">
                <Link to="/instructor-details" className="avatar avatar-sm">
                  <img
                    src="../assets/img/user/user-36.jpg"
                    alt="img"
                    className="img-fluid avatar avatar-sm rounded-circle"
                  />
                </Link>
                <div className="ms-2">
                  <Link to="/instructor-details" className="link-default fs-14">
                    James Kagan
                  </Link>
                </div>
              </div>
              <span className="badge badge-light rounded-pill bg-light d-inline-flex align-items-center fs-13 fw-medium mb-0">
                Design
              </span>
            </div>
            <h6 className="title mb-2">
              <Link to="/course-details">
                C# Developers Double Your Coding with Visual Studio
              </Link>
            </h6>
            <p className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-star text-warning me-2"></i>4.4 (180
              Reviews)
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="text-secondary mb-0">$180</h5>
              <Link
                to="/course-details"
                className="btn btn-dark btn-sm d-inline-flex align-items-center"
              >
                View Course<i className="isax isax-arrow-right-3 ms-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

        <div className="col-md-2">
          <p className="pagination-text">Page 1 of 2</p>
        </div>
        <div className="col-md-10">
          <ul className="pagination lms-page justify-content-center justify-content-md-end mt-2 mt-md-0">
            <li className="page-item prev">
              <Link className="page-link" to="#" tabIndex={-1}>
                <i className="fas fa-angle-left"></i>
              </Link>
            </li>
            <li className="page-item first-page active">
              <Link className="page-link" to="#">
                1
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="#">
                2
              </Link>
            </li>
            <li className="page-item">
              <Link className="page-link" to="#">
                3
              </Link>
            </li>
            <li className="page-item next">
              <Link className="page-link" to="#">
                <i className="fas fa-angle-right"></i>
              </Link>
            </li>
          </ul>
        </div>
    </div>
  );
}

export default TestList;

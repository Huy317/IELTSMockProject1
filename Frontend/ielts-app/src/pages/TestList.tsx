import { Link } from "react-router-dom";
import TestCard, { TestCardNew } from "../components/student/TestCard";
import { useEffect, useState } from "react";
import type { Test } from "../types/Test";
import { getTests } from "../services/testService";

function TestList() {
  const [tests, setTests] = useState<Test[]>([]);

  const fetchTests = async () => {
    const data = await getTests();
    setTests(data);
  }

  useEffect(() => {
    fetchTests();
  }, [])

  return (
    <div className="row">
      {tests.map((test, idx) => (
          <TestCardNew key={idx}
            image="/assets/img/course/course-01.jpg"
            adminAvatar="/assets/img/user/user-29.jpg"
            adminName= {test.createdBy.toString()+"LATER"}
            title={test.testName}
            rating={4.9}
            reviewCount={200}
            skillType = {test.testName.toLowerCase().includes("listening") ? "Listening" : "Reading"}
          />
      ))}
      {/* <div className="col-xl-4 col-md-6">
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
                Listening
              </span>
            </div>
            <h6 className="title mb-2">
              <Link to="/course-details">IELTS LISTENING TEST 1</Link>
            </h6>
            <p className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-star text-warning me-2"></i>4.9 (200
              Attempts)
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <Link
                to="/course-details"
                className="btn btn-dark btn-sm d-inline-flex align-items-center"
              >
                View Test<i className="isax isax-arrow-right-3 ms-1"></i>
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
                Reading
              </span>
            </div>
            <h6 className="title mb-2">
              <Link to="/course-details">IELTS READING TEST 2</Link>
            </h6>
            <p className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-star text-warning me-2"></i>4.4 (160
              Attempts)
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <Link
                to="/course-details"
                className="btn btn-dark btn-sm d-inline-flex align-items-center"
              >
                View Test<i className="isax isax-arrow-right-3 ms-1"></i>
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
                Reading
              </span>
            </div>
            <h6 className="title mb-2">
              <Link to="/course-details">IELTS READING TEST 3</Link>
            </h6>
            <p className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-star text-warning me-2"></i>4.4 (100
              Attempts)
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <Link
                to="/course-details"
                className="btn btn-dark btn-sm d-inline-flex align-items-center"
              >
                View Test<i className="isax isax-arrow-right-3 ms-1"></i>
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
      </div> */}
    </div>
  );
}

export default TestList;

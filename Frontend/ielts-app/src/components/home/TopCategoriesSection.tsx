import { Link } from 'react-router-dom';

function TopCategoriesSection() {
  return (
    <section className="top-courses-sec">
      <img className="top-courses-bg" src="/assets/img/bg/bg-20.png" alt="img" />
      <div className="container">
        <div className="section-header text-center">
          <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">
            Test Categories
          </span>
          <h2>IELTS Test Sections & Skills</h2>
          <p>
            Practice all four skills of IELTS with our comprehensive mock tests designed to simulate real exam conditions
          </p>
        </div>
        <div className="top-courses-slider lazy">
            {/* TODO: Change the icons reflect skills 
                and change Link paths to new routes
            */}
          <div>
            <div className="categories-item categories-item-three mb-0">
              <img className="mx-auto" src="/assets/img/category/icons/icon-6.svg" alt="img" />
              <h6 className="title">
                <Link to="/test/listening">Listening</Link>
              </h6>
            </div>
          </div>
          <div>
            <div className="categories-item categories-item-three mb-0">
              <img className="mx-auto" src="/assets/img/category/icons/icon-7.svg" alt="img" />
              <h6 className="title">
                <Link to="/test/reading">Reading</Link>
              </h6>
            </div>
          </div>
          <div>
            <div className="categories-item categories-item-three mb-0">
              <img className="mx-auto" src="/assets/img/category/icons/icon-8.svg" alt="img" />
              <h6 className="title">
                <Link to="/test/writing">Writing</Link>
              </h6>
            </div>
          </div>
          <div>
            <div className="categories-item categories-item-three mb-0">
              <img className="mx-auto" src="/assets/img/category/icons/icon-9.svg" alt="img" />
              <h6 className="title">
                <Link to="/test/speaking">Speaking</Link>
              </h6>
            </div>
          </div>
          <div>
            <div className="categories-item categories-item-three mb-0">
              <img className="mx-auto" src="/assets/img/category/icons/icon-10.svg" alt="img" />
              <h6 className="title">
                <Link to="/test/full-test">Full Test</Link>
              </h6>
            </div>
          </div>
          <div>
            <div className="categories-item categories-item-three mb-0">
              <img className="mx-auto" src="/assets/img/category/icons/icon-11.svg" alt="img" />
              <h6 className="title">
                <Link to="/test/practice">Practice Tests</Link>
              </h6>
            </div>
          </div>
          <div>
            <div className="categories-item categories-item-three mb-0">
              <img className="mx-auto" src="/assets/img/category/icons/icon-6.svg" alt="img" />
              <h6 className="title">
                <Link to="/test/academic">Academic Module</Link>
              </h6>
            </div>
          </div>
          {/* <div>
            <div className="categories-item categories-item-three mb-0">
              <img className="mx-auto" src="/assets/img/category/icons/icon-7.svg" alt="img" />
              <h6 className="title">
                <Link to="/test/general">General Module</Link>
              </h6>
            </div>
          </div> */}
        </div>
        <Link to="/tests" className="btn btn-primary btn-md">
          View All Tests
        </Link>
      </div>
    </section>
  );
}

export default TopCategoriesSection;

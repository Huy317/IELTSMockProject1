import { Link } from 'react-router-dom';

import Slider from 'react-slick';

function TopCategoriesSection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };
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
        <Slider {...settings} className="top-courses-slider">
          {/* TODO: Change the icons reflect skills 
                and change Link paths to new routes
            */}
          <div>
            <div className="categories-item categories-item-three mb-0">
              <img className="mx-auto" src="/assets/img/category/icons/listening.png" alt="img" />
              <h6 className="title">
                <Link to="/test/listening">Listening</Link>
              </h6>
            </div>
          </div>
          <div>
            <div className="categories-item categories-item-three mb-0">
              <img className="mx-auto" src="/assets/img/category/icons/reading.png" alt="img" />
              <h6 className="title">
                <Link to="/test/reading">Reading</Link>
              </h6>
            </div>
          </div>
          <div>
            <div className="categories-item categories-item-three mb-0">
              <img className="mx-auto" src="/assets/img/category/icons/writing.png" alt="img" />
              <h6 className="title">
                <Link to="/test/writing">Writing</Link>
              </h6>
            </div>
          </div>
          <div>
            <div className="categories-item categories-item-three mb-0">
              <img className="mx-auto" src="/assets/img/category/icons/speaking.png" alt="img" />
              <h6 className="title">
                <Link to="/test/speaking">Speaking</Link>
              </h6>
            </div>
          </div>
          <div>
            <div className="categories-item categories-item-three mb-0">
              <img className="mx-auto" src="/assets/img/category/icons/test.png" alt="img" />
              <h6 className="title">
                <Link to="/test/full-test">Full Test</Link>
              </h6>
            </div>
          </div>
          <div>
            <div className="categories-item categories-item-three mb-0">
              <img className="mx-auto" src="/assets/img/category/icons/test.png" alt="img" />
              <h6 className="title">
                <Link to="/test/practice">Practice Tests</Link>
              </h6>
            </div>
          </div>
          <div>
            <div className="categories-item categories-item-three mb-0">
              <img className="mx-auto" src="/assets/img/category/icons/academic.png" alt="img" />
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
        </Slider>
        <Link to="/test/list" className="btn btn-primary btn-md">
          View All Tests
        </Link>
      </div>
    </section >
  );
}

export default TopCategoriesSection;

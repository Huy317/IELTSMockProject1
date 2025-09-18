import { Link } from 'react-router-dom';

function CommunitySection() {
  return (
    <section className="community-to-learn">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="section-header">
              <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">
                IELTS Community
              </span>
              <h2>Join thousands of successful IELTS test takers.</h2>
              <p>
                Connect with a global community of IELTS learners and achieve your English proficiency goals with our comprehensive mock test platform.
              </p>
            </div>
            <div className="community-item d-flex align-items-center">
              <span className="community-icon-1">
                <i className="isax isax-global"></i>
              </span>
              <div>
                <h5 className="mb-2">Practice Anywhere, Anytime</h5>
                <p className="mb-0">
                  Access unlimited IELTS mock tests from any device, anywhere in the world. Practice at your own pace and convenience.
                </p>
              </div>
            </div>
            <div className="community-item d-flex align-items-center">
              <span className="community-icon-2">
                <i className="isax isax-teacher"></i>
              </span>
              <div>
                <h5 className="mb-2">Expert-Designed Content</h5>
                <p className="mb-0">
                  Our mock tests are created by experienced IELTS instructors and follow the official test format and difficulty levels.
                </p>
              </div>
            </div>
            <div className="community-item d-flex align-items-center">
              <span className="community-icon-3">
                <i className="isax isax-chart-success"></i>
              </span>
              <div>
                <h5 className="mb-2">Track Your Progress</h5>
                <p className="mb-0">
                  Monitor your improvement with detailed performance analytics and get personalized recommendations for better scores.
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Link to="/register" className="btn btn-secondary btn-md">
                Start Free Practice
              </Link>
              <Link to="/about-us" className="btn btn-dark btn-md">
                Learn More
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="community-img d-none d-lg-flex">
              <img src="/assets/img/shapes/shape-5.png" alt="Decorative shape" className="img-fluid community-img-01" />
              <img src="/assets/img/shapes/shape-6.png" alt="Decorative shape" className="img-fluid community-img-02" />
              <img src="/assets/img/feature/feature-2.jpg" alt="IELTS study session" className="img-fluid community-img-03" />
              <img src="/assets/img/feature/feature-3.jpg" alt="IELTS test preparation" className="img-fluid community-img-04" />
              <img src="/assets/img/shapes/shape-7.svg" alt="Decorative element" className="img-fluid community-img-05" />
              <div className="community-count p-2">
                <div className="enrolled-list">
                  <div className="avatar-list-stacked mb-2">
                    <span className="avatar avatar-rounded">
                      <img className="border border-white" src="/assets/img/user/user-01.jpg" alt="IELTS student" />
                    </span>
                    <span className="avatar avatar-rounded">
                      <img className="border border-white" src="/assets/img/user/user-03.jpg" alt="IELTS student" />
                    </span>
                    <span className="avatar avatar-rounded">
                      <img className="border border-white" src="/assets/img/user/user-07.jpg" alt="IELTS student" />
                    </span>
                    <span className="avatar avatar-rounded">
                      <img className="border border-white" src="/assets/img/user/user-08.jpg" alt="IELTS student" />
                    </span>
                    <span className="avatar avatar-rounded">
                      <img src="/assets/img/user/user-06.jpg" alt="IELTS student" />
                    </span>
                  </div>
                  <p className="mb-0">
                    <span className="text-secondary">50K+</span> Test Takers Joined
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommunitySection;

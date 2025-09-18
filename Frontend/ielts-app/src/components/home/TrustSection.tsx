import { Link } from 'react-router-dom';

function TrustSection() {
  return (
    <section className="trust-sec">
      <div className="container">
        <div className="video-showcase">
          <img src="/assets/img/feature/feature-1.jpg" className="img-fluid w-100 rounded-2" alt="IELTS test preparation" />
          <div className="video-play">
            <a href="https://www.youtube.com/embed/1trvO6dqQUI" data-fancybox="">
              <i className="isax isax-play5"></i>
            </a>
          </div>
        </div>
        <div className="trust-content">
          <img src="/assets/img/bg/bg-19.png" alt="img" className="w-100 trust-bg" />
          <div className="row justify-content-between">
            <div className="col-md-4">
              <h4>Trusted by 25,000+ IELTS test takers worldwide since 2020</h4>
              <div className="d-flex align-items-center flex-wrap mt-5 gap-2">
                <Link to="/register" className="btn btn-secondary">
                  Start Free Tests
                </Link>
                <Link to="/about-us" className="btn btn-dark">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="col-md-7">
              <div className="row">
                <div className="col-md-6">
                  <h4 className="text-white mb-2">95%</h4>
                  <h5 className="text-white mb-2">Success Rate</h5>
                  <p className="text-white mb-5">
                    Our users achieve their target IELTS band scores with regular practice on our platform.
                  </p>
                </div>
                <div className="col-md-6">
                  <h4 className="text-white mb-2">500K+</h4>
                  <h5 className="text-white mb-2">Tests Completed</h5>
                  <p className="text-white mb-5">
                    Over half a million mock tests completed by students preparing for IELTS worldwide.
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center bg-white user-goal p-2">
                <div className="avatar avatar-lg flex-shrink-0">
                  <img className="rounded-pill" src="/assets/img/user/user-28.jpg" alt="User testimonial" />
                </div>
                <p className="text-gray-9 mb-0">
                  "These free mock tests helped me achieve Band 8.5 in my IELTS exam!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;

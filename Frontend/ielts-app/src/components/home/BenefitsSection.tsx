function BenefitsSection() {
  return (
    <section className="benefit-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="fw-medium text-secondary text-decoration-underline mb-2 d-inline-block">
            Why Choose Our Platform
          </span>
          <h2>Master IELTS with Free Mock Tests</h2>
          <p>
            Practice with authentic IELTS test formats and get instant feedback to improve your English proficiency and achieve your target band score.
          </p>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <div className="position-absolute top-0 end-0 mt-n3 me-n4">
                  <img src="/assets/img/shapes/bg-1.png" alt="img" />
                </div>
                <div className="p-4 rounded-pill bg-primary-transparent d-inline-flex">
                  <i className="isax isax-star5 fs-24"></i>
                </div>
                <h5 className="mt-3 mb-1">Completely Free</h5>
                <p>
                  Access unlimited IELTS mock tests without any cost. No hidden fees, no subscriptions - just free, high-quality practice tests for everyone.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <div className="position-absolute top-0 end-0 mt-n3 me-n4">
                  <img src="/assets/img/shapes/bg-2.png" alt="img" />
                </div>
                <div className="p-4 rounded-pill bg-secondary-transparent d-inline-flex">
                  <i className="isax isax-task-square5 fs-24"></i>
                </div>
                <h5 className="mt-3 mb-1">Authentic Test Format</h5>
                <p>
                  Experience real IELTS test conditions with authentic question types, timing, and difficulty levels to prepare you for the actual exam.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <div className="position-absolute top-0 end-0 mt-n3 me-n4">
                  <img src="/assets/img/shapes/bg-3.png" alt="img" />
                </div>
                <div className="p-4 rounded-pill bg-skyblue-transparent d-inline-flex">
                  <i className="isax isax-chart-21 fs-24"></i>
                </div>
                <h5 className="mt-3 mb-1">Instant Results & Feedback</h5>
                <p>
                  Get immediate scoring and detailed feedback on your performance with personalized recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;

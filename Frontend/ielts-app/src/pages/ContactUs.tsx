import { useState } from "react";
import { Link } from "react-router-dom";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title mb-2">Contact Us</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Contact Us
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="contact-sec">
        <div className="container">
          {/* Contact Info Cards */}
          <div className="contact-info">
            <div className="row row-gap-3">
              {/* Address info */}
              <div className="col-lg-4 col-md-6">
                <div className="card card-body border p-sm-4">
                  <div className="d-flex align-items-center">
                    <div className="contact-icon">
                      <span className="bg-primary fs-24 rounded-3 d-flex justify-content-center align-items-center">
                        <i className="isax isax-location5 text-white"></i>
                      </span>
                    </div>
                    <div className="ps-3">
                      <h5 className="mb-1">Address</h5>
                      <address className="mb-0">
                        1364 Still Water Dr, AK 99801.
                      </address>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone info */}
              <div className="col-lg-4 col-md-6">
                <div className="card card-body border p-sm-4">
                  <div className="d-flex align-items-center">
                    <div className="contact-icon">
                      <span className="bg-primary fs-24 rounded-3 d-flex justify-content-center align-items-center">
                        <i className="isax isax-headphone5 text-white"></i>
                      </span>
                    </div>
                    <div className="ps-3">
                      <h5 className="mb-1">Phone</h5>
                      <p className="mb-0">
                        <a
                          href="tel:+19077897623"
                          className="text-gray-5 text-primary-hover text-decoration-underline mb-0"
                        >
                          +1 (907) 789-7623
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email info */}
              <div className="col-lg-4 col-md-6">
                <div className="card card-body border p-sm-4">
                  <div className="d-flex align-items-center">
                    <div className="contact-icon">
                      <span className="bg-primary fs-24 rounded-3 d-flex justify-content-center align-items-center">
                        <i className="isax isax-message5 text-white"></i>
                      </span>
                    </div>
                    <div className="ps-3">
                      <h5 className="mb-1">E-mail Address</h5>
                      <p className="mb-0">
                        <a
                          href="mailto:contact@dreamslms.com"
                          className="text-gray-5 text-primary-hover text-decoration-underline mb-0"
                        >
                          contact@dreamslms.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-light border rounded-4 p-4 p-sm-5 p-md-6">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="contact-details">
                  <div className="section-header">
                    <span className="section-badge">Contact Us</span>
                    <h2>Get in touch with us today</h2>
                    <p>
                      Get in touch with us to explore how our LMS solution can
                      enhance your e-learning experience. We're here to help you
                      build a seamless and engaging learning platform!
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card mb-0">
                  <div className="card-body p-4 p-sm-5 p-md-6">
                    <h4 className="mb-3">Send Us Message</h4>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="mb-4">
                            <label className="form-label">
                              Name <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              name="name"
                              className="form-control form-control-lg"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-4">
                            <label className="form-label">
                              Email Address{" "}
                              <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              className="form-control form-control-lg"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="mb-4">
                            <label className="form-label">Phone Number</label>
                            <input
                              type="tel"
                              name="phone"
                              className="form-control form-control-lg"
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-4">
                            <label className="form-label">Subject</label>
                            <input
                              type="text"
                              name="subject"
                              className="form-control form-control-lg"
                              value={formData.subject}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Your Message</label>
                        <textarea
                          name="message"
                          className="form-control form-control-lg"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                      <div className="d-grid">
                        <button
                          type="submit"
                          className="btn btn-secondary btn-lg"
                        >
                          Send Enquiry
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="contact-map rounded-4 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.8127628277352!2d106.66393477457811!3d11.052660454038714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1d7df763eaf%3A0xf4323e44f2867057!2sEastern%20International%20University!5e0!3m2!1sen!2s!4v1758080317464!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Contact Us Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;

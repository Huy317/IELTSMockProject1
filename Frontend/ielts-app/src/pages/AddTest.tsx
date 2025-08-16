import { useState, useRef } from "react";

function AddTest() {
  const [step, setStep] = useState(1);
  const uploadImgInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="main-wrapper">
      {/* Course add */}
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="add-course-item">
                <div className="wizard">
                  <ul className="form-wizard-steps" id="progressbar2">
                    <li className={step >= 1 ? "progress-active" : ""}>
                      <div className="profile-step">
                        <span className="dot-active mb-2">
                          <span className="number">01</span>
                          <span className="tickmark">
                            <i className="fa-solid fa-check"></i>
                          </span>
                        </span>
                        <div className="step-section">
                          <p>Course Information</p>
                        </div>
                      </div>
                    </li>
                    <li className={step >= 2 ? "progress-active" : ""}>
                      <div className="profile-step">
                        <span className="dot-active mb-2">
                          <span className="number">02</span>
                          <span className="tickmark">
                            <i className="fa-solid fa-check"></i>
                          </span>
                        </span>
                        <div className="step-section">
                          <p>Course Media</p>
                        </div>
                      </div>
                    </li>
                    <li className={step >= 3 ? "progress-active" : ""}>
                      <div className="profile-step">
                        <span className="dot-active mb-2">
                          <span className="number">03</span>
                          <span className="tickmark">
                            <i className="fa-solid fa-check"></i>
                          </span>
                        </span>
                        <div className="step-section">
                          <p>Curriculam</p>
                        </div>
                      </div>
                    </li>
                    <li className={step >= 4 ? "progress-active" : ""}>
                      <div className="profile-step">
                        <span className="dot-active mb-2">
                          <span className="number">04</span>
                          <span className="tickmark">
                            <i className="fa-solid fa-check"></i>
                          </span>
                        </span>
                        <div className="step-section">
                          <p>Additional information</p>
                        </div>
                      </div>
                    </li>
                    <li className={step >= 5 ? "progress-active" : ""}>
                      <div className="profile-step">
                        <span className="dot-active mb-2">
                          <span className="number">05</span>
                          <span className="tickmark">
                            <i className="fa-solid fa-check"></i>
                          </span>
                        </span>
                        <div className="step-section">
                          <p>Pricing</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="initialization-form-set">
                  <fieldset
                    className="form-inner wizard-form-card"
                    id="first"
                    style={{ display: step === 1 ? "block" : "none" }}
                  >
                    <div className="title">
                      <h5>Basic Information</h5>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="input-block">
                          <label className="form-label">
                            Course Title
                            <span className="text-danger ms-1">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-block">
                          <label className="form-label">
                            Course Category
                            <span className="text-danger ms-1">*</span>
                          </label>
                          <div className="position-relative">
                            <select className="select form-control">
                              <option>Select</option>
                              <option>Management</option>
                              <option>IT & Softwares</option>
                              <option>Marketing</option>
                              <option>Finance</option>
                              <option>Productivity</option>
                            </select>
                            <span
                              className="select-arrow"
                              style={{
                                position: "absolute",
                                right: 12,
                                top: "50%",
                                transform: "translateY(-50%)",
                                pointerEvents: "none",
                              }}
                            >
                              <svg
                                width="14"
                                height="8"
                                viewBox="0 0 14 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 1L7 7L13 1"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-block">
                          <label className="form-label">
                            Course Level
                            <span className="text-danger ms-1">*</span>
                          </label>
                          <div className="position-relative">
                            <select className="select form-control">
                              <option>Select</option>
                              <option>Beginner </option>
                              <option>Intermediate</option>
                              <option>Advanced</option>
                              <option>Expert</option>
                            </select>
                            <span
                              className="select-arrow"
                              style={{
                                position: "absolute",
                                right: 12,
                                top: "50%",
                                transform: "translateY(-50%)",
                                pointerEvents: "none",
                              }}
                            >
                              <svg
                                width="14"
                                height="8"
                                viewBox="0 0 14 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 1L7 7L13 1"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="input-block">
                          <label className="form-label">
                            Language<span className="text-danger ms-1">*</span>
                          </label>
                          <div className="position-relative">
                            <select className="select form-control">
                              <option>Select</option>
                              <option>French </option>
                              <option>German</option>
                              <option>Arabic</option>
                            </select>
                            <span
                              className="select-arrow"
                              style={{
                                position: "absolute",
                                right: 12,
                                top: "50%",
                                transform: "translateY(-50%)",
                                pointerEvents: "none",
                              }}
                            >
                              <svg
                                width="14"
                                height="8"
                                viewBox="0 0 14 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 1L7 7L13 1"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block">
                          <label className="form-label">
                            Max Number of Students
                            <span className="text-danger ms-1">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control student-count"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-block">
                          <label className="form-label">
                            Public / Private Course
                            <span className="text-danger ms-1">*</span>
                          </label>
                          <select className="select form-control">
                            <option>Select</option>
                            <option>Private </option>
                            <option>Public</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="input-block">
                          <label className="form-label">
                            Short Description
                            <span className="text-danger ms-1">*</span>
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="input-block">
                          <label className="form-label">
                            Course Description
                            <span className="text-danger ms-1">*</span>
                          </label>
                          <div className="summernote"></div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="bg-light border p-4 rounded-3">
                          <h6 className="mb-2">
                            What will students learn in your course?
                          </h6>
                          <div className="input-block" id="input-block">
                            <div className="d-flex align-items-center add-new-input">
                              <input
                                type="text"
                                className="form-control"
                                defaultValue="Become a UX designer"
                              />
                              <a href="#" className="link-trash">
                                <i className="isax isax-trash"></i>
                              </a>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-end">
                            <a
                              href="#"
                              className="d-flex align-items-center add-new-topic"
                              id="add-new-topic-btn"
                            >
                              <i className="isax isax-add me-1"></i> Add New
                              Item
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="bg-light border p-4 rounded-3">
                          <h6 className="mb-2">Requirements</h6>
                          <div className="input-block">
                            <div className="d-flex align-items-center add-new-input">
                              <input type="text" className="form-control" />
                              <a href="#" className="link-trash">
                                <i className="isax isax-trash"></i>
                              </a>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-end">
                            <a
                              href="#"
                              className="d-flex align-items-center add-new-topic"
                            >
                              <i className="isax isax-add me-1"></i> Add New
                              Item
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check form-switch form-check-md mb-0 mt-3">
                          <input
                            className="form-check-input form-checked-success"
                            type="checkbox"
                            id="checkFeature"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="checkFeature"
                          >
                            Check this for featured course
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="add-form-btn widget-next-btn submit-btn d-flex justify-content-end mb-0">
                      <div className="btn-left">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="btn main-btn next_btns"
                        >
                          Next <i className="isax isax-arrow-right-3 ms-1"></i>
                        </button>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset
                    className="form-inner wizard-form-card"
                    style={{ display: step === 2 ? "block" : "none" }}
                  >
                    <div className="title">
                      <h5>Course Media</h5>
                      <p>
                        Intro Course overview provider type. (.mp4, YouTube,
                        Vimeo etc.)
                      </p>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="input-block">
                          <div className="row align-items-center">
                            <div className="col-md-12">
                              <label className="form-label">
                                Course Thumbnail
                                <span className="text-danger ms-1">*</span>
                              </label>
                            </div>
                            <div className="col-md-10">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="No File Selected"
                              />
                            </div>
                            <div className="col-md-2 d-grid">
                              <label
                                htmlFor="file-upload"
                                className="file-upload-btn text-center"
                              >
                                Upload File
                              </label>
                              <input type="file" id="file-upload" name="file" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div
                          className="upload-img-section d-flex align-items-center justify-content-center"
                          id="upload-img-section"
                          role="button"
                          tabIndex={0}
                          onClick={() => uploadImgInputRef.current?.click()}
                          onKeyDown={(
                            e: React.KeyboardEvent<HTMLDivElement>
                          ) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              uploadImgInputRef.current?.click();
                            }
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <input
                            type="file"
                            id="upload-img-input"
                            style={{ display: "none" }}
                            accept="image/jpeg, image/png, image/gif, image/webp"
                            ref={uploadImgInputRef}
                          />
                          <div className="upload-content">
                            <span className="d-flex align-items-center justify-content-center mb-1">
                              <i className="isax isax-image5 text-secondary fs-24 text-center"></i>
                            </span>
                            <p className="text-center fw-medium mb-1">
                              Upload Image
                            </p>
                            <span className="text-center">
                              JPEG, PNG, GIF, and WebP formats, up to 2 MB
                            </span>
                          </div>
                        </div>
                        <hr className="mt-4 mb-4" />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label">
                          Course Video
                          <span className="text-danger ms-1">*</span>
                        </label>
                        <div
                          className="d-flex align-items-center"
                          style={{ gap: "12px" }}
                        >
                          <div style={{ minWidth: 220 }}>
                            <select className="form-select">
                              <option>External URL</option>
                              <option>Youtube</option>
                              <option>External</option>
                              <option>Vimeo</option>
                            </select>
                          </div>
                          <div className="flex-grow-1">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="External URL Link"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="position-relative mt-4">
                          <a
                            href="https://www.youtube.com/embed/1trvO6dqQUI"
                            id="openVideoBtn"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              className="img-fluid rounded"
                              src="../assets/img/course/add-course-1.jpg"
                              alt="img"
                            />
                            <div className="play-icon">
                              <i className="fa-solid fa-play"></i>
                            </div>
                          </a>
                        </div>
                        <div id="videoModal">
                          <div className="modal-content1">
                            <span className="close-btn" id="closeModal">
                              &times;
                            </span>
                            <iframe id="youtubeIframe" allowFullScreen />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="add-form-btn widget-next-btn submit-btn">
                      <div className="btn-left">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="btn btn-light main-btn prev_btns d-flex align-items-center"
                        >
                          <i className="isax isax-arrow-left-2 me-1"></i>Prev
                        </button>
                      </div>
                      <div className="btn-left">
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="btn btn-secondary main-btn next_btns d-flex align-items-center"
                        >
                          Next <i className="isax isax-arrow-right-3 ms-1"></i>
                        </button>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset
                    className="form-inner wizard-form-card"
                    style={{ display: step === 3 ? "block" : "none" }}
                  >
                    <div className="title">
                      <div className="row align-items-center row-gap-2">
                        <div className="col-md-6">
                          <h5 className="mb-0">Curriculum</h5>
                        </div>
                        <div className="col-md-6 text-md-end">
                          <a
                            href="#"
                            className="btn add-edit-btn d-inline-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#add-topic"
                          >
                            <i className="isax isax-add-circle5 me-1"></i> Add
                            New Topic
                          </a>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        className="accordions-items-seperate"
                        id="accordionSpacingExample"
                      >
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="headingSpacingOne"
                          >
                            <a
                              href="#"
                              className="accordion-button collapsed"
                              data-bs-toggle="collapse"
                              data-bs-target="#SpacingOne"
                              aria-expanded="false"
                              aria-controls="SpacingOne"
                            >
                              <span className="d-flex align-items-center mb-0">
                                <i className="isax isax-menu-15 me-2"></i>
                                Introduction of Digital Marketing
                              </span>
                            </a>
                          </h2>
                          <div
                            id="SpacingOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingSpacingOne"
                            data-bs-parent="#accordionSpacingExample"
                          >
                            <div className="accordion-body">
                              <div className="d-flex align-items-center justify-content-between bg-white p-2 border rounded-3 mb-3">
                                <div className="d-flex align-items-center">
                                  <span>
                                    <i className="isax isax-play-circle5 text-success fs-24 me-1"></i>
                                  </span>
                                  <p className="fw-medium text-gray-5 mb-0">
                                    Describe SEO Engine
                                  </p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <a href="#" className="edit-btn1">
                                    <i className="isax isax-edit-25 fs-16"></i>
                                  </a>
                                  <a href="#" className="delete-btn1">
                                    <i className="isax isax-trash fs-16"></i>
                                  </a>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between bg-white p-2 border rounded-3 mb-3">
                                <div className="d-flex align-items-center">
                                  <span>
                                    <i className="isax isax-play-circle5 text-success fs-24 me-1"></i>
                                  </span>
                                  <p className="fw-medium text-gray-5 mb-0">
                                    Know about all marketing
                                  </p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <a href="#" className="edit-btn1">
                                    <i className="isax isax-edit-25 fs-16"></i>
                                  </a>
                                  <a href="#" className="delete-btn1">
                                    <i className="isax isax-trash fs-16"></i>
                                  </a>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                  <a
                                    href="#"
                                    className="btn add-edit-btn d-inline-flex align-items-center"
                                    data-bs-toggle="modal"
                                    data-bs-target="#add-lesson"
                                  >
                                    <i className="isax isax-add-circle5 me-2"></i>
                                    Add Lesson
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="headingSpacingTwo"
                          >
                            <a
                              href="#"
                              className="accordion-button collapsed"
                              data-bs-toggle="collapse"
                              data-bs-target="#SpacingTwo"
                              aria-expanded="false"
                              aria-controls="SpacingTwo"
                            >
                              <span className="d-flex align-items-center mb-0">
                                <i className="isax isax-menu-15 me-2"></i>
                                Installing Development Software
                              </span>
                            </a>
                          </h2>
                          <div
                            id="SpacingTwo"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingSpacingTwo"
                            data-bs-parent="#accordionSpacingExample"
                          >
                            <div className="accordion-body">
                              <div className="d-flex align-items-center justify-content-between bg-white p-2 border rounded-3 mb-3">
                                <div className="d-flex align-items-center">
                                  <span>
                                    <i className="isax isax-play-circle5 text-success fs-24 me-1"></i>
                                  </span>
                                  <p className="fw-medium text-gray-5 mb-0">
                                    Describe SEO Engine
                                  </p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <a href="#" className="edit-btn1">
                                    <i className="isax isax-edit-25 fs-16"></i>
                                  </a>
                                  <a href="#" className="delete-btn1">
                                    <i className="isax isax-trash fs-16"></i>
                                  </a>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between bg-white p-2 border rounded-3 mb-3">
                                <div className="d-flex align-items-center">
                                  <span>
                                    <i className="isax isax-play-circle5 text-success fs-24 me-1"></i>
                                  </span>
                                  <p className="fw-medium text-gray-5 mb-0">
                                    Know about all marketing
                                  </p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <a href="#" className="edit-btn1">
                                    <i className="isax isax-edit-25 fs-16"></i>
                                  </a>
                                  <a href="#" className="delete-btn1">
                                    <i className="isax isax-trash fs-16"></i>
                                  </a>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                  <a
                                    href="#"
                                    className="btn btn-primary d-inline-flex align-items-center"
                                    data-bs-toggle="modal"
                                    data-bs-target="#add-lesson"
                                  >
                                    <i className="isax isax-add-circle5 me-2"></i>
                                    Add Lesson
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="headingSpacingThree"
                          >
                            <a
                              href="#"
                              className="accordion-button collapsed"
                              data-bs-toggle="collapse"
                              data-bs-target="#SpacingThree"
                              aria-expanded="false"
                              aria-controls="SpacingThree"
                            >
                              <span className="d-flex align-items-center mb-0">
                                <i className="isax isax-menu-15 me-2"></i>
                                Hello World Project from GitHub
                              </span>
                            </a>
                          </h2>
                          <div
                            id="SpacingThree"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingSpacingThree"
                            data-bs-parent="#accordionSpacingExample"
                          >
                            <div className="accordion-body">
                              <div className="d-flex align-items-center justify-content-between bg-white p-2 border rounded-3 mb-3">
                                <div className="d-flex align-items-center">
                                  <span>
                                    <i className="isax isax-play-circle5 text-success fs-24 me-1"></i>
                                  </span>
                                  <p className="fw-medium text-gray-5 mb-0">
                                    Describe SEO Engine
                                  </p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <a href="#" className="edit-btn1">
                                    <i className="isax isax-edit-25 fs-16"></i>
                                  </a>
                                  <a href="#" className="delete-btn1">
                                    <i className="isax isax-trash fs-16"></i>
                                  </a>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between bg-white p-2 border rounded-3 mb-3">
                                <div className="d-flex align-items-center">
                                  <span>
                                    <i className="isax isax-play-circle5 text-success fs-24 me-1"></i>
                                  </span>
                                  <p className="fw-medium text-gray-5 mb-0">
                                    Know about all marketing
                                  </p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <a href="#" className="edit-btn1">
                                    <i className="isax isax-edit-25 fs-16"></i>
                                  </a>
                                  <a href="#" className="delete-btn1">
                                    <i className="isax isax-trash fs-16"></i>
                                  </a>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                  <a
                                    href="#"
                                    className="btn btn-primary d-inline-flex align-items-center"
                                    data-bs-toggle="modal"
                                    data-bs-target="#add-lesson"
                                  >
                                    <i className="isax isax-add-circle5 me-2"></i>
                                    Add Lesson
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="add-form-btn widget-next-btn submit-btn">
                      <div className="btn-left">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="btn btn-light main-btn prev_btns"
                        >
                          <i className="isax isax-arrow-left-2 me-1"></i>Prev
                        </button>
                      </div>
                      <div className="btn-left">
                        <button
                          type="button"
                          onClick={() => setStep(4)}
                          className="btn btn-secondary main-btn next_btns"
                        >
                          Next <i className="isax isax-arrow-right-3 ms-1"></i>
                        </button>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset
                    className="form-inner wizard-form-card"
                    style={{ display: step === 4 ? "block" : "none" }}
                  >
                    <div className="title">
                      <div className="row align-items-center row-gap-3">
                        <div className="col-md-9">
                          <h5 className="mb-0">FAQ’s</h5>
                        </div>
                        <div className="col-md-3 text-end">
                          <a
                            href="#"
                            className="btn add-edit-btn d-inline-flex align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#add-faq"
                          >
                            <i className="isax isax-add-circle5 me-1"></i> Add
                            New
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="pb-3 border-bottom mb-3">
                      <div
                        className="accordions-items-seperate"
                        id="accordionSpacingExample1"
                      >
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="headingSpacingFour"
                          >
                            <a
                              href="#"
                              className="accordion-button collapsed"
                              data-bs-toggle="collapse"
                              data-bs-target="#Spacingthree"
                              aria-expanded="false"
                              aria-controls="Spacingthree"
                            >
                              <span className="d-flex align-items-center text-gray-9 mb-0">
                                <i className="isax isax-menu-15 me-2"></i>
                                Hello World Project from GitHub
                              </span>
                            </a>
                          </h2>
                          <div
                            id="Spacingthree"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingSpacingFour"
                            data-bs-parent="#accordionSpacingExample1"
                          >
                            <div className="accordion-body">
                              <div className="d-flex align-items-center justify-content-between bg-white p-2 border rounded-3 mb-3">
                                <div className="d-flex align-items-center">
                                  <span>
                                    <i className="isax isax-play-circle5 text-success fs-24 me-1"></i>
                                  </span>
                                  <p className="fw-medium text-gray-5 mb-0">
                                    Describe SEO Engine
                                  </p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <a href="#" className="edit-btn1">
                                    <i className="isax isax-edit-25 fs-16"></i>
                                  </a>
                                  <a href="#" className="delete-btn1">
                                    <i className="isax isax-trash fs-16"></i>
                                  </a>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between bg-white p-2 border rounded-3 mb-3">
                                <div className="d-flex align-items-center">
                                  <span>
                                    <i className="isax isax-play-circle5 text-success fs-24 me-1"></i>
                                  </span>
                                  <p className="fw-medium text-gray-5 mb-0">
                                    Know about all marketing
                                  </p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <a href="#" className="edit-btn1">
                                    <i className="isax isax-edit-25 fs-16"></i>
                                  </a>
                                  <a href="#" className="delete-btn1">
                                    <i className="isax isax-trash fs-16"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2
                            className="accordion-header"
                            id="headingSpacingFive"
                          >
                            <a
                              href="#"
                              className="accordion-button collapsed"
                              data-bs-toggle="collapse"
                              data-bs-target="#Spacingone"
                              aria-expanded="false"
                              aria-controls="Spacingone"
                            >
                              <span className="d-flex align-items-center text-gray-9">
                                <i className="isax isax-menu-15 me-2"></i>
                                New Update
                              </span>
                            </a>
                          </h2>
                          <div
                            id="Spacingone"
                            className="accordion-collapse collapse"
                            aria-labelledby="headingSpacingFive"
                            data-bs-parent="#accordionSpacingExample"
                          >
                            <div className="accordion-body">
                              <div className="d-flex align-items-center justify-content-between bg-white p-2 border rounded-3 mb-3">
                                <div className="d-flex align-items-center">
                                  <span>
                                    <i className="isax isax-play-circle5 text-success fs-24 me-1"></i>
                                  </span>
                                  <p className="fw-medium text-gray-5 mb-0">
                                    Describe SEO Engine
                                  </p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <a href="#" className="edit-btn1">
                                    <i className="isax isax-edit-25 fs-16"></i>
                                  </a>
                                  <a href="#" className="delete-btn1">
                                    <i className="isax isax-trash fs-16"></i>
                                  </a>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between bg-white p-2 border rounded-3 mb-3">
                                <div className="d-flex align-items-center">
                                  <span>
                                    <i className="isax isax-play-circle5 text-success fs-24 me-1"></i>
                                  </span>
                                  <p className="fw-medium text-gray-5 mb-0">
                                    Know about all marketing
                                  </p>
                                </div>
                                <div className="d-flex align-items-center">
                                  <a href="#" className="edit-btn1">
                                    <i className="isax isax-edit-25 fs-16"></i>
                                  </a>
                                  <a href="#" className="delete-btn1">
                                    <i className="isax isax-trash fs-16"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pb-3 border-bottom mb-3">
                      <div className="input-block mb-0">
                        <label className="form-label">Tags</label>
                        <input
                          className="input-tags form-control"
                          id="inputBox"
                          type="text"
                          data-role="tagsinput"
                          name="specialist"
                          defaultValue="red, black"
                        />
                        <span className="fs-13 text-gray-6 mt-1 d-block">
                          Maximum of 14 keywords. Keywords should all be in
                          lowercase. e.g. javascript, react, marketing
                        </span>
                      </div>
                    </div>
                    <div className="input-block">
                      <label className="form-label">
                        Message to a reviewer
                      </label>
                      <textarea className="form-control" />
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="form-check form-check-md d-flex align-items-center">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                          defaultChecked
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor="flexCheckChecked"
                        >
                          Any images, sounds, or other assets that are not my
                          own work, have been appropriately licensed for use in
                          the file preview or main course. Other than these
                          items, this work is entirely my own and I have full
                          rights to sell it here.
                        </label>
                      </div>
                    </div>
                    <div className="add-form-btn widget-next-btn submit-btn">
                      <div className="btn-left">
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="btn btn-light main-btn prev_btns"
                        >
                          <i className="isax isax-arrow-left-2 me-1"></i>Prev
                        </button>
                      </div>
                      <div className="btn-left">
                        <button
                          type="button"
                          onClick={() => setStep(5)}
                          className="btn btn-secondary main-btn next_btns"
                        >
                          Next <i className="isax isax-arrow-right-3 ms-1"></i>
                        </button>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset
                    className="form-inner wizard-form-card"
                    style={{ display: step === 5 ? "block" : "none" }}
                  >
                    <div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="form-check form-check-md d-flex align-items-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked1"
                            defaultChecked
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="flexCheckChecked1"
                          >
                            Check if this is a free course
                          </label>
                        </div>
                      </div>
                      <div className="input-block mb-2">
                        <label className="form-label">Course Price ($)</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="form-check form-check-md d-flex align-items-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked2"
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="flexCheckChecked2"
                          >
                            Check if this course has discount
                          </label>
                        </div>
                      </div>
                      <div className="input-block">
                        <label className="form-label">Discount Price ($)</label>
                        <input type="text" className="form-control mb-1" />
                        <span>This course has 0% Discount</span>
                      </div>
                      <div className="mb-4">
                        <label className="form-label mb-1">Expiry Period</label>
                        <div className="d-flex align-items-center ">
                          <div className="form-check me-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              defaultChecked
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2"
                            >
                              Lifetime
                            </label>
                          </div>
                          <div className="form-check me-3">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault3"
                              defaultChecked
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault3"
                            >
                              Limited Time
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="input-block">
                        <label className="form-label">Number of month</label>
                        <input type="text" className="form-control mb-1" />
                        <span>
                          After purchase, students can access the course until
                          your selected time.
                        </span>
                      </div>
                    </div>
                    <div className="add-form-btn widget-next-btn submit-btn">
                      <div className="btn-left">
                        <button
                          type="button"
                          onClick={() => setStep(4)}
                          className="btn btn-light main-btn prev_btns"
                        >
                          <i className="isax isax-arrow-left-2 me-1"></i>Prev
                        </button>
                      </div>
                      <div className="btn-left">
                        <a
                          href="#"
                          className="btn btn-secondary main-btn next_btns"
                          data-bs-toggle="modal"
                          data-bs-target="#success"
                        >
                          Submit Course
                        </a>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Course watch */}

        {/* Add topic */}
        <div className="modal fade" id="add-topic">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Topic Name</h5>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="isax isax-close-circle5"></i>
                </button>
              </div>
              <form action="https://dreamslms.dreamstechnologies.com/html/template/add-course.html">
                <div className="modal-body">
                  <div className="input-block">
                    <label className="form-label">
                      Add Name<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn me-2 btn-light"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-secondary">
                    Add New
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Add topic */}

        {/* Add lesson */}
        <div className="modal fade" id="add-lesson">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>New Lesson</h5>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="isax isax-close-circle5"></i>
                </button>
              </div>
              <form action="https://dreamslms.dreamstechnologies.com/html/template/add-course.html">
                <div className="modal-body">
                  <div className="input-block mb-4">
                    <label className="form-label">
                      Add Lesson<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-block mb-4">
                    <label className="form-label">
                      Video link<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-block mb-4">
                    <label className="form-label">Course Description</label>
                    <textarea className="form-control" />
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="form-check me-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault4"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault4"
                      >
                        free
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault5"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault5"
                      >
                        Premium
                      </label>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn me-2 btn-light"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-secondary">
                    Add New
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Add lesson */}

        {/* Add Faq */}
        <div className="modal fade" id="add-faq">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5>New FAQ</h5>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="isax isax-close-circle5"></i>
                </button>
              </div>
              <form action="https://dreamslms.dreamstechnologies.com/html/template/add-course.html">
                <div className="modal-body">
                  <div className="input-block mb-4">
                    <label className="form-label">
                      Question<span className="text-danger ms-1">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="input-block mb-4">
                    <label className="form-label">
                      Answer<span className="text-danger ms-1">*</span>
                    </label>
                    <textarea className="form-control" />
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="form-check me-3">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault6"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault6"
                      >
                        Enable
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault7"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault7"
                      >
                        Disable
                      </label>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn me-2 btn-light"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-secondary">
                    Add New
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* /Add Faq */}
        {/* success */}
        <div className="modal fade modal-default" id="success">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body p-4">
                <div className="text-center">
                  <div className="text-success h1 mb-2">
                    <i className="isax isax-tick-circle5"></i>
                  </div>
                  <h5 className="mb-2">Congratulations! Course Submitted</h5>
                  <p className="mb-3">
                    You’ve successfully Submitted the Course & its under the
                    review, Once the course is reviewed by the reviewer it will
                    go live.
                  </p>
                  <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
                    <a
                      href="instructor-dashboard.html"
                      className="btn btn-secondary"
                    >
                      <i className="isax isax-arrow-left-2 me-1"></i>Back to
                      Dashboard
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /success */}
      </div>
    </div>
  );
}

export default AddTest;

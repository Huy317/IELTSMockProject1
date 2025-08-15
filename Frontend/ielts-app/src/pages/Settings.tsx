import React from "react";

function AdminSetting() {
  return (
    <div>
      <div className="mb-3">
        <h5>Settings</h5>
      </div>
      <ul className="settings-nav d-flex align-items-center flex-wrap border bg-light-900 rounded">
        <li><a href="#" className="active">Profile</a></li>
        <li><a href="#">Security</a></li>
        <li><a href="#">Plans</a></li>
        <li><a href="#">Social Profiles</a></li>
        <li><a href="#">Linked Accounts</a></li>
        <li><a href="#">Notifications</a></li>
        <li><a href="#">Integrations</a></li>
        <li><a href="#">Withdraw</a></li>
      </ul>
      <form>
        <div className="card mt-3">
          <div className="card-body">
            <div className="profile-upload-group">
              <div className="d-flex align-items-center">
                <a href="#" className="avatar flex-shrink-0 avatar-xxxl avatar-rounded border me-3">
                  <img src="/assets/img/user/user-01.jpg" alt="Img" className="img-fluid" />
                </a>
                <div className="profile-upload-head">
                  <h6><a href="#">Your Avatar</a></h6>
                  <p className="fs-14 mb-0">PNG or JPG no bigger than 800px width and height</p>
                  <div className="new-employee-field">
                    <div className="d-flex align-items-center mt-2">
                      <div className="image-upload position-relative mb-0 me-2">
                        <input type="file" />
                        <a href="#" className="btn bg-gray-100 btn-sm rounded-pill image-uploads">Upload</a>
                      </div>
                      <div className="img-delete">
                        <a href="#" className="btn btn-secondary btn-sm rounded-pill">Delete</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="edit-profile-info mb-3">
                <h5 className="mb-1 fs-18">Personal Details</h5>
                <p>Edit your personal information</p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">First Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" defaultValue="Eugene" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Last Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" defaultValue="Andre" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">User Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" defaultValue="instructordemo" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Phone Number <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" defaultValue="90154-91036" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-4">
                    <label className="form-label">Bio <span className="text-danger">*</span></label>
                    <textarea rows={4} className="form-control" defaultValue="I am a web developer with a vast array of knowledge in many different front end and back end languages, responsive frameworks, databases, and best code practices." />
                  </div>
                </div>
                <div className="mt-3 mb-3">
                  <h5 className="mb-1 fs-18">Educational Details</h5>
                  <p>Edit your Educational information</p>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-xl-7">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Degree<span className="text-danger">*</span></label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">University<span className="text-danger">*</span></label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-5">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">From Date<span className="text-danger">*</span></label>
                            <div className="input-icon position-relative calender-input">
                              <span className="input-icon-addon">
                                <i className="isax isax-calendar"></i>
                              </span>
                              <input type="text" className="form-control datetimepicker" placeholder="" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">To Date<span className="text-danger">*</span></label>
                            <div className="input-icon position-relative calender-input">
                              <span className="input-icon-addon calender-input">
                                <i className="isax isax-calendar"></i>
                              </span>
                              <input type="text" className="form-control datetimepicker" placeholder="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href="#" className="d-inline-flex align-items-center text-secondary fw-medium mb-3">
                    <i className="isax isax-add me-1"></i> Add New
                  </a>
                </div>
                <div className="mt-3 mb-3">
                  <h5 className="mb-1 fs-18">Experience</h5>
                  <p>Edit your Experience</p>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-xl-7">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Company<span className="text-danger">*</span></label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Position<span className="text-danger">*</span></label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-5">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">From Date<span className="text-danger">*</span></label>
                            <div className="input-icon position-relative calender-input">
                              <span className="input-icon-addon">
                                <i className="isax isax-calendar"></i>
                              </span>
                              <input type="text" className="form-control datetimepicker" placeholder="" />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">To Date<span className="text-danger">*</span></label>
                            <div className="input-icon position-relative calender-input">
                              <span className="input-icon-addon calender-input">
                                <i className="isax isax-calendar"></i>
                              </span>
                              <input type="text" className="form-control datetimepicker" placeholder="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href="#" className="d-inline-flex align-items-center text-secondary fw-medium mb-3">
                    <i className="isax isax-add me-1"></i> Add New
                  </a>
                </div>
                <div className="col-md-12">
                  <button className="btn btn-secondary rounded-pill" type="submit">Update Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-0 mt-3">
          <div className="card-body">
            <h5 className="fs-18 mb-3">Delete Account</h5>
            <h6 className="mb-1">Are you sure you want to delete your account?</h6>
            <p className="mb-3">Refers to the action of permanently removing a user's account and associated data from a system, service and platform.</p>
            <a href="#" className="btn btn-secondary">Delete Account</a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminSetting;
import CourseTable from "../components/admin/CourseTable";
function AdminCourse() {
  return (
    <div>
      {/* Course Stats Cards */}
      <div className="row mb-4">
        <div className="col-lg-4 col-md-6">
          <div className="card bg-success">
            <div className="card-body">
              <h6 className="fw-medium mb-1 text-white">Active Tests</h6>
              <h4 className="fw-bold text-white">45</h4>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="card bg-secondary">
            <div className="card-body">
              <h6 className="fw-medium mb-1 text-white">Pending Tests</h6>
              <h4 className="fw-bold text-white">21</h4>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="card bg-info">
            <div className="card-body">
              <h6 className="fw-medium mb-1 text-white">Incoming Tests</h6>
              <h4 className="fw-bold text-white">15</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Page Title and Icons */}
      <div className="page-title d-flex align-items-center justify-content-between mb-3">
        <h5 className="fw-bold">Tests</h5>
        <div className="d-flex align-items-center list-icons">
          <a href="#" className="active me-2"><i className="isax isax-task"></i></a>
          <a href="#"><i className="isax isax-element-3"></i></a>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="row mb-3">
        <div className="col-md-8">
          <div className="mb-3">
            <div className="dropdown">
              <a href="#" className="dropdown-toggle text-gray-6 btn rounded border d-inline-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
                Status
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li><a href="#" className="dropdown-item rounded-1">Active</a></li>
                <li><a href="#" className="dropdown-item rounded-1">Deactive</a></li>
                <li><a href="#" className="dropdown-item rounded-1">Incoming</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-icon mb-3">
            <span className="input-icon-addon">
              <i className="isax isax-search-normal-14"></i>
            </span>
            <input type="text" className="form-control form-control-md" placeholder="Search" />
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div className="table-responsive custom-table">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Test Name</th>
              {/* <th>Attempt</th> */}
              <th>Created At</th>
              <th>Resource</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <CourseTable />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCourse;
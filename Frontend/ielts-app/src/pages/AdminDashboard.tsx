import React from "react";
import DashboardTable from "../components/admin/DashboardTable";

function AdminDashboard() {
  return (
    <div>
      <div className="row">
        {/* Dashboard widgets */}
        <div className="col-md-6 col-xl-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <span className="icon-box bg-primary-transparent me-2 me-xxl-3 flex-shrink-0">
                  <img src="/assets/img/icon/graduation.svg" alt="" />
                </span>
                <div>
                  <span className="d-block">Created Tests</span>
                  <h4 className="fs-24 mt-1">12</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <span className="icon-box bg-secondary-transparent me-2 me-xxl-3 flex-shrink-0">
                  <img src="/assets/img/icon/book.svg" alt="" />
                </span>
                <div>
                  <span className="d-block">Active Tests</span>
                  <h4 className="fs-24 mt-1">08</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <span className="icon-box bg-success-transparent me-2 me-xxl-3 flex-shrink-0">
                  <img src="/assets/img/icon/bookmark.svg" alt="" />
                </span>
                <div>
                  <span className="d-block">Attempted Students</span>
                  <h4 className="fs-24 mt-1">06</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h5 className="mb-3 fw-bold mt-4">Recently Created Tests</h5>
      <div className="table-responsive custom-table">
        <DashboardTable />
      </div>
    </div>
  );
}

export default AdminDashboard;

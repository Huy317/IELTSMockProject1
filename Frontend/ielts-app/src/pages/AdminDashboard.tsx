import React, { use, useEffect, useState } from "react";
import DashboardTable from "../components/admin/DashboardTable";
import type { Test } from "../types/Test";
import { getRecentlyTestByAdminId, getTests } from "../services/testService";
import CourseTable from "../components/admin/CourseTable";
import Pagination from "../components/utils/Pagination";
import { useAuth } from "../contexts/AuthContext";

function AdminDashboard() {
  const [tests, setTests] = useState<Test[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Default items per page
  const {user} = useAuth();

  useEffect(() => {
    loadTests();
  }, []);

  async function loadTests() {
    if(!user) return;
    const data = await getRecentlyTestByAdminId(user.id);
    setTests(data);
  }

  // Calculate pagination for filtered results
  const totalItems = tests.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTests = tests.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
      {/* <div className="table-responsive custom-table">
        <DashboardTable />
      </div> */}
      {/* <div className="table-responsive custom-table">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Test Name</th>
              <th>Attempt</th>
              <th>Created At</th>
              <th>Resource</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <CourseTable tests={currentTests} onTestsChange={loadTests} />
          </tbody>
        </table>
      </div> */}
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
            <CourseTable tests={currentTests} onTestsChange={loadTests} />
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default AdminDashboard;

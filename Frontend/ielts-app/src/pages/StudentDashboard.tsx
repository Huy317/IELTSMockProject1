import React, { useEffect, useState } from "react";
import TestCard, { SubmissionCard, TestCardNew } from "../components/student/TestCard";
import type { UserInfo } from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import { getAvrScore, getHighestScore, getLowestScore, getTotalSubmission } from "../services/userService";
import type { ViewSubmissionDTO } from "../types/Submission";
import { GetRecentlySubmissionById } from "../services/submissionService";
import { set } from "react-hook-form";
import Pagination from "../components/utils/Pagination";

function StudentDashboard() {
  const {user} = useAuth();
  const [totalSub, setTotalSub] = useState<number>(0);
  const [avr, setAvr] = useState<number>(0);
  const [high, setHigh] = useState<number>(0);
  const [low, setLow] = useState<number>(0);
  const [submissions, setSubmissions] = useState<ViewSubmissionDTO[]>([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9; // Number of submission cards per page

  // Calculate pagination values
  const totalItems = submissions.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSubmissions = submissions.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      if(user) {
        const data = await getTotalSubmission(user.id);
        const data1 = await getAvrScore(user.id);
        const data2 = await getHighestScore(user.id);
        const data3 = await getLowestScore(user.id);
        setTotalSub(data);
        setAvr(data1);
        setHigh(data2);
        setLow(data3);

        const listSub = await GetRecentlySubmissionById(user.id);
        setSubmissions(listSub);
      }
    }

    fetchData();
  }, [])
  return (
    <div>
      <div className="row">
        <div className="col-md-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <span className="icon-box bg-primary-transparent me-2 me-xxl-3 flex-shrink-0">
                  <img src="/assets/img/icon/graduation.svg" alt="" />
                </span>
                <div>
                  <span className="d-block">Taken Tests</span>
                  <h4 className="fs-24 mt-1">{totalSub}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <span className="icon-box bg-secondary-transparent me-2 me-xxl-3 flex-shrink-0">
                  <img src="/assets/img/icon/book.svg" alt="" />
                </span>
                <div>
                  <span className="d-block">Average Score</span>
                  <h4 className="fs-24 mt-1">{avr}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <span className="icon-box bg-success-transparent me-2 me-xxl-3 flex-shrink-0">
                  <img src="/assets/img/icon/bookmark.svg" alt="" />
                </span>
                <div>
                  <span className="d-block">Highest Score</span>
                  <h4 className="fs-24 mt-1">{high}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <span className="icon-box bg-success-transparent me-2 me-xxl-3 flex-shrink-0">
                  <img src="/assets/img/icon/bookmark.svg" alt="" />
                </span>
                <div>
                  <span className="d-block">Lowest Score</span>
                  <h4 className="fs-24 mt-1">{low}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Enrolled Courses */}
      <h5 className="mb-3 fs-18">Recently Taken Tests</h5>
      <div className="row">
        {/* <TestCard/> */}
        {currentSubmissions.map((sub, idx) => (
          <SubmissionCard 
            key={idx}
            id={sub.id}
            image="/assets/img/ielts-banner.jpeg"
            adminAvatar="/assets/img/user/user-00.jpg"
            adminName={sub.instructorName.toUpperCase()}
            title={sub.testName}
            rating={sub.score}
            skillType={sub.typeName}
          />
        ))}
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

export default StudentDashboard;

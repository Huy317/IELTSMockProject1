import React from "react";

interface AdminCourseRowProps {
  imgSrc: string;
  title: string;
  count: number;
  status: string;
}

const testCourses: AdminCourseRowProps[] = [
  {
    imgSrc: "/assets/img/course/course-01.jpg",
    title: "IELTS READING TEST 1",
    count: 10,
    status: "Published",
  },
  {
    imgSrc: "/assets/img/course/course-02.jpg",
    title: "IELTS LISTENING TEST 3",
    count: 15,
    status: "Published",
  },
];

function DashboardTable() {
  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th>Test</th>
          <th>Attempted</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {testCourses.map((course, idx) => (
          <tr key={idx}>
            <td>
              <div className="course-title d-flex align-items-center">
                <a
                  href="/course-details"
                  className="avatar avatar-xl flex-shrink-0 me-2"
                >
                  <img src={course.imgSrc} alt="Img" />
                </a>
                <div>
                  <p className="fw-medium">
                    <a href="/course-details">{course.title}</a>
                  </p>
                </div>
              </div>
            </td>
            <td>{course.count}</td>
            <td>{course.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DashboardTable;

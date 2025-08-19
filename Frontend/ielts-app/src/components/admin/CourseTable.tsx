//import React from "react";
import React, { useEffect, useState } from "react";
import { getTests } from "../../services/testService";
import type { Test } from "../../types/Test";

function CourseTable() {
  const [courseRows, setCourseRows] = useState<Test[]>([]);

  useEffect(() => {
      getTests()
        .then((data: Test[]) => {
          setCourseRows(data);
        })
        .catch((err: unknown) => {
          if (err instanceof Error) {
            console.error("Failed to fetch tests:", err.message);
          } else {
            console.error("Failed to fetch tests:", err);
          }
        });
    }, []);

    return (
    <>
      {courseRows.map((row, idx) => (
        <tr key={idx}>
          <td>
            <div className="d-flex align-items-center">
              <a href="#" className="avatar avatar-lg me-2 flex-shrink-0">
                <img className="img-fluid object-fit-cover" src="/assets/img/icon/graduation.svg" alt="" />
              </a>
              <div>
                <h6 className="fw-medium mb-2"><a href="#">{row.testName}</a></h6>
              </div>
            </div>
          </td>
          {/* <td>{row.attempted}</td> */}
          <td>{row.createdBy}</td>
          <td>{row.createdAt}</td>
          <td>{row.resource}</td>
          <td>
            <span className="badge badge-sm bg-success d-inline-flex align-items-center me-1">
              {/* <i className="fa-solid fa-circle fs-5 me-1"></i>{row.status} */}
              {row.isActive ? "Active" : "Inactive"}
            </span>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <a href="#" className="d-inline-flex fs-14 me-1 action-icon"><i className="isax isax-edit-2"></i></a>
              <a href="#" className="d-inline-flex fs-14 action-icon"><i className="isax isax-trash"></i></a>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default CourseTable;

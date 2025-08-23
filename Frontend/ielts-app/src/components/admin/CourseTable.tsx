//import React from "react";
import React, { useEffect, useState } from "react";
import { getTests } from "../../services/testService";
import { deleteTest } from "../../services/testService";
import type { Test } from "../../types/Test";

function CourseTable() {
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    // getTests()
    //   .then((data: Test[]) => {
    //     setTests(data);
    //   })
    //   .catch((err: unknown) => {
    //     if (err instanceof Error) {
    //       console.error("Failed to fetch tests:", err.message);
    //     } else {
    //       console.error("Failed to fetch tests:", err);
    //     }
    //   });
    loadTests();
  }, []);

  async function loadTests() {
    const data = await getTests();
    setTests(data);
  }

  async function handleDelete(id: number) {
    try {
      await deleteTest(id);
      await loadTests();
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  return (
    <>
      {tests.map((test, idx) => (
        <tr key={idx}>
          <td>
            <div className="d-flex align-items-center">
              <a href="#" className="avatar avatar-lg me-2 flex-shrink-0">
                <img
                  className="img-fluid object-fit-cover"
                  src="/assets/img/icon/graduation.svg"
                  alt=""
                />
              </a>
              <div>
                <h6 className="fw-medium mb-2">
                  <a href="#">{test.testName}</a>
                </h6>
              </div>
            </div>
          </td>
          {/* <td>{row.attempted}</td> */}
          <td>{test.createdBy}</td>
          <td>{test.createdAt}</td>
          <td>{test.resource}</td>
          <td>
            <span className="badge badge-sm bg-success d-inline-flex align-items-center me-1">
              {/* <i className="fa-solid fa-circle fs-5 me-1"></i>{row.status} */}
              {test.isActive ? "Active" : "Inactive"}
            </span>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <a href="#" className="d-inline-flex fs-14 me-1 action-icon">
                <i className="isax isax-edit-2"></i>
              </a>
              <a onClick={() => handleDelete(test.id)} href="#" className="d-inline-flex fs-14 action-icon">
                <i className="isax isax-trash"></i>
              </a>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default CourseTable;

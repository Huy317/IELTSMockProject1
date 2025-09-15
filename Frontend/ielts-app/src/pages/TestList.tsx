import { Link } from "react-router-dom";
import TestCard, { TestCardNew } from "../components/student/TestCard";
import { useEffect, useState } from "react";
import type { Test } from "../types/Test";
import { getTests } from "../services/testService";
import { useSearchParams } from "react-router-dom";
import { getFilteredTests } from "../services/testService"; // Add your filter API function

function TestList() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const skillName = searchParams.get("skillName") || "";
  const instructorName = searchParams.get("instructorName") || "";

  // const fetchTests = async () => {
  //   const data = await getTests();
  //   setTests(data);
  // }

  // useEffect(() => {
  //   fetchTests();
  // }, [])

  const fetchFilteredTests = async () => {
    setLoading(true);
    try {
      const data = await getFilteredTests({
        skillName: skillName || undefined,
        instructorName: instructorName || undefined,
      });
      setTests(data);
    } catch (error) {
      console.error("Error fetching filtered tests:", error);
      setTests([]); // Show empty list on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredTests();
  }, [skillName, instructorName]);

  return (
    // <div className="row">
    //   {tests.map((test, idx) => (
    //     <TestCardNew
    //       key={idx}
    //       image="/assets/img/course/course-01.jpg"
    //       adminAvatar="/assets/img/user/user-29.jpg"
    //       adminName={test.createdBy.toString() + "LATER"}
    //       title={test.testName}
    //       rating={4.9}
    //       reviewCount={200}
    //       skillType={
    //         test.testName.toLowerCase().includes("listening")
    //           ? "Listening"
    //           : "Reading"
    //       }
    //     />
    //   ))}
    // </div>

    <div className="row">
      {loading ? (
        <div className="col-12 text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading tests...</p>
        </div>
      ) : tests.length > 0 ? (
        tests.map((test, idx) => (
          <TestCardNew
            key={idx}
            image="/assets/img/course/course-01.jpg"
            adminAvatar="/assets/img/user/user-29.jpg"
            adminName={test.createdBy.toString() + "LATER"}
            title={test.testName}
            rating={4.9}
            reviewCount={200}
            skillType={
              test.testName.toLowerCase().includes("listening")
                ? "Listening"
                : "Reading"
            }
          />
        ))
      ) : (
        <div className="col-12 text-center">
          <p>No tests found for the selected filters.</p>
          <p>Try adjusting your filter criteria.</p>
        </div>
      )}
    </div>
  );
}

export default TestList;

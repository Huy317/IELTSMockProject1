import { Link } from "react-router-dom";
import TestCard, { TestCardNew } from "../components/student/TestCard";
import { useEffect, useState } from "react";
import type { TestWithAuthorName } from "../types/Test";
import { useSearchParams } from "react-router-dom";
import { getFilteredTests } from "../services/testService";

function TestList() {
  const [tests, setTests] = useState<TestWithAuthorName[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchFilteredTests = async () => {
      setLoading(true);
      try {
        const skillNames = searchParams.getAll("skillName");
        const instructorNames = searchParams.getAll("instructorName");

        const data = await getFilteredTests({
          skillName: skillNames.length > 0 ? skillNames : undefined,
          instructorName:
            instructorNames.length > 0 ? instructorNames : undefined,
        });
        setTests(data);
        console.log("Filtered tests data:", data);
      } catch (error) {
        console.error("Error fetching filtered tests:", error);
        setTests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredTests();
  }, [searchParams]);

  return (
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
            adminName={test.instructorName.toUpperCase()}
            title={test.testName}
            rating={4.9}
            reviewCount={200}
            skillType={test.typeName}
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

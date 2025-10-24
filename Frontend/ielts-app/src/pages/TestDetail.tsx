import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { TestWithAuthorName } from "../types/Test";
import { getTestById } from "../services/testService";
import { getQuestionCountInTestId } from "../services/questionService";

function TestDetail() {
    const { id } = useParams<{ id: string }>();

    const [test, setTest] = useState<TestWithAuthorName | null>(null);
    const [questionCount, setQuestionCount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    let timeDuration: { [key: string]: string } = {
        "Listening": "30 minutes",
        "Reading": "60 minutes",
    }

    let navigate = useNavigate();

    const handleStartTest = () => {
        console.log("Start Test clicked", { id, test });
        // maybe other url, doTest/id or smth
        //navigate(`/reading-test/${id}`);
        {test?.typeName === "Listening" ? navigate(`/listening-test/${id}`) : navigate(`/reading-test/${id}`)}
    };

    const formatDate = (isoLike: string | Date | undefined): string => {
        if (!isoLike) return "-";
        try {
            const d = typeof isoLike === "string" ? new Date(isoLike) : isoLike;
            if (Number.isNaN(d.getTime())) return String(isoLike);
            return d.toLocaleString();
        } catch {
            return String(isoLike);
        }
    };

    const fetchTest = async () => {
        if (!id) return;
        try {
            setLoading(true);
            setError(null);
            const data = await getTestById(id);
            setTest(data);
            getQuestionCountInTestId(id).then((count) => {
                console.log("Question count:", count);
                setQuestionCount(count);
            });
        } catch (e) {
            setError("Failed to load test details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTest();
    }, [id]);

    if (loading) {
        return (
            <div className="container py-5">
                <div className="d-flex align-items-center gap-2">
                    <div className="spinner-border text-primary" role="status" aria-hidden="true" />
                    <strong>Loading test details…</strong>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    if (!test) {
        return (
            <div className="container py-5">
                <div className="alert alert-warning" role="alert">
                    No test details available.
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-10 col-xl-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-white border-0">
                            <h1 className="h4 mb-0 text-primary">{test.testName}</h1>
                        </div>
                        <div className="card-body">
                            <dl className="row mb-0">
                                <dt className="col-sm-4 mb-3">Type</dt>
                                <dd className="col-sm-8 mb-3">
                                    <span className="badge btn-primary">{test.typeName}</span>
                                </dd>

                                <dt className="col-sm-4 mb-3">Questions</dt>
                                <dd className="col-sm-8 mb-3">
                                    <span className="text-break">{questionCount} {questionCount === 1 ? 'question' : 'questions'}</span>
                                </dd>

                                <dt className="col-sm-4 mb-3">Resource</dt>
                                <dd className="col-sm-8 mb-3">
                                    <span className="text-break">{test.resource}</span>
                                </dd>

                                <dt className="col-sm-4 mb-3">Time Duration</dt>
                                <dd className="col-sm-8 mb-3">
                                    <span className="text-break">{timeDuration[test.typeName]}</span>
                                </dd>

                                <dt className="col-sm-4 mb-3">Attempts</dt>
                                <dd className="col-sm-8 mb-3">
                                    <span className="text-break">{test.submissionCount}</span>
                                </dd>

                                <dt className="col-sm-4 mb-3">Created By</dt>
                                <dd className="col-sm-8 mb-3">{test.instructorName}</dd>

                                <dt className="col-sm-4 mb-3">Created At</dt>
                                <dd className="col-sm-8 mb-3">{formatDate(test.createdAt)}</dd>
                            </dl>
                        </div>
                        <div className="card-footer bg-white border-0">
                            <div className="d-grid">
                                <button type="button" className="btn btn-primary btn-lg my-3" onClick={handleStartTest}>
                                    Start Test
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestDetail;
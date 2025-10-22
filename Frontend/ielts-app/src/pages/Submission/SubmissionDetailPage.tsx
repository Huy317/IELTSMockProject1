import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getSubmissionById } from "../../services/submissionService";
import { toast } from "react-toastify";
import { getSubmissionDetailById } from "../../services/submissionDetailService";
import type { Submission } from "../../types/Submission";
import type { QuestionWithUserChoice } from "../../types/Question";
import { getAllQuestionsAndParagraphsWithTestId } from "../../services/questionService";
import type { TestWithAuthorName } from "../../types/Test";
import { getTestById } from "../../services/testService";
import SubmissionQuestionDisplay from "./SubmissionQuestionDisplay";
import SubmissionParentDisplay from "./SubmissionParentDisplay";

function SubmissionDetailPage() {

    const {id} = useParams<{id: string}>();

    const [testData, setTestData] = useState<TestWithAuthorName | null>(null);

    const [submissionData, setSubmissionData] = useState<Submission | null>(null);

    const [questionData, setquestionData] = useState<QuestionWithUserChoice[] | null>(null);

    const [collapsedSection, setCollapsedSections] = useState<boolean[]>([false,false,false,false]);

    function toggleCollapse(index : number){
        setCollapsedSections(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        })
    }

    function fetchAndCombineData() {
        const combinedPromise = getSubmissionById(id!)
            .then((submission) => {
                console.log("submission: ", submission);
                setSubmissionData(submission);
                // Fetch both questions and submission details in parallel
                return Promise.all([
                    getAllQuestionsAndParagraphsWithTestId(submission.testId),
                    getSubmissionDetailById(id!),
                    getTestById(submission.testId)
                ]);
            })
            .then(([questions, details, test]) => {
                console.log("questions: ", questions);
                console.log("details: ", details);
                console.log("test: ", test);

                setTestData(test);

                const parsedAnswer = JSON.parse(details.answer);
                const questionsWithUserChoice: QuestionWithUserChoice[] = questions.map((question) => ({
                    ...question,
                    answer: parsedAnswer[question.id] || ""
                }));

                console.log("questionsWithUserChoice: ", questionsWithUserChoice);
                setquestionData(questionsWithUserChoice);
                
                return { questions, parsedAnswer };
            });

        toast.promise(
            combinedPromise,
            {
                pending: 'Loading submission data...',
                success: 'All data loaded successfully!',
                error: 'Error loading data'
            }
        );
    }

    useEffect(() =>{
        fetchAndCombineData();
    }, [id]);

    // Helper function to organize questions by paragraphs
    const organizeQuestionsByParagraphs = () => {
        if (!questionData) return [];

        // Separate paragraphs and questions
        const paragraphs = questionData
            .filter(q => q.parentId === 0)
            .sort((a, b) => a.order - b.order);

        const questions = questionData
            .filter(q => q.parentId !== 0)
            .sort((a, b) => a.order - b.order);

        // Group questions by their paragraph
        return paragraphs.map(paragraph => {
            const paragraphQuestions = questions
                .filter(q => q.parentId === paragraph.id)
                .sort((a, b) => a.order - b.order);
            
            return {
                paragraph,
                questions: paragraphQuestions
            };
        });
    };

    return(
        <div className="container py-4">
            <div className="row">
                <div className="col-12">
                    {/* Page Header */}
                    <div className="mb-4">
                        <h2 className="mb-0">
                            <i className="bi bi-clipboard-check me-2"></i>
                            Test Submission Results
                        </h2>
                    </div>

                    {/* Test and Submission Information Card */}
                    <div className="card mb-4">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">
                                <i className="bi bi-file-text me-2"></i>
                                Submission Overview
                            </h5>
                        </div>
                        <div className="card-body">
                            {testData && submissionData ? (
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label className="form-label text-muted">Test Name</label>
                                            <p className="fw-bold">{testData.testName}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label className="form-label text-muted">Test Type</label>
                                            <p className="fw-bold">{testData.typeName}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label className="form-label text-muted">Instructor</label>
                                            <p className="fw-bold">{testData.instructorName}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="mb-3">
                                            <label className="form-label text-muted">Score</label>
                                            <p className="fw-bold fs-2 text-primary">
                                                {submissionData.score !== null && submissionData.score !== undefined 
                                                    ? submissionData.score 
                                                    : 'Not graded yet'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-0">
                                            <label className="form-label text-muted">Submitted At</label>
                                            <p className="fw-bold">
                                                {new Date(submissionData.submittedAt.endsWith('Z') 
                                                ? submissionData.submittedAt 
                                                : `${submissionData.submittedAt}Z`).toLocaleString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: false,
                                                    timeZone: 'Asia/Ho_Chi_Minh'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-3">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Questions and Answers Section - Placeholder */}
                    <div className="card mb-4">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">
                                <i className="bi bi-list-check me-2"></i>
                                Questions and Your Answers
                            </h5>
                        </div>
                        <div className="card-body">
                            {questionData ? (
                                <>
                                    {organizeQuestionsByParagraphs().map((section, index) => (
                                        <div key={section.paragraph.id} className="mb-5">
                                            {/* Parent Section (Paragraph, Audio, etc.) */}
                                            <div 
                                                className="card-header bg-light d-flex justify-content-between align-items-center"
                                                onClick={() => toggleCollapse(index)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <h5 className="text-primary mb-0">
                                                    <i className={`bi ${section.paragraph.questionType === 'Paragraph' ? 'bi-book' : 'bi-volume-up'} me-2`}></i>
                                                    {section.paragraph.questionType === 'Paragraph' ? `Passage ${index + 1}` : `Section ${index + 1}`}
                                                </h5>
                                                <i className={`bi bi-chevron-${collapsedSection[index] ? 'down' : 'up'}`}></i>
                                            </div>
                                            
                                            <div className={`collapse ${!collapsedSection[index] ? 'show' : ''}`}>
                                                <div className="card-body">
                                                    {/* Use the new SubmissionParentDisplay component */}
                                                    <SubmissionParentDisplay question={section.paragraph} />
                                                    
                                                    {/* Questions for this section */}
                                                    <div className="ms-3 mt-4">
                                                        <h6 className="text-muted mb-3">Questions:</h6>
                                                        {section.questions.map((question, qIndex) => (
                                                            <SubmissionQuestionDisplay 
                                                                key={question.id} 
                                                                question={question}
                                                                questionNumber={qIndex + 1}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="text-center py-3">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmissionDetailPage;

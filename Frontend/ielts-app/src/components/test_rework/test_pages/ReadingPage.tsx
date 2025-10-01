import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { TestWithAuthorName } from "../../../types/Test";
import { getAllQuestionsAndParagraphsWithTestId } from "../../../services/questionService";
import { getTestById } from "../../../services/testService";

interface ParagraphData {
  id: number;
  content: string;
  order: number;
  paragraphNumber: number;
}

interface QuestionData {
  id: number;
  questionType: string;
  content: string;
  choices: string;
  correctAnswer: string;
  explanation: string;
  order: number;
  parentId: number;
  link: string;
  paragraphNumber: number;
}

function ReadingPage() {
  const { id: testId } = useParams<{ id: string }>();

  // State management
  const [test, setTest] = useState<TestWithAuthorName | null>(null);
  const [paragraphs, setParagraphs] = useState<ParagraphData[]>([]);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [userAnswers, setUserAnswers] = useState<{
    [questionId: number]: string;
  }>({});
  const [currentParagraphNumber, setCurrentParagraphNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(60 * 60); // 60 minutes in seconds

  //Fetch test data
  useEffect(() => {
    const fetchTestData = async () => {
      if (!testId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Fetch test info and questions
        const [testData, allQuestionsData] = await Promise.all([
          getTestById(testId),
          getAllQuestionsAndParagraphsWithTestId(parseInt(testId)),
        ]);

        setTest(testData);

        // Separate paragraphs and questions based on ParentId
        const paragraphsData = allQuestionsData
          .filter((q) => q.parentId === 0) // ParentId = 0 means it's a paragraph
          .map((p) => ({
            id: p.id,
            content: p.content,
            order: p.order,
            paragraphNumber: p.order, //maybe this is not necessary, just use ORDER
          }))
          .sort((a, b) => a.order - b.order);

        //specific sequence of paragraphs
        const paragraphMap = new Map(
          paragraphsData.map((p) => [p.id, p.order])
        );

        const actualQuestions = allQuestionsData
          .filter((q) => q.parentId !== 0) // ParentId != 0 means it's a normal question
          .map((q) => ({
            id: q.id,
            questionType: q.questionType,
            content: q.content,
            choices: q.choices || "",
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            order: q.order,
            parentId: q.parentId,
            link: q.link || "",
            paragraphNumber: paragraphMap.get(q.parentId) || 1,
          }))
          .sort((a, b) => {
            if (a.paragraphNumber !== b.paragraphNumber) {
              return a.paragraphNumber - b.paragraphNumber;
            }
            return a.order - b.order;
          });

        setParagraphs(paragraphsData);
        setQuestions(actualQuestions);
        setLoading(false);

      } catch (error) {
        setLoading(false);
        console.log("Error fetching test data:", error);
      }
    };

    fetchTestData();
  }, [testId]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle answer changes
  const handleAnswerChange = (questionId: number, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Paragraph navigation functions
  const goToNextParagraph = () => {
    const totalParagraphs = paragraphs.length;
    if (currentParagraphNumber < totalParagraphs) {
      setCurrentParagraphNumber(currentParagraphNumber + 1);
    }
  };

  const goToPreviousParagraph = () => {
    if (currentParagraphNumber > 1) {
      setCurrentParagraphNumber(currentParagraphNumber - 1);
    }
  };

  // Get current paragraph and its questions
  const currentParagraph = paragraphs.find(
    (p) => p.paragraphNumber === currentParagraphNumber
  );
  const currentParagraphQuestions = questions.filter(
    (q) => q.paragraphNumber === currentParagraphNumber
  );
  const totalParagraphs = paragraphs.length;

  // Calculate global question numbers
  // may be not necessary, it is possible to render sequence of questions directly
  const getGlobalQuestionNumber = (questionId: number) => {
    // Sort all questions by paragraph and order
    const sortedQuestions = [...questions].sort((a, b) => {
      if (a.paragraphNumber !== b.paragraphNumber) {
        return a.paragraphNumber - b.paragraphNumber;
      }
      return a.order - b.order;
    });

    const index = sortedQuestions.findIndex((q) => q.id === questionId);
    return index + 1;
  };

  // Navigate to specific question and paragraph
  const navigateToQuestion = (questionId: number) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && question.paragraphNumber !== currentParagraphNumber) {
      setCurrentParagraphNumber(question.paragraphNumber);
    }

    // Scroll to the question after a brief delay to ensure the paragraph has rendered
    setTimeout(() => {
      const questionElement = document.getElementById(`question-${questionId}`);
      if (questionElement) {
        questionElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  // Get all questions with global numbering
  const getAllQuestionsWithGlobalNumbers = () => {
    return [...questions]
      .sort((a, b) => {
        if (a.paragraphNumber !== b.paragraphNumber) {
          return a.paragraphNumber - b.paragraphNumber;
        }
        return a.order - b.order;
      })
      .map((question, index) => ({
        ...question,
        globalNumber: index + 1,
      }));
  };

  // Submit test
  const handleSubmitTest = () => {
    console.log("Submitting test with answers:", userAnswers);
    // Implement submission logic here
  };

  // Format time
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Render question based on type
  const renderQuestion = (question: QuestionData) => {
    const userAnswer = userAnswers[question.id] || "";

    switch (question.questionType) {
      case "MultipleChoice":
        return renderMultipleChoiceQuestion(question, userAnswer);
      case "SingleChoice": // Single selection from choices - use radio buttons
      case "OneChoice": // Used for T/F/NG questions - single selection from choices
        return renderSingleChoiceQuestion(question, userAnswer);
      case "FormCompletion":
        return renderFormCompletionQuestion(question, userAnswer);
      case "Matching":
        return renderMatchingQuestion(question, userAnswer);
      default:
        return (
          <div className="alert alert-warning">
            Unsupported question type: {question.questionType}
          </div>
        );
    }
  };

  const renderMultipleChoiceQuestion = (
    question: QuestionData,
    userAnswer: string
  ) => {
    const choices = question.choices
      .split("|")
      .filter((choice) => choice.trim() !== "");

    // Parse user answers (pipe-separated string to array)
    const selectedAnswers = userAnswer ? userAnswer.split("|") : [];

    const handleMultipleChoiceChange = (choice: string, isChecked: boolean) => {
      let newAnswers = [...selectedAnswers];

      if (isChecked) {
        // Add choice if not already selected
        if (!newAnswers.includes(choice)) {
          newAnswers.push(choice);
        }
      } else {
        // Remove choice if unchecked
        newAnswers = newAnswers.filter((answer) => answer !== choice);
      }

      // Convert back to pipe-separated string
      const newAnswerString = newAnswers.join("|");
      handleAnswerChange(question.id, newAnswerString);
    };

    return (
      <div className="question-content">
        <p className="question-text">{question.content}</p>
        {question.link && (
          <div className="audio-player mb-3">
            <audio controls>
              <source src={question.link} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        <div className="choices">
          {choices.map((choice, index) => (
            <div key={index} className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id={`question-${question.id}-choice-${index}`}
                value={choice}
                checked={selectedAnswers.includes(choice)}
                onChange={(e) =>
                  handleMultipleChoiceChange(choice, e.target.checked)
                }
              />
              <label
                className="form-check-label"
                htmlFor={`question-${question.id}-choice-${index}`}
              >
                {choice}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSingleChoiceQuestion = (
    question: QuestionData,
    userAnswer: string
  ) => {
    const choices = question.choices
      .split("|")
      .filter((choice) => choice.trim() !== "");

    return (
      <div className="question-content">
        <p className="question-text">{question.content}</p>
        {question.link && (
          <div className="audio-player mb-3">
            <audio controls>
              <source src={question.link} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        <div className="choices">
          {choices.map((choice, index) => (
            <div key={index} className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name={`question-${question.id}`}
                id={`question-${question.id}-choice-${index}`}
                value={choice}
                checked={userAnswer === choice}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
              />
              <label
                className="form-check-label"
                htmlFor={`question-${question.id}-choice-${index}`}
              >
                {choice}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFormCompletionQuestion = (
    question: QuestionData,
    userAnswer: string
  ) => {
    return (
      <div className="question-content">
        <p className="question-text">{question.content}</p>
        {question.link && (
          <div className="audio-player mb-3">
            <audio controls>
              <source src={question.link} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        <div className="form-completion-input">
          <input
            type="text"
            className="form-control"
            value={userAnswer}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Type your answer here"
          />
        </div>
      </div>
    );
  };

  const renderMatchingQuestion = (
    question: QuestionData,
    userAnswer: string
  ) => {
    const choices = question.choices
      .split("\n")
      .filter((choice) => choice.trim() !== "");

    return (
      <div className="question-content">
        <p className="question-text">{question.content}</p>
        {question.link && (
          <div className="audio-player mb-3">
            <audio controls>
              <source src={question.link} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        <div className="choices-list mb-3">
          <h6>Options:</h6>
          {choices.map((choice, index) => (
            <div key={index} className="choice-item">
              {choice}
            </div>
          ))}
        </div>
        <div className="matching-input">
          <label className="form-label">Your answer:</label>
          <input
            type="text"
            className="form-control"
            value={userAnswer}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Enter letter (A, B, C, etc.)"
            maxLength={1}
          />
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="reading-test-container">
      {/* Header */}
      <div className="test-header bg-primary text-white p-3">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-4">
              <span className="badge bg-light text-dark fw-bold fs-20 px-4 py-2 rounded-pill shadow-sm">
                {test?.testName}
              </span>
            </div>
            <div className="col-md-4 text-center">
              <span className="badge bg-light text-dark fw-bold fs-20 px-4 py-2 rounded-pill shadow-sm">
                Paragraph {currentParagraphNumber} of {totalParagraphs}
              </span>
            </div>
            <div className="col-md-4 text-end">
              <div className="timer d-flex align-items-center justify-content-end">
                {/* <span className="fw-bold fs-2 font-monospace text-white">
                  {formatTime(timeRemaining)}
                </span> */}
                <span className="badge bg-light text-dark fw-bold fs-20 px-4 py-2 rounded-pill shadow-sm">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container-fluid"
        style={{ height: "calc(100vh - 100px)" }}
      >
        <div className="row h-100">
          {/* Reading Passage (Left Side) - Only Current Paragraph */}
          <div className="col-lg-6 col-md-12 h-100">
            <div className="reading-passages p-3 h-100 overflow-auto">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Reading Passage</h5>
                {/* Paragraph Navigation */}
                <div className="paragraph-navigation">
                  <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={goToPreviousParagraph}
                    disabled={currentParagraphNumber === 1}
                  >
                    <i className="bi bi-arrow-left"></i> Previous Paragraph
                  </button>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={goToNextParagraph}
                    disabled={currentParagraphNumber === totalParagraphs}
                  >
                    Next Paragraph <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>

              {currentParagraph && (
                <div className="paragraph-section">
                  <h6 className="paragraph-title">
                    Paragraph {currentParagraph.paragraphNumber}
                  </h6>
                  <div className="paragraph-content p-3 border rounded bg-light">
                    {currentParagraph.content
                      .split("\n")
                      .map((line, lineIndex) => (
                        <p key={lineIndex} className="mb-2">
                          {line}
                        </p>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Split into Questions (4) and Indicators (2) */}
          <div className="col-lg-6 col-md-12 h-100">
            <div className="row h-100">
              {/* Questions Panel (4/6 of right side) */}
              <div className="col-8 h-100">
                <div
                  className="questions-panel p-3 h-100 overflow-auto"
                  key={`paragraph-${currentParagraphNumber}`}
                >
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">
                      Questions for Paragraph {currentParagraphNumber}
                    </h5>
                  </div>

                  {/* Questions Content */}
                  {currentParagraphQuestions.map((question) => (
                    <div
                      key={question.id}
                      id={`question-${question.id}`}
                      className="question-item mb-4 p-3 border rounded"
                    >
                      <div className="question-header mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="mb-0">
                            Question {getGlobalQuestionNumber(question.id)}
                          </h6>
                          <span className="badge bg-secondary">
                            {question.questionType}
                          </span>
                        </div>
                      </div>

                      <div className="question-content">
                        {renderQuestion(question)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Question Indicators Panel (2/6 of right side) */}
              <div className="col-4 h-100">
                <div className="indicators-panel p-3 h-100 bg-light border-start overflow-auto">
                  <div className="mb-3">
                    <h6 className="mb-2 text-center">Progress</h6>
                    <div className="text-center mb-3">
                      <span className="badge bg-primary">
                        Passage {currentParagraphNumber}
                      </span>
                    </div>
                  </div>

                  {/* All Question Indicators Grid */}
                  <div className="mb-4">
                    <p className="small fw-bold mb-2">All Questions:</p>
                    <div
                      className="d-flex flex-wrap gap-2 overflow-auto"
                      style={{ maxHeight: "200px" }}
                    >
                      {getAllQuestionsWithGlobalNumbers().map((question) => (
                        <span
                          key={question.id}
                          className={`badge fw-bold user-select-none ${
                            userAnswers[question.id]
                              ? "bg-primary text-white"
                              : "bg-white text-dark border"
                          }`}
                          style={{
                            minWidth: "32px",
                            height: "32px",
                            cursor: "pointer",
                          }}
                          onClick={() => navigateToQuestion(question.id)}
                          title={`Question ${question.globalNumber} (Passage ${question.paragraphNumber})`}
                        >
                          {question.globalNumber}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* All Passages Overview */}
                  <div className="mb-4">
                    <p className="small fw-bold mb-2">Passages:</p>
                    <div className="d-flex flex-column gap-3">
                      {[1, 2, 3].map((passageNum) => {
                        const passageQuestions =
                          getAllQuestionsWithGlobalNumbers().filter(
                            (q) => q.paragraphNumber === passageNum
                          );
                        return (
                          <div key={passageNum} className="passage-section">
                            <div
                              className={`passage-header p-2 rounded mb-2 ${
                                passageNum === currentParagraphNumber
                                  ? "bg-primary text-white"
                                  : "bg-light border"
                              }`}
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setCurrentParagraphNumber(passageNum)
                              }
                            >
                              <span className="fw-bold">
                                Passage {passageNum}
                              </span>
                            </div>
                            <div className="d-flex flex-wrap gap-2 ps-2">
                              {passageQuestions.map((question) => (
                                <span
                                  key={question.id}
                                  className={`badge fw-bold user-select-none ${
                                    userAnswers[question.id]
                                      ? "bg-primary text-white"
                                      : "bg-white text-dark border"
                                  }`}
                                  style={{
                                    minWidth: "32px",
                                    height: "32px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    navigateToQuestion(question.id)
                                  }
                                  title={`Question ${question.globalNumber}`}
                                >
                                  {question.globalNumber}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Test Button */}
                  <div className="mt-auto pt-3">
                    <button
                      className="btn btn-success w-100 fw-bold py-3"
                      onClick={handleSubmitTest}
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Submit Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadingPage;

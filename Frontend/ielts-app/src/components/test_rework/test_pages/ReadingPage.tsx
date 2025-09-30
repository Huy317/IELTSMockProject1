import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { QuestionFullDetail } from "../../../types/Question";
import type { TestWithAuthorName } from "../../../types/Test";
import { getAllQuestionsAndParagraphsWithTestId } from "../../../services/questionService";
import { getTestById } from "../../../services/testService";
import { set } from "react-hook-form";

const actualquestions: QuestionData[] = [
  //question
  {
    id: 3,
    questionType: "SingleChoice",
    content: "Select your answer",
    choices: "choice1|choice2|choice3|choice4",
    correctAnswer: "choice2",
    explanation: "",
    order: 101,
    parentId: 3,
    link: "",
    paragraphNumber: 1,
  },
  {
    id: 4,
    questionType: "MultipleChoice",
    content: "Select your multiple answer",
    choices: "choice1|choice2|choice3|choice4",
    correctAnswer: "choice2|choice3",
    explanation: "",
    order: 102,
    parentId: 3,
    link: "",
    paragraphNumber: 1,
  },
  {
    id: 5,
    questionType: "FormCompletion",
    content: "There are ____ people in your house",
    choices: "",
    correctAnswer: "three",
    explanation: "",
    order: 201,
    parentId: 1,
    link: "",
    paragraphNumber: 2,
  },
  {
    id: 6,
    questionType: "FormCompletion",
    content: "There are ____ people in your house (Question 2)",
    choices: "",
    correctAnswer: "three",
    explanation: "",
    order: 202,
    parentId: 1,
    link: "",
    paragraphNumber: 2,
  },
  {
    id: 7,
    questionType: "Matching",
    content: "Paragraph A:",
    choices: "The list of headings:\nA. The blue\nB. The red\nC. The green\nD. The yellow",
    correctAnswer: "the blue",
    explanation: "",
    order: 301,
    parentId: 2,
    link: "",
    paragraphNumber: 3,
  },
  {
    id: 8,
    questionType: "Matching",
    content: "Paragraph B:",
    choices: "The list of headings:\nA. The blue\nB. The red\nC. The green\nD. The yellow",
    correctAnswer: "the red",
    explanation: "",
    order: 302,
    parentId: 2,
    link: "",
    paragraphNumber: 3,
  },
];

const actualparagraph: ParagraphData[] = [
  {
    id: 3,
    //content: "This is a longlong paragraph 1.",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at ex quam. Suspendisse auctor consequat mollis. Phasellus vulputate, nisl sed placerat vehicula, erat ante sodales augue, sed faucibus odio libero vitae nisl. Nam finibus neque est, in volutpat nunc lacinia at. Proin consectetur purus ut lectus porttitor aliquet. Mauris finibus velit a dignissim molestie. Ut ac ligula ex. Sed aliquam justo vitae neque bibendum lobortis. Mauris sit amet felis nisi. Donec faucibus lectus et eleifend finibus. Integer eros nulla, venenatis at tincidunt in, commodo in ante. Vivamus a nisi tincidunt, lobortis arcu eu, aliquam lacus.

Nullam auctor sollicitudin turpis, ac ullamcorper nulla laoreet ut. Donec facilisis tempor purus, molestie feugiat ipsum egestas quis. Duis maximus magna ac hendrerit tempus. Suspendisse potenti. Suspendisse pretium fringilla metus sit amet rhoncus. Nulla scelerisque tortor eget hendrerit rutrum. Proin sed sagittis mi. Duis in tellus posuere tellus feugiat venenatis. Aliquam iaculis nisi eu metus pellentesque, non elementum arcu dictum. Fusce sem augue, condimentum id egestas vitae, tincidunt et massa.

Sed rhoncus nisi sit amet congue fermentum. Vestibulum placerat, dolor nec sollicitudin convallis, tortor urna consectetur lorem, fermentum vulputate lorem nunc sed felis. Nunc id eros viverra, tempus massa nec, sagittis ipsum. Maecenas nisi sapien, ultricies sit amet elementum sit amet, varius non metus. Etiam interdum tempor blandit. Nunc leo purus, accumsan eget mattis ac, ullamcorper eu metus. Vestibulum sit amet faucibus quam, non mattis neque. Vivamus eu urna nisl. Etiam nec molestie est. Sed pellentesque molestie sodales. Morbi vel risus urna. Morbi venenatis felis eros, maximus molestie velit ullamcorper in. Nulla non varius lacus.

Proin pharetra lacinia lacinia. Proin viverra interdum enim eu elementum. Aenean et mauris id diam vehicula gravida id eget purus. Pellentesque a orci id ipsum dapibus gravida. Nullam mattis lacinia dolor, eu egestas tellus fermentum quis. Duis rutrum nulla lacus, ut ornare orci luctus ut. Vestibulum et neque porttitor, porta quam cursus, lacinia odio. Maecenas laoreet massa in turpis luctus, et facilisis ante consectetur. Morbi rutrum tellus dignissim mauris semper, eget bibendum eros placerat. Nulla sed est facilisis, finibus dolor et, vulputate massa. Proin in ante sagittis, rutrum elit vel, suscipit neque. Nulla eleifend odio enim, at luctus enim pulvinar at. Duis nec auctor leo, a dignissim eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

Curabitur id elit vel sapien pellentesque vehicula consectetur non dui. Maecenas dictum, sapien eu lobortis fermentum, urna nisi convallis ante, vitae scelerisque eros elit a mauris. Nam aliquam egestas nisi id vestibulum. Aliquam faucibus ante sed finibus accumsan. Vestibulum aliquet nisi metus, vel consectetur ex cursus a. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer ultrices, sapien a pharetra feugiat, tellus nisi placerat elit, vel molestie mauris mi at massa. Suspendisse blandit vulputate orci, et tincidunt mauris rhoncus fringilla. Phasellus nec odio nec ligula vestibulum rutrum in eget augue. Maecenas ac maximus est, in mollis magna. Aliquam eget sapien dui.`,
    order: 100,
    paragraphNumber: 1,
  },
  {
    id: 1,
    content: "This is a longlong paragraph 2",
    order: 200,
    paragraphNumber: 2,
  },
  {
    id: 2,
    content: "This is a longlong paragraph 3",
    order: 300,
    paragraphNumber: 3,
  },
];

const currentTest: TestWithAuthorName = {
  id: 0,
  testName: "IELTS Reading Test 1",
  createdBy: 1,
  createdAt: "2023-10-01T00:00:00Z",
  resource: "cambridge",
  isActive: true,
  instructorName: "AdminName",
  typeName: "Reading",
  submissionCount: 10,
};

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
  const { testId } = useParams<{ testId: string }>();

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

  // Fetch test data
  // useEffect(() => {
  //     const fetchTestData = async () => {
  //         if (!testId) return;

  //         try {
  //             // Fetch test info and questions
  //             const [testData, allQuestionsData] = await Promise.all([
  //                 getTestById(testId),
  //                 getAllQuestionsAndParagraphsWithTestId(parseInt(testId))
  //             ]);

  //             setTest(testData);

  //             // Separate paragraphs and questions based on ParentId
  //             const paragraphsData = allQuestionsData
  //                 .filter(q => q.parentId === 0) // ParentId = 0 means it's a paragraph
  //                 .map(p => ({
  //                     id: p.id,
  //                     content: p.content,
  //                     order: p.order,
  //                     paragraphNumber: Math.floor(p.order / 100)
  //                 }))
  //                 .sort((a, b) => a.order - b.order);

  //             const actualQuestions = allQuestionsData
  //                 .filter(q => q.parentId !== 0) // ParentId != 0 means it's a normal question
  //                 .map(q => ({
  //                     id: q.id,
  //                     questionType: q.questionType,
  //                     content: q.content,
  //                     choices: q.choices || '',
  //                     correctAnswer: q.correctAnswer,
  //                     explanation: q.explanation,
  //                     order: q.order,
  //                     parentId: q.parentId,
  //                     link: q.link || '',
  //                     paragraphNumber: Math.floor(q.order / 100) // Questions belong to paragraph by order range
  //                 }))
  //                 .sort((a, b) => a.order - b.order);

  //             setParagraphs(paragraphsData);
  //             setQuestions(actualQuestions);
  //             setLoading(false);
  //         } catch (error) {
  //             console.error('Error fetching test data:', error);
  //             setLoading(false);
  //         }
  //     };

  //     fetchTestData();
  // }, [testId]);

  // This is for hard code testing UI only
  useEffect(() => {
    // Set hardcoded data
    setTest(currentTest);
    setParagraphs(actualparagraph);
    setQuestions(actualquestions);
    setLoading(false);
  }, []); // Empty dependency array - runs only once on mount

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
              <h4 className="mb-0">{test?.testName}</h4>
            </div>
            <div className="col-md-4 text-center">
              <span 
                className="badge bg-light text-dark fw-bold" 
                style={{
                  fontSize: "1.2rem",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  letterSpacing: "0.05rem"
                }}
              >
                Paragraph {currentParagraphNumber} of {totalParagraphs}
              </span>
            </div>
            <div className="col-md-4 text-end">
              <div className="timer d-flex align-items-center justify-content-end">
                <i className="bi bi-clock me-2" style={{ fontSize: "1.5rem" }}></i>
                <span 
                  className="fw-bold" 
                  style={{ 
                    fontSize: "1.8rem", 
                    fontFamily: "monospace",
                    letterSpacing: "0.1rem",
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                  }}
                >
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          {/* Reading Passage (Left Side) - Only Current Paragraph */}
          <div className="col-lg-6 col-md-12">
            <div
              className="reading-passages p-3"
              style={{ height: "calc(100vh - 100px)", overflowY: "auto" }}
            >
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

          {/* Questions Panel (Right Side) - All Current Paragraph Questions */}
          <div
            className="col-lg-6 col-md-12"
            key={`paragraph-${currentParagraphNumber}`}
          >
            <div
              className="questions-panel p-3"
              style={{ height: "calc(100vh - 100px)", overflowY: "auto" }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">
                  Questions for Paragraph {currentParagraphNumber}
                </h5>

                {/* Question Sequence Indicators */}
                <div className="question-sequence">
                  <div className="d-flex flex-wrap gap-2">
                    {currentParagraphQuestions.map((question, index) => (
                      <span
                        key={question.id}
                        className={`badge ${
                          userAnswers[question.id]
                            ? "bg-success"
                            : "bg-outline-secondary"
                        }`}
                        style={{
                          backgroundColor: userAnswers[question.id]
                            ? "#198754"
                            : "#6c757d",
                          color: "white",
                          padding: "0.5rem",
                          borderRadius: "50%",
                          minWidth: "30px",
                          height: "30px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {index + 1}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* All Questions for Current Paragraph */}
              <div
                className="all-questions"
                key={`questions-${currentParagraphNumber}`}
              >
                {currentParagraphQuestions.map((question, index) => (
                  <div
                    key={question.id}
                    className="question-item mb-4 p-3 border rounded"
                  >
                    <div className="question-header mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">Question {index + 1}</h6>
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

              {/* Bottom Navigation - Only Paragraph Navigation */}
              <div className="paragraph-controls mt-4 pt-3 border-top">
                <div className="row">
                  <div className="col-6">
                    <button
                      className="btn btn-outline-secondary w-100"
                      onClick={goToPreviousParagraph}
                      disabled={currentParagraphNumber === 1}
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Previous Paragraph
                    </button>
                  </div>
                  <div className="col-6">
                    {currentParagraphNumber === totalParagraphs ? (
                      <button
                        className="btn btn-success w-100"
                        onClick={handleSubmitTest}
                      >
                        Submit Test
                        <i className="bi bi-check-circle ms-2"></i>
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary w-100"
                        onClick={goToNextParagraph}
                      >
                        Next Paragraph
                        <i className="bi bi-arrow-right ms-2"></i>
                      </button>
                    )}
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

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MultipleChoiceModal from "./question_modal/MultipleChoiceModal";
import { useParams } from "react-router-dom";
import type { TestToUpdate, TestWithAuthorName } from "../../types/Test";
import { getTestById, updateTest } from "../../services/testService";
import type {
  Question,
  QuestionFullDetail,
  QuestionToUpdate,
} from "../../types/Question";
import {
  getAllQuestionsAndParagraphsWithTestId,
  updateQuestion,
} from "../../services/questionService";
import FillInTheBlankModal from "./question_modal/FillInTheBlankModal";
import SingleChoiceModal from "./question_modal/SingleChoiceModal";
import MatchingModal from "./question_modal/MatchingModal";

function EditReadingTest() {
  const { id } = useParams<{ id: string }>();

  // Question types mapping table
  const questionTypes = {
    FillInTheBlank: "Fill In The Blank",
    MultipleChoice: "Multiple Choice",
    SingleChoice: "Single Choice",
    Matching: "Matching"
  };


  // --------------------------------------------------------------
  // --- OTHER DATA HANDLER ---
  // To keep track of the next order number for each parentId
  const [orderCounters, setOrderCounters] = useState<Record<number, number>>();
  
  const [currentParentId, setCurrentParentId] = useState<number>(0);
  const [currentOrder, setCurrentOrder] = useState<number>(0);

  function initializeCounters(questions: QuestionFullDetail[] | undefined) {
    if (!questions) return;

    const counters: Record<number, number> = {};
    questions.forEach((q) => {
      if (!counters[q.parentId]) {
        counters[q.parentId] = q.order;
      } else {
        counters[q.parentId] = Math.max(counters[q.parentId], q.order);
      }
    });
    setOrderCounters(counters);
    //console.log("Initialized order counters:", counters);
  }

  // Get the next order number for a given parentId
  function getNextOrder(parentId: number): number {
    if (!orderCounters) return 1;
    const next = (orderCounters[parentId] || 0) + 1;
    return next;
  }
  // Increment the order counter for a given parentId
  function incrementOrderCounter(parentId: number) {
    setOrderCounters((prev) => {
      if (!prev) return { [parentId]: 1 };
      return { ...prev, [parentId]: (prev[parentId] || 0) + 1 };
    });
  }

  // --- TEST METADATA HANDLING ---
  const [test, setTest] = useState<TestWithAuthorName | null>(null);
  const [changed, setChanged] = useState(false);

  const fetchTest = async () => {
    if (!id) return;
    const loadPromise = getTestById(id).then((data) => {
      setTest(data);
      return data;
    });

    toast.promise(loadPromise, {
      pending: "Loading test...",
      success: "Test loaded",
      error: "Failed to load test details.",
    });
  };
  // --------------------------------------------------------------
  // --- QUESTIONS LIST HANDLING ---
  const [questions, setQuestions] = useState<QuestionFullDetail[]>([]);

  const fetchQuestions = async () => {
    if (!id) return;
    // Fetch questions logic here
    const loadPromise = getAllQuestionsAndParagraphsWithTestId(parseInt(id)).then((data) => {

      setQuestions(data);
      mapParagraphs(data);
      return data;

    });
    const result = await toast.promise(loadPromise, {
      pending: "Loading questions...",
      success: "Questions loaded",
      error: "Failed to load questions.",
    });
    //console.log("Result after fetch:", result);
    return result;
  };

  // useEffect being called twice is cuz of StrictMode in main.tsx
  // should not cause issues in production though
  useEffect(() => {
    fetchTest().then(fetchQuestions).then(initializeCounters);
  }, []);
  // --------------------------------------------------------------


  // --- PARAGRAPHS HANDLING ---
  // Handling state for paragraph texts and question types
  const [paragraphTexts, setParagraphTexts] = useState<string[]>(["", "", ""]);
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>(["MultipleChoice", "MultipleChoice", "MultipleChoice"]);
  const [paragraphChange, setParagraphChange] = useState<boolean[]>([false, false, false]);

  const handleParagraphChange = (paragraphIndex: number, value: string) => {
    const newParagraphTexts = [...paragraphTexts];
    newParagraphTexts[paragraphIndex] = value;
    setParagraphChange((prev) => {
      const newChange = [...prev];
      newChange[paragraphIndex] = true;
      return newChange;
    });
    setParagraphTexts(newParagraphTexts);
  };

  const handleSaveParagraph = (paragraphIndex: number) => {
    if (!paragraphChange[paragraphIndex]) {
      toast.info("No changes to save for this paragraph.");
      return;
    }

    const paragraphToUpdate = questions.find(
      (q) =>
        q.questionType === "Paragraph" &&
        q.parentId === 0 &&
        q.order - 1 === paragraphIndex
    );

    if (!paragraphToUpdate) {
      toast.error("Paragraph not found.");
      return;
    }

    const { id, ...rest } = paragraphToUpdate;

    // Use the updated content from the textarea, not the original content
    const updatedParagraph: QuestionToUpdate = {
      ...rest, // Spread existing properties
      content: paragraphTexts[paragraphIndex],
    };
    //console.log("Updating paragraph:", updatedParagraph);
    //console.log("With ID:", paragraphToUpdate.id);
    const updatePromise = updateQuestion(id, updatedParagraph).then((data) => {
      // Reset change flag
      setParagraphChange((prev) => {
        const newChange = [...prev];
        newChange[paragraphIndex] = false;
        return newChange;
      });

      return data;
    });

    toast.promise(updatePromise, {
      pending: "Saving paragraph...",
      success: "Paragraph saved successfully.",
      error: "Failed to save paragraph.",
    });
  };

  // --------------------------------------------------------------
  // --- QUESTIONS MODAL HANDLING ---
  // Handle question type selection changes
  const handleQuestionTypeChange = (paragraphIndex: number, value: string) => {
    const newSelectedQuestionTypes = [...selectedQuestionTypes];
    newSelectedQuestionTypes[paragraphIndex] = value;
    setSelectedQuestionTypes(newSelectedQuestionTypes);
  };

  // Placeholder function to handle add question button clicks
  const handleAddQuestion = (paragraphIndex: number, questionType: string) => {
    handleOpenModal(paragraphIndex);
  };

  // --------------------------------------------------------------



  // ----------------------
  // --- MODAL HANDLING ---
  // ----------------------

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState<number | null>(null);
  // Modal handler functions
  const handleOpenModal = (paragraphIndex: number) => {
    setCurrentParagraphIndex(paragraphIndex);

    let selectedParagraph = questions.find(
      (q) => q.questionType === "Paragraph" && q.parentId === 0 && q.order - 1 === paragraphIndex
    );

    //console.log("Selected paragraph for modal:", selectedParagraph);
    if (selectedParagraph) {
      setCurrentParentId(selectedParagraph.id);
      setCurrentOrder(getNextOrder(selectedParagraph.id));
    }


    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentParagraphIndex(null);
  };

  // This is called after question modal submit successfully
  const handleModalSubmit = (data: Question) => {
    console.log("Question data submitted:", data, "for paragraph:", currentParagraphIndex);
    let paragraphId = data.parentId;
    if (!paragraphId) return;

    // Increment the order counter for this parentId
    incrementOrderCounter(paragraphId);
    handleCloseModal();
  };



  // --------------------------------------------------------------  
  // --- META DATA SAVE HANDLING ---
  function handleSaveMetadata() {
    if (!test) return;
    if (!changed) {
      toast.info("No changes to save.");
      return;
    }

    let updatedDataToSend: TestToUpdate = {
      testName: test.testName,
      createdBy: test.createdBy,
      resource: test.resource,
      isActive: test.isActive,
    };
    console.log("Saving metadata changes:", updatedDataToSend);

    const savePromise = updateTest(test.id, updatedDataToSend).then(() => {
      setChanged(false);
    });

    toast.promise(savePromise, {
      pending: "Saving metadata...",
      success: "Metadata updated successfully.",
      error: "Failed to update metadata.",
    });
  }

  // --------------------------------------------------------------
  // --- HELPER FUNCTIONS ---

  function mapParagraphs(questionsData: QuestionFullDetail[] = questions) {
    // go through questions, find .questionType === 'Paragraph', order 100,200,300 / 100 to get index of paragraphs
    let paragraphs = questionsData.filter(
      (q) => q.questionType === "Paragraph" && q.parentId === 0
    );

    // update the paragraphs into paragraphTexts state
    // go through paragraphs, set paragraphText[0] to paragraphs order 100, paragraphText[1] to order 200, paragraphText[2] to order 300
    let newParagraphTexts = [...paragraphTexts];
    paragraphs.forEach((p) => {
      let index = p.order - 1;
      if (index >= 0 && index < newParagraphTexts.length) {
        newParagraphTexts[index] = p.content || "";
      }
    });
    setParagraphTexts(newParagraphTexts);

    return paragraphs;
  }




  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          {/* Page Header */}
          <div className="mb-4">
            <h2 className="mb-0">
              <i className="bi bi-file-text me-2"></i>
              Create IELTS Reading Test
            </h2>
          </div>

          {/* Metadata Card */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="bi bi-gear me-2"></i>
                Test Metadata
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="testName" className="form-label fw-bold">
                      <i className="bi bi-pencil me-1"></i>
                      Test Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="testName"
                      placeholder="Enter test name..."
                      value={test ? test.testName : ""}
                      onChange={(e) => {
                        if (test) {
                          setTest({ ...test, testName: e.target.value });
                          setChanged(true);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="createdBy" className="form-label fw-bold">
                      <i className="bi bi-person me-1"></i>
                      Created by
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="createdBy"
                      value={test ? test.instructorName : ""}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="createdAt" className="form-label fw-bold">
                      <i className="bi bi-calendar me-1"></i>
                      Created at
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="createdAt"
                      value={
                        test
                          ? new Date(test.createdAt).toLocaleDateString()
                          : ""
                      }
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="resource" className="form-label fw-bold">
                      <i className="bi bi-link me-1"></i>
                      Resource
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="resource"
                      placeholder="Enter resource reference..."
                      value={test ? test.resource : ""}
                      onChange={(e) => {
                        if (test) {
                          setTest({ ...test, resource: e.target.value });
                          setChanged(true);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isActive"
                      checked={test ? test.isActive : false}
                      onChange={() => {
                        if (test) {
                          setTest({ ...test, isActive: !test.isActive });
                          setChanged(true);
                        }
                      }}
                    />
                    <label
                      className="form-check-label fw-bold"
                      htmlFor="isActive"
                    >
                      Is Active
                    </label>
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-end">
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={handleSaveMetadata}
                  >
                    <i className="bi bi-save me-1"></i>
                    Save Metadata
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Paragraphs and Questions Section */}
          {/* Map and create 3 paragraphs */}
          {[1, 2, 3].map((paragraphNumber, index) => (
            <div key={paragraphNumber} className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <i className="bi bi-file-earmark-text me-2"></i>
                  Paragraph {paragraphNumber}
                </h5>
              </div>
              <div className="card-body">
                {/* Paragraph Text Area */}
                <div className="mb-4">
                  <label
                    htmlFor={`paragraph${paragraphNumber}`}
                    className="form-label fw-bold"
                  >
                    Paragraph Content
                  </label>
                  <textarea
                    className="form-control"
                    id={`paragraph${paragraphNumber}`}
                    rows={8}
                    placeholder={`Enter the content for paragraph ${paragraphNumber}...`}
                    value={paragraphTexts[index]}
                    onChange={(e) =>
                      handleParagraphChange(index, e.target.value)
                    }
                  ></textarea>
                  <div className="mt-2 d-flex justify-content-end">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleSaveParagraph(index)}
                    >
                      <i className="bi bi-save me-1"></i>
                      Save Paragraph
                    </button>
                  </div>
                </div>

                {/* Add Question Section */}
                <div className="border-top pt-3">
                  <h6 className="mb-3">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Questions
                  </h6>
                  <div className="row align-items-end">
                    <div className="col-md-6">
                      <label
                        htmlFor={`questionType${paragraphNumber}`}
                        className="form-label"
                      >
                        Question Type
                      </label>
                      <select
                        className="form-select"
                        id={`questionType${paragraphNumber}`}
                        value={selectedQuestionTypes[index]}
                        onChange={(e) =>
                          handleQuestionTypeChange(index, e.target.value)
                        }
                      >
                        {Object.entries(questionTypes).map(([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <button
                        className="btn btn-success w-100"
                        onClick={() => {
                          handleAddQuestion(
                            index,
                            selectedQuestionTypes[index]
                          );
                        }}
                      >
                        <i className="bi bi-plus me-1"></i>
                        Add Question
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="row mt-4">
            <div className="col-12 d-flex justify-content-end gap-2">
              <button className="btn btn-outline-secondary">
                <i className="bi bi-eye me-1"></i>
                Preview Test
              </button>
              <button className="btn btn-outline-danger">
                <i className="bi bi-trash me-1"></i>
                Cancel
              </button>
              <button className="btn btn-primary">
                <i className="bi bi-check-circle me-1"></i>
                Create Test
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Multiple Choice Modal */}
      {/* <MultipleChoiceModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleModalSubmit}
                otherData={{ parentId: 0, testId: test ? test.id : 0, order: 0 }}
            /> */}
      {/* Conditional Modal Rendering */}
      {isModalOpen && currentParagraphIndex !== null && (
        <>
          {selectedQuestionTypes[currentParagraphIndex] ===
            "MultipleChoice" && (
              <MultipleChoiceModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleModalSubmit}
                otherData={{
                  parentId: currentParentId,
                  testId: test ? test.id : 0,
                  order: currentOrder,
                }}
              />
            )}

          {selectedQuestionTypes[currentParagraphIndex] ===
            "FillInTheBlank" && (
              <FillInTheBlankModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleModalSubmit}
                otherData={{
                  parentId:  currentParentId,
                  testId: test ? test.id : 0,
                  order: currentOrder,
                }}
              />
            )}

          {selectedQuestionTypes[currentParagraphIndex] === "SingleChoice" && (
            <SingleChoiceModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSubmit={handleModalSubmit}
              otherData={{
                parentId: currentParentId,
                testId: test ? test.id : 0,
                order: currentOrder,
              }}
            />
          )}

          {selectedQuestionTypes[currentParagraphIndex] === "Matching" && (
            <MatchingModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onSubmit={handleModalSubmit}
              otherData={{
                parentId: currentParentId,
                testId: test ? test.id : 0,
                order: currentOrder,
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

export default EditReadingTest;

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import type { TestToUpdate, TestWithAuthorName } from "../../types/Test";
import { updateTest } from "../../services/testService";
import type {
  Question,
  QuestionFullDetail,
  QuestionToUpdate,
} from "../../types/Question";
import {
  getAllQuestionsAndParagraphsWithTestId,
  updateQuestion,
} from "../../services/questionService";
import QuestionDisplay from "./question_display/QuestionDisplay";
import ModalManager from "./ModalManager";

interface EditListeningTestProps {
  testPrefetch: TestWithAuthorName;
}

function EditListeningTest({ testPrefetch }: EditListeningTestProps) {
  const { id } = useParams<{ id: string }>();

  // Question types mapping table
  const questionTypes = {
    FillInTheBlank: "Fill In The Blank",
    MultipleChoice: "Multiple Choice",
    SingleChoice: "Single Choice",
    Matching: "Matching",
    DiagramLabeling: "Diagram Labeling",
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
  // --------------------------------------------------------------

  // --- TEST METADATA HANDLING ---
  const [test, setTest] = useState<TestWithAuthorName | null>(testPrefetch);
  const [changed, setChanged] = useState(false);
  // --------------------------------------------------------------
  // --- QUESTIONS LIST HANDLING ---
  const [questions, setQuestions] = useState<QuestionFullDetail[]>([]);

  const fetchQuestions = async () => {
    if (!id) return;
    // Fetch questions logic here
    const loadPromise = getAllQuestionsAndParagraphsWithTestId(parseInt(id)).then((data) => {

      setQuestions(data);
      mapAudioSections(data);
      console.log("Fetched questions:", data);
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
    fetchQuestions().then(initializeCounters);
  }, []);
  // --------------------------------------------------------------

  // --- AUDIO SECTIONS HANDLING ---
  // Handling state for audio transcript texts and question types
  const [audioTranscripts, setAudioTranscripts] = useState<string[]>(["", "", "", ""]);
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>(["MultipleChoice", "MultipleChoice", "MultipleChoice", "MultipleChoice"]);
  const [audioTranscriptChange, setAudioTranscriptChange] = useState<boolean[]>([false, false, false, false]);
  const [audioFiles, setAudioFiles] = useState<File[]>([]);

  const handleAudioTranscriptChange = (sectionIndex: number, value: string) => {
    const newAudioTranscripts = [...audioTranscripts];
    newAudioTranscripts[sectionIndex] = value;
    setAudioTranscriptChange((prev) => {
      const newChange = [...prev];
      newChange[sectionIndex] = true;
      return newChange;
    });
    setAudioTranscripts(newAudioTranscripts);
  };

  const handleSaveAudioSection = (sectionIndex: number) => {
    if (!audioTranscriptChange[sectionIndex]) {
      toast.info("No changes to save for this audio section.");
      return;
    }

    const audioSectionToUpdate = questions.find(
      (q) =>
        q.questionType === "Audio" &&
        q.parentId === 0 &&
        q.order - 1 === sectionIndex
    );

    if (!audioSectionToUpdate) {
      toast.error("Audio section not found.");
      return;
    }

    const { id, ...rest } = audioSectionToUpdate;

    // Use the updated content from the textarea, not the original content
    const updatedAudioSection: QuestionToUpdate = {
      ...rest, // Spread existing properties
      content: audioTranscripts[sectionIndex],
    };
    
    const updatePromise = updateQuestion(id, updatedAudioSection).then((data) => {
      // Reset change flag
      setAudioTranscriptChange((prev) => {
        const newChange = [...prev];
        newChange[sectionIndex] = false;
        return newChange;
      });

      return data;
    });

    toast.promise(updatePromise, {
      pending: "Saving audio section...",
      success: "Audio section saved successfully.",
      error: "Failed to save audio section.",
    });
  };

  // Audio file upload placeholder function
  const handleAudioUpload = (sectionIndex: number, file: File | null) => {
    if (!file) return;
    
    console.log(`Audio file selected for section ${sectionIndex + 1}:`, file.name);
    
    // Placeholder implementation - to be implemented later
    toast.info(`Audio file "${file.name}" selected for Section ${sectionIndex + 1}. Upload functionality to be implemented.`);
    
    // For now, just store the file reference
    setAudioFiles((prev) => {
      const newFiles = [...prev];
      newFiles[sectionIndex] = file;
      return newFiles;
    });
  };

  // --------------------------------------------------------------
  // --- QUESTIONS MODAL HANDLING ---
  // Handle question type selection changes
  const handleQuestionTypeChange = (sectionIndex: number, value: string) => {
    const newSelectedQuestionTypes = [...selectedQuestionTypes];
    newSelectedQuestionTypes[sectionIndex] = value;
    setSelectedQuestionTypes(newSelectedQuestionTypes);
  };

  // Placeholder function to handle add question button clicks
  const handleAddQuestion = (sectionIndex: number, _questionType: string) => {
    handleOpenModal(sectionIndex);
  };

  // --------------------------------------------------------------

  // ----------------------
  // --- MODAL HANDLING ---
  // ----------------------

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(null);
  // Modal handler functions
  const handleOpenModal = (sectionIndex: number) => {
    setCurrentSectionIndex(sectionIndex);

    let selectedAudioSection = questions.find(
      (q) => q.questionType === "Audio" && q.parentId === 0 && q.order - 1 === sectionIndex
    );

    //console.log("Selected audio section for modal:", selectedAudioSection);
    if (selectedAudioSection) {
      setCurrentParentId(selectedAudioSection.id);
      setCurrentOrder(getNextOrder(selectedAudioSection.id));
    }

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSectionIndex(null);
  };

  // This is called after question modal submit successfully
  const handleModalSubmit = (data: Question) => {
    console.log("Question data submitted:", data, "for section:", currentSectionIndex);
    let sectionId = data.parentId;
    if (!sectionId) return;

    // Increment the order counter for this parentId
    incrementOrderCounter(sectionId);

    // Add the new question to the questions state
    setQuestions((prevQuestions) => [...prevQuestions, data as QuestionFullDetail]);

    // Also add to sectionsQuestions state
    if (currentSectionIndex === null) return;
    sectionsQuestions[currentSectionIndex || 0].push(data as QuestionFullDetail);
    setSectionsQuestions([...sectionsQuestions]);

    handleCloseModal();
  };
  // --------------------------------------------------------------
  // --- UPDATE MODAL HANDLING --- 
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentEditQuestion, setCurrentEditQuestion] = useState<Question | null>(null);

  function handleOpenUpdateModal(question: Question) {
    setCurrentEditQuestion(question);
    setIsUpdateModalOpen(true);
  }

  function handleCloseUpdateModal() {
    setIsUpdateModalOpen(false);
    setCurrentEditQuestion(null);
  }

  function handleUpdateModalSubmit(updatedQuestion: Question) {
    console.log("Question updated:", updatedQuestion);
    
    // Update the question in the questions state
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion as QuestionFullDetail : q))
    );

    // Close the modal
    handleCloseUpdateModal();
  }

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

  // --- QUESTIONS DISPLAY HANDLING ---
  const [sectionsQuestions, setSectionsQuestions] = useState<QuestionFullDetail[][]>([[], [], [], []]);

  useEffect(() => {
    //console.log("useEffect triggered for questions update:", questions.length);
    
    // Filter out only questions (exclude audio sections)
    const onlyQuestions = questions.filter((q) => q.questionType !== "Audio");
    //console.log("Only questions:", onlyQuestions);

    // Map questions to their respective sections based on parentId
    const sectionQuestions: QuestionFullDetail[][] = [[], [], [], []];
    onlyQuestions.forEach((q) => {
      // Find the index of the audio section this question belongs to
      const sectionIndex = questions.findIndex(
        (p) => p.questionType === "Audio" && p.id === q.parentId
      );
      if (sectionIndex !== -1 && sectionIndex < 4) {
        sectionQuestions[sectionIndex].push(q);
      }
    });
    
    console.log("Setting sectionsQuestions:", sectionQuestions);
    setSectionsQuestions(sectionQuestions);

  }, [questions]);

  function onDeleteQuestion(deletedQuestionId: number) {
    // Remove the question from the questions state
    setQuestions((prevQuestions) =>
      prevQuestions.filter((q) => q.id !== deletedQuestionId)
    );
    // Also remove from sectionsQuestions state
    setSectionsQuestions((prevSectionQuestions) => {
      return prevSectionQuestions.map((sectionQs) =>
        sectionQs.filter((q) => q.id !== deletedQuestionId)
      );
    });
  }

  // --------------------------------------------------------------

  // --------------------------------------------------------------
  // --- HELPER FUNCTIONS ---

  function mapAudioSections(questionsData: QuestionFullDetail[] = questions) {
    let audioSections = questionsData.filter(
      (q) => q.questionType === "Audio" && q.parentId === 0
    );

    // update the audio sections into audioTranscripts state
    // go through sections, set audioTranscripts[0] to sections order 100, audioTranscripts[1] to order 200, etc.
    let newAudioTranscripts = [...audioTranscripts];
    audioSections.forEach((section) => {
      let index = section.order - 1;
      if (index >= 0 && index < newAudioTranscripts.length) {
        newAudioTranscripts[index] = section.content || "";
      }
    });
    setAudioTranscripts(newAudioTranscripts);

    return audioSections;
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          {/* Page Header */}
          <div className="mb-4">
            <h2 className="mb-0">
              <i className="bi bi-headphones me-2"></i>
              Create IELTS Listening Test
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

          {/* Audio Sections and Questions Section */}
          {/* Map and create 4 audio sections */}
          {[1, 2, 3, 4].map((sectionNumber, index) => (
            <div key={sectionNumber} className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">
                  <i className="bi bi-volume-up me-2"></i>
                  Section {sectionNumber}
                </h5>
              </div>
              <div className="card-body">
                {/* Audio File Upload */}
                <div className="mb-4">
                  <label
                    htmlFor={`audioFile${sectionNumber}`}
                    className="form-label fw-bold"
                  >
                    <i className="bi bi-file-earmark-music me-1"></i>
                    Audio File
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id={`audioFile${sectionNumber}`}
                    accept="audio/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      handleAudioUpload(index, file);
                    }}
                  />
                  {audioFiles[index] && (
                    <div className="mt-2">
                      <small className="text-muted">
                        <i className="bi bi-check-circle text-success me-1"></i>
                        Selected: {audioFiles[index].name}
                      </small>
                    </div>
                  )}
                </div>

                {/* Audio Transcript Text Area */}
                <div className="mb-4">
                  <label
                    htmlFor={`audioTranscript${sectionNumber}`}
                    className="form-label fw-bold"
                  >
                    <i className="bi bi-file-text me-1"></i>
                    Audio Transcript
                  </label>
                  <textarea
                    className="form-control"
                    id={`audioTranscript${sectionNumber}`}
                    rows={8}
                    placeholder={`Enter the transcript for section ${sectionNumber}...`}
                    value={audioTranscripts[index]}
                    onChange={(e) =>
                      handleAudioTranscriptChange(index, e.target.value)
                    }
                  ></textarea>
                  <div className="mt-2 d-flex justify-content-end">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleSaveAudioSection(index)}
                    >
                      <i className="bi bi-save me-1"></i>
                      Save Section
                    </button>
                  </div>
                </div>

                {/* Question Display List */}
                <div className="border-top pt-3">
                  {sectionsQuestions[index].map((q, qIndex) => (
                    <QuestionDisplay
                      question={q}
                      key={q.id}
                      questionNumber={qIndex + 1} 
                      onEdit={handleOpenUpdateModal}
                      onDelete={onDeleteQuestion}
                    />
                  ))}
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
                        htmlFor={`questionType${sectionNumber}`}
                        className="form-label"
                      >
                        Question Type
                      </label>
                      <select
                        className="form-select"
                        id={`questionType${sectionNumber}`}
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

      {/* Modal Manager handles both create and update modals */}
      <ModalManager
        isModalOpen={isModalOpen}
        currentIndex={currentSectionIndex}
        selectedQuestionTypes={selectedQuestionTypes}
        handleCloseModal={handleCloseModal}
        handleModalSubmit={handleModalSubmit}
        otherData={{
          parentId: currentParentId,
          testId: test ? test.id : 0,
          order: currentOrder,
        }}
        isUpdateModalOpen={isUpdateModalOpen}
        currentEditQuestion={currentEditQuestion}
        handleCloseUpdateModal={handleCloseUpdateModal}
        handleUpdateModalSubmit={handleUpdateModalSubmit}
      />
    </div>
  );
}

export default EditListeningTest;

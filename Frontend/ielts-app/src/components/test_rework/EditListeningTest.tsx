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
import { uploadFile } from "../../services/fileUploadService";
import QuestionDisplay from "./question_display/QuestionDisplay";
import ModalManager from "./ModalManager";
import { Editor } from "@tinymce/tinymce-react";

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
    ShortAnswer: "Short Answer",
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

    // --- COLLAPSE STATE HANDLING ---
  const [collapsedSections, setCollapsedSections] = useState<boolean[]>([false, false, false, false]);

  const toggleCollapse = (index: number) => {
    setCollapsedSections((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };
  
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
  // Handling state for section content, explanations and question types
  const [audioTranscripts, setAudioTranscripts] = useState<string[]>(["", "", "", ""]);
  const [audioExplanations, setAudioExplanations] = useState<string[]>(["", "", "", ""]);
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>(["MultipleChoice", "MultipleChoice", "MultipleChoice", "MultipleChoice"]);
  const [audioTranscriptChange, setAudioTranscriptChange] = useState<boolean[]>([false, false, false, false]);
  const [audioExplanationChange, setAudioExplanationChange] = useState<boolean[]>([false, false, false, false]);
  const [audioFiles, setAudioFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [pendingAudioUploads, setPendingAudioUploads] = useState<boolean[]>([false, false, false, false]);
  const [audioLinks, setAudioLinks] = useState<string[]>(["", "", "", ""]);
  const [audioLinkChanges, setAudioLinkChanges] = useState<boolean[]>([false, false, false, false]);

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

  const handleAudioExplanationChange = (sectionIndex: number, value: string) => {
    const newAudioExplanations = [...audioExplanations];
    newAudioExplanations[sectionIndex] = value;
    setAudioExplanationChange((prev) => {
      const newChange = [...prev];
      newChange[sectionIndex] = true;
      return newChange;
    });
    setAudioExplanations(newAudioExplanations);
  };

  const handleAudioLinkChange = (sectionIndex: number, value: string) => {
    const newAudioLinks = [...audioLinks];
    newAudioLinks[sectionIndex] = value;
    setAudioLinkChanges((prev) => {
      const newChange = [...prev];
      newChange[sectionIndex] = true;
      return newChange;
    });
    setAudioLinks(newAudioLinks);
  };

  // Function to upload audio file using file upload service
  const uploadAudioFile = async (file: File): Promise<string> => {
    // Use the generic upload function (includes Catbox 200MB limit validation)
    return await uploadFile(file);
  };

  const handleSaveAudioSection = async (sectionIndex: number) => {
    const hasTranscriptChanges = audioTranscriptChange[sectionIndex];
    const hasExplanationChanges = audioExplanationChange[sectionIndex];
    const hasPendingAudioUpload = audioFiles[sectionIndex] !== null && pendingAudioUploads[sectionIndex];
    const hasLinkChanges = audioLinkChanges[sectionIndex];

    if (!hasTranscriptChanges && !hasExplanationChanges && !hasPendingAudioUpload && !hasLinkChanges) {
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

    // Prepare the updated section object
    let updatedAudioSection: QuestionToUpdate = {
      ...rest,
      content: audioTranscripts[sectionIndex],
      explanation: audioExplanations[sectionIndex],
    };

    try {
      // Handle audio upload if there's a pending file
      if (hasPendingAudioUpload && audioFiles[sectionIndex]) {
        const file = audioFiles[sectionIndex]!;

        // Upload using file upload service (includes validation)
        const uploadPromise = uploadAudioFile(file);
        const audioUrl = await toast.promise(uploadPromise, {
          pending: `Uploading audio file "${file.name}"...`,
          success: "Audio uploaded successfully!",
          error: "Failed to upload audio file.",
        });

        // Add the audio URL to the update object
        updatedAudioSection.link = audioUrl;
      } else if (hasLinkChanges) {
        // Handle audio link change (direct URL input)
        updatedAudioSection.link = audioLinks[sectionIndex];
      }

      // Update the question with new content and/or audio link
      const updatePromise = updateQuestion(id, updatedAudioSection).then((data) => {
        // Reset change flags
        setAudioTranscriptChange((prev) => {
          const newChange = [...prev];
          newChange[sectionIndex] = false;
          return newChange;
        });

        setAudioExplanationChange((prev) => {
          const newChange = [...prev];
          newChange[sectionIndex] = false;
          return newChange;
        });

        setPendingAudioUploads((prev) => {
          const newPending = [...prev];
          newPending[sectionIndex] = false;
          return newPending;
        });

        setAudioLinkChanges((prev) => {
          const newChange = [...prev];
          newChange[sectionIndex] = false;
          return newChange;
        });

        // Update the questions state to reflect the new content, explanation and link
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.id === id ? {
              ...q,
              content: updatedAudioSection.content,
              explanation: updatedAudioSection.explanation,
              link: updatedAudioSection.link
            } : q
          )
        );

        return data;
      });

      await toast.promise(updatePromise, {
        pending: "Saving audio section...",
        success: "Audio section saved successfully.",
        error: "Failed to save audio section.",
      });

    } catch (error) {
      console.error("Error saving audio section:", error);
      toast.error("Failed to save audio section.");
    }
  };

  // Audio file selection handler
  const handleAudioUpload = (sectionIndex: number, file: File | null) => {
    if (!file) {
      // Clear the file if null is passed
      setAudioFiles((prev) => {
        const newFiles = [...prev];
        newFiles[sectionIndex] = null;
        return newFiles;
      });
      setPendingAudioUploads((prev) => {
        const newPending = [...prev];
        newPending[sectionIndex] = false;
        return newPending;
      });
      return;
    }

    console.log(`Audio file selected for section ${sectionIndex + 1}:`, file.name);

    // Basic file type validation for audio
    if (!file.type.startsWith('audio/')) {
      toast.error("Please select a valid audio file.");
      return;
    }

    // Store the file reference and mark as pending upload
    setAudioFiles((prev) => {
      const newFiles = [...prev];
      newFiles[sectionIndex] = file;
      return newFiles;
    });

    setPendingAudioUploads((prev) => {
      const newPending = [...prev];
      newPending[sectionIndex] = true;
      return newPending;
    });

    toast.info(`Audio file "${file.name}" selected for Section ${sectionIndex + 1}. Click "Save Section" to upload.`);
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
  // --- HELPER FUNCTIONS ---

  function mapAudioSections(questionsData: QuestionFullDetail[] = questions) {
    let audioSections = questionsData.filter(
      (q) => q.questionType === "Audio" && q.parentId === 0
    );
    console.log("Mapping audio sections:", audioSections);
    // update the audio sections into audioTranscripts, audioExplanations, and audioLinks states
    let newAudioTranscripts = [...audioTranscripts];
    let newAudioExplanations = [...audioExplanations];
    let newAudioLinks = [...audioLinks];

    audioSections.forEach((section) => {
      let index = section.order - 1;
      if (index >= 0 && index < newAudioTranscripts.length) {
        newAudioTranscripts[index] = section.content || "Not found";
        newAudioExplanations[index] = section.explanation || "Not found";
        newAudioLinks[index] = section.link || "";
      }
    });

    setAudioTranscripts(newAudioTranscripts);
    setAudioExplanations(newAudioExplanations);
    setAudioLinks(newAudioLinks);

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
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="resource" className="form-label fw-bold">
                      <i className="bi bi-link me-1"></i>
                      Resource
                    </label>
                    {/* <input
                      type="text"
                      className="form-control"
                      style={{ minHeight: "80px" }}
                      id="resource"
                      placeholder="Enter resource reference..."
                      value={test ? test.resource : ""}
                      onChange={(e) => {
                        if (test) {
                          setTest({ ...test, resource: e.target.value });
                          setChanged(true);
                        }
                      }}
                    /> */}
                    <textarea
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
                <div className="col-md-12 d-flex justify-content-center">
                  <button
                    className="btn btn-outline-primary w-50"
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
              <div 
                className="card-header bg-light d-flex justify-content-between align-items-center" 
                style={{ cursor: 'pointer' }}
                onClick={() => toggleCollapse(index)}
              >
                <h5 className="mb-0">
                  <i className="bi bi-volume-up me-2"></i>
                  Section {sectionNumber}
                </h5>
                <i className={`bi bi-chevron-${collapsedSections[index] ? 'down' : 'up'}`}></i>
              </div>
              <div className={`collapse ${!collapsedSections[index] ? 'show' : ''}`} id={`section${sectionNumber}Collapse`}>
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
                      <div className="d-flex align-items-center justify-content-between">
                        <small className="text-muted">
                          <i className={`bi ${pendingAudioUploads[index] ? 'bi-clock text-warning' : 'bi-check-circle text-success'} me-1`}></i>
                          Selected: {audioFiles[index]!.name}
                        </small>
                        <small className="text-muted">
                          Size: {(audioFiles[index]!.size / 1024 / 1024).toFixed(2)} MB
                        </small>
                      </div>
                      {pendingAudioUploads[index] && (
                        <small className="text-warning d-block mt-1">
                          <i className="bi bi-exclamation-triangle me-1"></i>
                          Ready to upload - Click "Save Section" to upload
                        </small>
                      )}
                    </div>
                  )}
                </div>

                {/* Audio Link Input */}
                <div className="mb-4">
                  <label
                    htmlFor={`audioLink${sectionNumber}`}
                    className="form-label fw-bold"
                  >
                    <i className="bi bi-link-45deg me-1"></i>
                    Audio Link (Alternative to file upload)
                  </label>
                  <input
                    className="form-control"
                    type="url"
                    id={`audioLink${sectionNumber}`}
                    placeholder="Enter direct audio URL (e.g., https://example.com/audio.mp3)"
                    value={audioLinks[index]}
                    onChange={(e) => handleAudioLinkChange(index, e.target.value)}
                  />
                  {audioLinkChanges[index] && (
                    <div className="mt-2">
                      <small className="text-warning d-block">
                        <i className="bi bi-exclamation-triangle me-1"></i>
                        Audio link changed - Click "Save Section" to save the new link
                      </small>
                    </div>
                  )}
                  <small className="form-text text-muted">
                    You can provide a direct URL to an audio file instead of uploading. This will be used for the audio player.
                  </small>
                </div>

                {/* Audio Player Section */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    <i className="bi bi-play-circle me-1"></i>
                    Audio Player
                  </label>
                  {(() => {
                    // Get the current audio URL from state (includes unsaved changes)
                    const currentAudioLink = audioLinks[index];
                    
                    // If no current link, fall back to saved data
                    const audioSection = questions.find(
                      (q) => q.questionType === "Audio" && q.parentId === 0 && q.order - 1 === index
                    );
                    const audioSrc = currentAudioLink || audioSection?.link;

                    return audioSrc ? (
                      <div className="border rounded p-3 bg-light">
                        <audio
                          controls
                          className="w-100"
                          preload="metadata"
                        >
                          <source src={audioSrc} type="audio/mpeg" />
                          <source src={audioSrc} type="audio/wav" />
                          <source src={audioSrc} type="audio/ogg" />
                          Your browser does not support the audio element.
                        </audio>
                        <div className="mt-2">
                          <small className="text-muted">
                            <i className="bi bi-link me-1"></i>
                            <a href={audioSrc} target="_blank" rel="noopener noreferrer">
                              {audioSrc}
                            </a>
                          </small>
                        </div>
                      </div>
                    ) : (
                      <div className="border rounded p-3 bg-light text-center text-muted">
                        <i className="bi bi-volume-mute fs-1 d-block mb-2"></i>
                        <p className="mb-0">No audio added yet</p>
                        <small>Upload an audio file or add a link to display the player</small>
                      </div>
                    );
                  })()}
                </div>

                {/* Section Content Text Area */}
                <div className="mb-4">
                  <label
                    htmlFor={`sectionContent${sectionNumber}`}
                    className="form-label fw-bold"
                  >
                    <i className="bi bi-file-text me-1"></i>
                    Section Content
                  </label>
                  {/* <textarea
                    className="form-control"
                    id={`sectionContent${sectionNumber}`}
                    rows={6}
                    placeholder={`Enter the content/requirements for section ${sectionNumber}...`}
                    value={audioTranscripts[index]}
                    onChange={(e) =>
                      handleAudioTranscriptChange(index, e.target.value)
                    }
                  ></textarea> */}
                  <Editor
                    tinymceScriptSrc="/tinymce/tinymce.min.js"
                    licenseKey='gpl'
                    value={audioTranscripts[index]}
                    onEditorChange={(content: string) => handleAudioTranscriptChange(index, content)}
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'help', 'wordcount', 'hr'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                        'bold italic underline strikethrough | forecolor backcolor | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist outdent indent | ' +
                        'hr | removeformat | table | link image | help',
                      placeholder: `Enter the content for section ${sectionNumber}...`,
                      content_style: 'body { font-family: Arial, sans-serif; font-size: 14px; }',
                    }}
                  />
                </div>

                {/* Explanation/Audio Transcript Text Area */}
                <div className="mb-4">
                  <label
                    htmlFor={`audioExplanation${sectionNumber}`}
                    className="form-label fw-bold"
                  >
                    <i className="bi bi-chat-left-text me-1"></i>
                    Explanation/Audio Transcript
                  </label>
                  {/* <textarea
                    className="form-control"
                    id={`audioExplanation${sectionNumber}`}
                    rows={6}
                    placeholder={`Enter the audio transcript or explanation for section ${sectionNumber}...`}
                    value={audioExplanations[index]}
                    onChange={(e) =>
                      handleAudioExplanationChange(index, e.target.value)
                    }
                  ></textarea> */}
                  <Editor
                    tinymceScriptSrc="/tinymce/tinymce.min.js"
                    licenseKey='gpl'
                    value={audioExplanations[index]}
                    onEditorChange={(content: string) => handleAudioExplanationChange(index, content)}
                    init={{
                      height: 300,
                      menubar: false,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'help', 'wordcount'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                        'bold italic underline strikethrough | forecolor backcolor | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'bullist numlist outdent indent | ' +
                        'removeformat | table | link image | help',
                      placeholder: `Enter the content for section ${sectionNumber}...`,
                      content_style: 'body { font-family: Arial, sans-serif; font-size: 14px; }',
                    }}
                  />
                  <div className="mt-2 d-flex justify-content-end">
                    <button
                      className={`btn ${audioTranscriptChange[index] || audioExplanationChange[index] || pendingAudioUploads[index] || audioLinkChanges[index]
                        ? 'btn-primary'
                        : 'btn-outline-primary'
                        }`}
                      onClick={() => handleSaveAudioSection(index)}
                    >
                      <i className={`bi ${pendingAudioUploads[index]
                        ? 'bi-cloud-upload'
                        : 'bi-save'
                        } me-1`}></i>
                      {pendingAudioUploads[index]
                        ? 'Upload & Save Section'
                        : 'Save Section'
                      }
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
            </div>
          ))}

          {/* Action Buttons */}
          {/* <div className="row mt-4">
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
          </div> */}
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

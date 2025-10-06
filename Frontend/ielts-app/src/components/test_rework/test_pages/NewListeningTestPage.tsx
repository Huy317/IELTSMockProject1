import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Question } from "../../../types/Question";
import { getTestById } from "../../../services/testService";
import { getAllQuestionsAndParagraphsWithTestId } from "../../../services/questionService";

interface ListeningSection {
  id: number;
  title: string;
  audioUrl: string;
  questions: Question[];
  sectionContent?: string;
}

function NewListeningTestPage() {
  const { id: testId } = useParams<{ id: string }>();

  // State management for data fetching
  const [sections, setSections] = useState<ListeningSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Test configuration - will be updated based on fetched data
  const [testConfig, setTestConfig] = useState({
    title: "IELTS Listening Test",
    duration: 30 * 60, // 30 minutes in seconds
    totalQuestions: 0
  });

  // Data fetching effect
  useEffect(() => {
    const fetchTestData = async () => {
      if (!testId) {
        setError("No test ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch test info and questions
        const [testData, allQuestionsData] = await Promise.all([
          getTestById(testId),
          getAllQuestionsAndParagraphsWithTestId(parseInt(testId)),
        ]);

        // Update test config with fetched data
        setTestConfig({
          title: testData.testName,
          duration: 30 * 60, // Default 30 minutes for listening
          totalQuestions: allQuestionsData.filter(q => q.parentId !== 0).length
        });

        // Process data into listening sections
        const processedSections = processDataIntoSections(allQuestionsData);
        setSections(processedSections);

      } catch (err) {
        console.error('Error fetching test data:', err);
        setError('Failed to load test data');
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, [testId]);

  // Helper function to process fetched data into ListeningSection format
  const processDataIntoSections = (questionsData: any[]): ListeningSection[] => {
    // Separate Audio sections and questions
    const audioSections = questionsData
      .filter(q => q.questionType === "Audio" && q.parentId === 0)
      .sort((a, b) => a.order - b.order);
    
    const questions = questionsData
      .filter(q => q.parentId !== 0)
      .sort((a, b) => a.order - b.order);

    // Group questions by their parent ID
    const questionsByParent = questions.reduce((acc, question) => {
      if (!acc[question.parentId]) {
        acc[question.parentId] = [];
      }
      acc[question.parentId].push({
        id: question.id,
        questionType: question.questionType,
        content: question.content,
        correctAnswer: question.correctAnswer,
        choices: question.choices || "",
        explanation: question.explanation || "",
        parentId: question.parentId,
        testId: question.testId,
        order: question.order,
        link: question.link || ""
      });
      return acc;
    }, {} as { [key: number]: Question[] });

    // Create sections from audio sections (which contain the form content)
    return audioSections.map((audioSection, index) => {
      // Get questions that belong to this audio section by parentId
      const sectionQuestions = questionsByParent[audioSection.id] || [];

      return {
        id: audioSection.id,
        title: `Recording ${index + 1}`,
        audioUrl: audioSection.link,
        // || "/audio/example.mp3", // Use link field for audio URL
        sectionContent: audioSection.content, // Use Audio section content as form content
        questions: sectionQuestions
      };
    });
  };

  // State management
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60);
  const [answers, setAnswers] = useState<{ [key: number]: string | string[] }>({});
  const [isMuted, setIsMuted] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [highlightedQuestion, setHighlightedQuestion] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const lastTimeUpdateRef = useRef(0);

  // Reset currentSection when sections change and update timer when config changes
  useEffect(() => {
    if (sections.length > 0 && currentSection >= sections.length) {
      setCurrentSection(0);
    }
    if (!loading && testConfig.duration > 0) {
      setTimeRemaining(testConfig.duration);
    }
  }, [sections, currentSection, loading, testConfig.duration]);

  // Event handlers
  const handleAnswerChange = (questionId: number, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => prev > 0 ? prev - 1 : prev);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close speed menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSpeedMenu && !(event.target as Element).closest('.position-relative')) {
        setShowSpeedMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSpeedMenu]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const now = Date.now();
      if (now - lastTimeUpdateRef.current > 100) {
        setCurrentTime(audioRef.current.currentTime);
        lastTimeUpdateRef.current = now;
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      setShowSpeedMenu(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container-fluid py-4 px-3 px-lg-4">
      {/* Loading State */}
      {loading && (
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 mb-0">Loading test data...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Error!</h4>
              <p>{error}</p>
              <hr />
              <p className="mb-0">Please try refreshing the page or contact support if the problem persists.</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Only show when not loading and no error */}
      {!loading && !error && sections.length > 0 && (
        <>
          {/* Header */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0">{testConfig.title}</h4>
                </div>
                <div>
                  <button className="btn btn-outline-secondary">Leave</button>
                </div>
              </div>
            </div>
          </div>

      {/* Audio Player Bar - Top */}
      <div className="row mb-4">
        <div className="col-12">
          {/* Simple Audio Player */}
          <div className="border rounded-3 shadow-sm p-3 bg-light">
            {/* Recording tabs row */}
            <div className="row mb-3">
              <div className="col-12">
                <div className="d-flex">
                  {sections && sections.length > 0 && sections.map((section, index) => (
                    <button
                      key={section.id}
                      className={`btn btn-sm me-2 ${
                        currentSection === index 
                          ? 'btn-primary' 
                          : 'btn-outline-secondary'
                      }`}
                      onClick={() => setCurrentSection(index)}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Audio Controls row */}
            <div className="row align-items-center">
              <div className="col-12">
                <audio
                  ref={audioRef}
                  src={sections && sections[currentSection] ? sections[currentSection].audioUrl : ""}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  onError={(e) => console.error('Audio error:', e)}
                  className="d-none"
                />

                <div className="d-flex align-items-center">
                  {/* Play/Pause Button */}
                  <button className="btn btn-outline-secondary me-3" onClick={handlePlayPause}>
                    <i className={`isax ${isPlaying ? 'isax-pause' : 'isax-play'}`}></i>
                  </button>
                  
                  {/* Progress Bar */}
                  <div className="flex-grow-1 me-3 position-relative">
                    <div className="progress mb-1" style={{ height: '8px', cursor: 'pointer', backgroundColor: '#e9ecef' }}>
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                          backgroundColor: '#342777'
                        }}
                      ></div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="small text-muted">{formatTime(currentTime)}</span>
                      <span className="small text-muted">{formatTime(duration)}</span>
                    </div>
                    {/* Invisible range input for seeking functionality */}
                    <input
                      type="range"
                      className="form-range position-absolute opacity-0"
                      style={{ 
                        height: '8px', 
                        top: '0', 
                        left: '0', 
                        width: '100%',
                        cursor: 'pointer',
                        margin: '0'
                      }}
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                    />
                  </div>
                  
                  {/* Control Icons */}
                  <div className="d-flex align-items-center">
                    <button 
                      className="btn btn-outline-secondary btn-sm me-2"
                      onClick={handleMuteToggle}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      <i className={`isax ${isMuted ? 'isax-volume-slash' : 'isax-volume-high'}`}></i>
                    </button>
                    
                    {/* Settings Dropdown */}
                    <div className="position-relative">
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                        title="Playback Speed"
                      >
                        <i className="isax isax-setting"></i>
                        <span className="ms-1 small">{playbackSpeed}x</span>
                      </button>
                      
                      {showSpeedMenu && (
                        <div 
                          className="position-absolute bg-white border rounded shadow-sm py-1"
                          style={{ 
                            top: '100%', 
                            right: '0', 
                            minWidth: '120px', 
                            zIndex: 1000,
                            marginTop: '4px'
                          }}
                        >
                          <div className="px-2 py-1 text-muted small border-bottom">Playback Speed</div>
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                            <button
                              key={speed}
                              className={`btn btn-sm w-100 text-start border-0 ${
                                playbackSpeed === speed ? 'bg-primary text-white' : 'btn-light'
                              }`}
                              onClick={() => handleSpeedChange(speed)}
                              style={{ borderRadius: '0' }}
                            >
                              {speed}x {speed === 1 ? '(Normal)' : ''}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
      <div className="row">
        {/* Questions Column - Now takes more space */}
        <div className="col-lg-9">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              {/* Questions Content - Unified Rendering */}
              {(() => {
                if (!sections?.length || currentSection >= sections.length) {
                  return <div className="text-center py-4"><p className="text-muted">No content available.</p></div>;
                }

                const currentSectionData = sections[currentSection];
                if (!currentSectionData) {
                  return <div className="text-center py-4"><p className="text-muted">Section data not found.</p></div>;
                }

                // Sort questions by their order to maintain proper sequence
                const sortedQuestions = [...currentSectionData.questions].sort((a, b) => a.order - b.order);
                
                // Group consecutive FormCompletion questions together
                const questionGroups: any[] = [];
                let currentGroup: any = null;
                
                sortedQuestions.forEach((question) => {
                  if (question.questionType === 'FormCompletion' || question.questionType === 'fill-in-blank') {
                    if (!currentGroup || currentGroup.type !== 'form') {
                      currentGroup = { type: 'form', questions: [question] };
                      questionGroups.push(currentGroup);
                    } else {
                      currentGroup.questions.push(question);
                    }
                  } else {
                    // All other question types (SingleChoice, MultipleChoice, etc.) are treated as single questions
                    currentGroup = { type: 'single', question: question };
                    questionGroups.push(currentGroup);
                  }
                });
                
                return (
                  <div>
                    {questionGroups.map((group, groupIndex) => {
                      const isLastGroup = groupIndex === questionGroups.length - 1;
                      
                      if (group.type === 'form') {
                        // Render form completion group with shared form content
                        return (
                          <div key={`form-group-${groupIndex}`}>
                            <div className="row mb-4">
                              {/* Form content column */}
                              <div className="col-md-8">
                                <div className="bg-light p-3 h-100" style={{ lineHeight: "2.5" }}>
                                  {currentSectionData.sectionContent ? (
                                    currentSectionData.sectionContent.includes('<') ? (
                                      <div dangerouslySetInnerHTML={{ __html: currentSectionData.sectionContent }} />
                                    ) : (
                                      <div style={{ whiteSpace: 'pre-line' }}>{currentSectionData.sectionContent}</div>
                                    )
                                  ) : (
                                    <div className="text-center py-4">
                                      <p className="text-muted">Form content will appear here</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {/* Input fields column for all questions in this group */}
                              <div className="col-md-4">
                                <div className="pt-3" style={{ lineHeight: '2.5', paddingTop: '120px' }}>
                                  {group.questions.map((question: any) => {
                                    // Calculate sequential question number across all sections
                                    const allQuestions = sections.flatMap(s => s.questions);
                                    const globalQuestionIndex = allQuestions.findIndex(q => q.id === question.id);
                                    const questionNumber = globalQuestionIndex + 1;
                                    
                                    return (
                                      <div 
                                        key={question.id}
                                        className={`mb-5 d-flex align-items-center ${
                                          highlightedQuestion === question.id ? 'border border-warning rounded p-2' : ''
                                        }`} 
                                        style={{ 
                                          height: '2.5rem',
                                          transition: 'all 0.3s ease'
                                        }}
                                      >
                                        <span className="badge bg-primary rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', fontSize: '1rem' }}>
                                          {questionNumber}
                                        </span>
                                        <input
                                          id={`question-${question.id}`}
                                          type="text"
                                          className="form-control form-control-sm"
                                          style={{ width: '200px' }}
                                          value={answers[question.id] as string || ''}
                                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                            {/* Add separator unless it's the last group */}
                            {!isLastGroup && <hr className="my-4" />}
                          </div>
                        );
                      } else {
                        // Render single choice or other question types
                        const question = group.question;
                        const allQuestions = sections.flatMap(s => s.questions);
                        const globalQuestionIndex = allQuestions.findIndex(q => q.id === question.id);
                        const questionNumber = globalQuestionIndex + 1;
                        
                        if (question.questionType === 'SingleChoice' || question.questionType === 'MultipleChoice') {
                          const choices = question.choices.split(/[,|]/).map((c: string) => c.trim()).filter((c: string) => c);
                          const isMultipleChoice = question.questionType === 'MultipleChoice';
                          
                          return (
                            <div key={question.id}>
                              <div 
                                id={`question-${question.id}`}
                                className={`question-item mb-4 ${
                                  highlightedQuestion === question.id ? 'border border-warning rounded p-3' : ''
                                }`}
                                style={{ transition: 'all 0.3s ease' }}
                              >
                                <div className="d-flex align-items-start mb-3">
                                  <span className="badge bg-primary rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', fontSize: '1rem' }}>
                                    {questionNumber}
                                  </span>
                                  <div className="flex-grow-1">
                                    <p className="mb-3"><strong>{question.content}</strong></p>
                                    {choices.map((choice: string, index: number) => {
                                      const choiceValue = choice.trim();
                                      const isChecked = isMultipleChoice 
                                        ? Array.isArray(answers[question.id]) && (answers[question.id] as string[]).includes(choiceValue)
                                        : answers[question.id] === choiceValue;
                                      
                                      return (
                                        <div key={index} className="form-check mb-2">
                                          <input
                                            className="form-check-input border-dark"
                                            type={isMultipleChoice ? "checkbox" : "radio"}
                                            name={isMultipleChoice ? undefined : `question-${question.id}`}
                                            id={`q${question.id}-${index}`}
                                            value={choiceValue}
                                            checked={isChecked}
                                            onChange={(e) => {
                                              if (isMultipleChoice) {
                                                const currentAnswers = Array.isArray(answers[question.id]) ? answers[question.id] as string[] : [];
                                                if (e.target.checked) {
                                                  handleAnswerChange(question.id, [...currentAnswers, choiceValue]);
                                                } else {
                                                  handleAnswerChange(question.id, currentAnswers.filter(a => a !== choiceValue));
                                                }
                                              } else {
                                                handleAnswerChange(question.id, e.target.value);
                                              }
                                            }}
                                          />
                                          <label className="form-check-label" htmlFor={`q${question.id}-${index}`}>
                                            {choiceValue}
                                          </label>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                              {/* Add separator unless it's the last group */}
                              {!isLastGroup && <hr className="my-4" />}
                            </div>
                          );
                        }
                        
                        // Handle other question types
                        return (
                          <div key={question.id}>
                            <div 
                              id={`question-${question.id}`}
                              className={`question-item mb-4 ${
                                highlightedQuestion === question.id ? 'border border-warning rounded p-3' : ''
                              }`}
                              style={{ transition: 'all 0.3s ease' }}
                            >
                              <div className="d-flex align-items-start mb-3">
                                <span className="badge bg-primary rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', fontSize: '1rem' }}>
                                  {questionNumber}
                                </span>
                                <div className="flex-grow-1">
                                  <p className="mb-3"><strong>{question.content}</strong></p>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your answer"
                                    value={answers[question.id] as string || ''}
                                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                            {/* Add separator unless it's the last group */}
                            {!isLastGroup && <hr className="my-4" />}
                          </div>
                        );
                      }
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Right Column - Timer and Navigation */}
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body text-center">
              <h6 className="text-muted mb-1">Duration:</h6>
              <h2 className="text-danger mb-3">{formatTime(timeRemaining)}</h2>
              <button className="btn btn-primary w-100 mb-3">SUBMIT</button>
            </div>
          </div>

          {/* Dynamic Recording Navigation */}
          {sections && sections.length > 0 && sections.map((section, sectionIndex) => (
            <div key={section.id} className={`card border-0 shadow-sm ${sectionIndex > 0 ? 'mt-3' : ''}`}>
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <span className="fw-bold">{section.title}</span>
              </div>
              <div className="card-body">
                <div className="row g-2">
                  {section.questions.map((q) => {
                    // Calculate sequential question number across all sections
                    const allQuestions = sections.flatMap(s => s.questions);
                    const globalQuestionIndex = allQuestions.findIndex(question => question.id === q.id);
                    const questionNumber = globalQuestionIndex + 1;
                    
                    return (
                    <div key={q.id} className="col-2">
                      <button 
                        className={`btn btn-sm w-100 ${
                          answers[q.id] ? 'btn-success' : 
                          currentSection === sectionIndex ? 'btn-outline-primary' : 'btn-outline-secondary'
                        }`}
                        onClick={() => {
                          // Switch to the correct section if not already there
                          if (currentSection !== sectionIndex) {
                            setCurrentSection(sectionIndex);
                          }
                          // Scroll to and highlight the specific question
                          setTimeout(() => {
                            const questionElement = document.getElementById(`question-${q.id}`);
                            if (questionElement) {
                              // Scroll to the question
                              questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              // Add highlight effect
                              setHighlightedQuestion(q.id);
                              // Remove highlight after 500ms
                              setTimeout(() => setHighlightedQuestion(null), 500);
                              
                              // Focus based on question type
                              if (q.questionType === 'FormCompletion' || q.questionType === 'fill-in-blank') {
                                // For form completion, focus the input directly
                                const inputElement = questionElement as HTMLInputElement;
                                if (inputElement && inputElement.tagName === 'INPUT') {
                                  inputElement.focus();
                                } else {
                                  // If questionElement is a container, find the input inside
                                  const input = questionElement.querySelector('input[type="text"]') as HTMLInputElement;
                                  if (input) input.focus();
                                }
                              } else if (q.questionType === 'SingleChoice' || q.questionType === 'MultipleChoice') {
                                // For single choice or multiple choice, focus the first input (radio or checkbox)
                                const firstInput = questionElement.querySelector('input[type="radio"], input[type="checkbox"]') as HTMLInputElement;
                                if (firstInput) firstInput.focus();
                              } else {
                                // For other question types, try to focus any input
                                const input = questionElement.querySelector('input') as HTMLInputElement;
                                if (input) input.focus();
                              }
                            }
                          }, 100);
                        }}
                        title={`Go to question ${questionNumber}: ${q.content || 'Question'}`}
                      >
                        {questionNumber}
                      </button>
                    </div>
                  )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
      )}
    </div>
  );
}

export default NewListeningTestPage;

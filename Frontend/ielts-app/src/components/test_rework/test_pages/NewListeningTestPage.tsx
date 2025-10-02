import React, { useState, useRef, useEffect } from 'react';

interface Question {
  id: number;
  questionType: string;
  content: string;
  correctAnswer: string;
  choices: string;
  explanation: string;
  parentId: number;
  testId: number;
  order: number;
  link: string;
}

interface ListeningSection {
  id: number;
  title: string;
  audioUrl: string;
  questions: Question[];
  instructions: string;
  formData?: {
    title: string;
    lines: Array<{
      text: string;
      questionId?: number;
      hasInput: boolean;
      extraText?: string;
    }>;
  };
}

function NewListeningTestPage() {
  // Test configuration
  const [testConfig] = useState({
    title: "IELTS Simulation Listening Test 1",
    duration: 30 * 60, // 30 minutes in seconds
    totalQuestions: 20
  });

  // Mock data for demonstration - updated to match the image
  const [sections] = useState<ListeningSection[]>([
    {
      id: 1,
      title: "Recording 1",
      // Using local audio file from public directory
      audioUrl: "/audio/example.mp3", 
      instructions: "Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
      questions: [
        {
          id: 1,
          questionType: 'fill-in-blank',
          content: "First Name",
          correctAnswer: "",
          choices: "",
          explanation: "",
          parentId: 1,
          testId: 1,
          order: 1,
          link: ""
        },
        {
          id: 2,
          questionType: 'fill-in-blank',
          content: "Country of Origin",
          correctAnswer: "",
          choices: "",
          explanation: "",
          parentId: 1,
          testId: 1,
          order: 2,
          link: ""
        },
        {
          id: 3,
          questionType: 'fill-in-blank',
          content: "Date of Arrival",
          correctAnswer: "",
          choices: "",
          explanation: "",
          parentId: 1,
          testId: 1,
          order: 3,
          link: ""
        },
        {
          id: 4,
          questionType: 'fill-in-blank',
          content: "Number of Tenants",
          correctAnswer: "",
          choices: "",
          explanation: "",
          parentId: 1,
          testId: 1,
          order: 4,
          link: ""
        },
        {
          id: 5,
          questionType: 'fill-in-blank',
          content: "Purpose of Visit",
          correctAnswer: "",
          choices: "",
          explanation: "",
          parentId: 1,
          testId: 1,
          order: 5,
          link: ""
        },
        {
          id: 6,
          questionType: 'fill-in-blank',
          content: "Type of Accommodation",
          correctAnswer: "",
          choices: "",
          explanation: "",
          parentId: 1,
          testId: 1,
          order: 6,
          link: ""
        },
        {
          id: 7,
          questionType: 'fill-in-blank',
          content: "Car Parking",
          correctAnswer: "",
          choices: "",
          explanation: "",
          parentId: 1,
          testId: 1,
          order: 7,
          link: ""
        },
        {
          id: 8,
          questionType: 'fill-in-blank',
          content: "Other Requirements",
          correctAnswer: "",
          choices: "",
          explanation: "",
          parentId: 1,
          testId: 1,
          order: 8,
          link: ""
        }
      ],
      formData: {
        title: "SHORT STAY ACCOMMODATION",
        lines: [
          { text: "Family Name: Mackinlay", hasInput: false },
          { text: "First Name:", hasInput: true, questionId: 1 },
          { text: "Country of Origin:", hasInput: true, questionId: 2 },
          { text: "Date of Arrival:", hasInput: true, questionId: 3 },
          { text: "Number of Tenants:", hasInput: true, questionId: 4 },
          { text: "Length of Stay: 2 weeks", hasInput: false },
          { text: "Purpose of Visit:", hasInput: true, questionId: 5 },
          { text: "Type of Accommodation:", hasInput: true, questionId: 6 },
          { text: "Number of Bedrooms: one or two", hasInput: false },
          { text: "Car Parking: off-street and", hasInput: true, questionId: 7 },
          { text: "General Area: near the beach", hasInput: false },
          { text: "Other Requirements: near", hasInput: true, questionId: 8 },
          { text: "Name of Town:", hasInput: true, questionId: 9 },
          { text: "Client's Email: smac13@hotmail.com", hasInput: false },
          { text: "Price Range: up to $", hasInput: true, questionId: 10, extraText: "a week" }
        ]
      }
    },
    {
      id: 2,
      title: "Recording 2",
      // Using the same local audio file from public directory
      audioUrl: "/audio/example.mp3",
      instructions: "Answer questions 11-20.",
      questions: [
        {
          id: 11,
          questionType: 'multiple-choice',
          content: "The university was founded in:",
          correctAnswer: "1995",
          choices: "1985,1995,2005,2015",
          explanation: "",
          parentId: 2,
          testId: 1,
          order: 11,
          link: ""
        },
        {
          id: 12,
          questionType: 'true-false',
          content: "The library is open 24 hours during exam periods.",
          correctAnswer: "True",
          choices: "True,False,Not Given",
          explanation: "",
          parentId: 2,
          testId: 1,
          order: 12,
          link: ""
        },
        {
          id: 13,
          questionType: 'multiple-choice',
          content: "What is the main focus of the research center?",
          correctAnswer: "Technology",
          choices: "Technology,Medicine,Environment,Education",
          explanation: "",
          parentId: 2,
          testId: 1,
          order: 13,
          link: ""
        },
        {
          id: 14,
          questionType: 'fill-in-blank',
          content: "The new building will have _____ floors.",
          correctAnswer: "5",
          choices: "",
          explanation: "",
          parentId: 2,
          testId: 1,
          order: 14,
          link: ""
        },
        {
          id: 15,
          questionType: 'multiple-choice',
          content: "Students can access the gym:",
          correctAnswer: "24/7",
          choices: "Only on weekdays,24/7,Only during term time,With membership",
          explanation: "",
          parentId: 2,
          testId: 1,
          order: 15,
          link: ""
        }
      ],
      formData: {
        title: "UNIVERSITY INFORMATION",
        lines: [
          { text: "Questions 11-20", hasInput: false },
          { text: "Choose the correct letter, A, B, C or D.", hasInput: false },
          { text: "", hasInput: false },
          { text: "11. The university was founded in:", hasInput: true, questionId: 11 },
          { text: "A) 1985  B) 1995  C) 2005  D) 2015", hasInput: false },
          { text: "", hasInput: false },
          { text: "12. The library is open 24 hours during exam periods.", hasInput: true, questionId: 12 },
          { text: "A) True  B) False  C) Not Given", hasInput: false },
          { text: "", hasInput: false },
          { text: "13. What is the main focus of the research center?", hasInput: true, questionId: 13 },
          { text: "A) Technology  B) Medicine  C) Environment  D) Education", hasInput: false },
          { text: "", hasInput: false },
          { text: "14. The new building will have _____ floors.", hasInput: true, questionId: 14 },
          { text: "", hasInput: false },
          { text: "15. Students can access the gym:", hasInput: true, questionId: 15 },
          { text: "A) Only on weekdays  B) 24/7  C) Only during term time  D) With membership", hasInput: false }
        ]
      }
    }
  ]);

  // State management
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(testConfig.duration);
  const [answers, setAnswers] = useState<{ [key: number]: string | string[] }>({});
  const [isMuted, setIsMuted] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(prev => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Close speed menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSpeedMenu && !(event.target as Element).closest('.position-relative')) {
        setShowSpeedMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSpeedMenu]);

  // Audio event handlers
  const handlePlayPause = () => {
    console.log('Play/Pause clicked, isPlaying:', isPlaying);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        console.log('Audio paused');
      } else {
        audioRef.current.play().then(() => {
          console.log('Audio playing successfully');
        }).catch((error) => {
          console.error('Error playing audio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    } else {
      console.error('Audio ref is null');
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      console.log('Time updated:', audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      console.log('Audio loaded, duration:', audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    console.log('Seeking to:', seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
      console.log('Audio muted:', audioRef.current.muted);
    }
  };

  const handleSpeedChange = (speed: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      setShowSpeedMenu(false);
      console.log('Playback speed changed to:', speed);
    }
  };

  const toggleSpeedMenu = () => {
    setShowSpeedMenu(!showSpeedMenu);
  };

  // Answer handlers
  const handleAnswerChange = (questionId: number, answer: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Utility functions
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container-fluid py-4 px-3 px-lg-4">
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
                  {sections.map((section, index) => (
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
                  src={sections[currentSection]?.audioUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  onError={(e) => console.error('Audio error:', e)}
                  onLoadStart={() => console.log('Audio loading started')}
                  onCanPlay={() => console.log('Audio can play')}
                  className="d-none"
                />

                <div className="d-flex align-items-center">
                  {/* Play/Pause Button */}
                  <button 
                    className="btn btn-outline-secondary me-3"
                    onClick={handlePlayPause}
                    onMouseLeave={(e) => e.currentTarget.blur()}
                    style={{
                      transition: 'all 0.2s ease',
                    }}
                  >
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
                      onMouseLeave={(e) => e.currentTarget.blur()}
                      style={{ transition: 'all 0.2s ease' }}
                    >
                      <i className={`isax ${isMuted ? 'isax-volume-slash' : 'isax-volume-high'}`}></i>
                    </button>
                    
                    {/* Settings Dropdown */}
                    <div className="position-relative">
                      <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={toggleSpeedMenu}
                        onMouseLeave={(e) => e.currentTarget.blur()}
                        style={{ transition: 'all 0.2s ease' }}
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
      </div>      <div className="row">
        {/* Questions Column - Now takes more space */}
        <div className="col-lg-9">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              {/* Form Content - Rendered dynamically based on current section data */}
              {(() => {
                const currentSectionData = sections[currentSection];
                if (!currentSectionData.formData) return null;

                const formData = currentSectionData.formData;

                return (
                  <div className="accommodation-form">
                    <div className="row">
                      {/* Left Column - Instructions, Title and Form Text */}
                      <div className="col-md-8">
                        <div className="bg-light p-3" style={{ lineHeight: '2.5' }}>
                          <div className="mb-4">
                            <p className="mb-0 fst-italic">{currentSectionData.instructions}</p>
                          </div>
                          
                          <h5 className="mb-4">{formData.title}</h5>
                          
                          {formData.lines.map((line: any, index: number) => (
                            <div className="mb-2" key={index}>
                              <span>
                                {line.hasInput 
                                  ? `${line.text} ____${line.questionId}____${line.extraText ? ` ${line.extraText}` : ''}`
                                  : line.text
                                }
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Column - Input Fields */}
                      <div className="col-md-4">
                        <div className="pt-3" style={{ lineHeight: '2.5' }}>
                          {formData.lines
                            .filter((line: any) => line.hasInput && line.questionId)
                            .map((line: any) => (
                              <div className="mb-5 d-flex align-items-center" style={{ height: '2.5rem' }} key={line.questionId}>
                                <span className="badge bg-primary rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px', fontSize: '1rem' }}>
                                  {line.questionId}
                                </span>
                                <input
                                  id={`question-${line.questionId}`}
                                  type="text"
                                  className="form-control form-control-sm"
                                  style={{ width: '200px' }}
                                  value={answers[line.questionId] as string || ''}
                                  onChange={(e) => handleAnswerChange(line.questionId!, e.target.value)}
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
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

          {/* Question Navigation */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <span className="fw-bold">{sections[0]?.title}</span>
            </div>
            <div className="card-body">
              <div className="row g-2">
                {sections[0]?.formData?.lines
                  .filter((line: any) => line.hasInput && line.questionId)
                  .map((line: any) => (
                  <div key={line.questionId} className="col-2">
                    <button 
                      className={`btn btn-sm w-100 ${
                        answers[line.questionId] ? 'btn-success' : 
                        currentSection === 0 ? 'btn-outline-primary' : 'btn-outline-secondary'
                      }`}
                      onClick={() => {
                        // Switch to Recording 1 if not already there
                        if (currentSection !== 0) {
                          setCurrentSection(0);
                        }
                        // Scroll to and focus the specific question input
                        setTimeout(() => {
                          const inputElement = document.getElementById(`question-${line.questionId}`) as HTMLInputElement;
                          if (inputElement) {
                            inputElement.focus();
                            inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }, 100);
                      }}
                    >
                      {line.questionId}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recording 2 Navigation */}
          <div className="card border-0 shadow-sm mt-3">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <span className="fw-bold">{sections[1]?.title}</span>
            </div>
            <div className="card-body">
              <div className="row g-2">
                {sections[1]?.formData?.lines
                  .filter((line: any) => line.hasInput && line.questionId)
                  .map((line: any) => (
                  <div key={line.questionId} className="col-2">
                    <button 
                      className={`btn btn-sm w-100 ${
                        answers[line.questionId] ? 'btn-success' : 
                        currentSection === 1 ? 'btn-outline-primary' : 'btn-outline-secondary'
                      }`}
                      onClick={() => {
                        // Switch to Recording 2 if not already there
                        if (currentSection !== 1) {
                          setCurrentSection(1);
                        }
                        // Scroll to and focus the specific question input
                        setTimeout(() => {
                          const inputElement = document.getElementById(`question-${line.questionId}`) as HTMLInputElement;
                          if (inputElement) {
                            inputElement.focus();
                            inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }, 100);
                      }}
                    >
                      {line.questionId}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewListeningTestPage;

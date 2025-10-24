import { useState, useEffect } from "react";
import type { QuestionWithUserChoice } from "../../types/Question";

interface SubmissionParentDisplayProps {
    question: QuestionWithUserChoice;
}

function SubmissionParentDisplay({ question }: SubmissionParentDisplayProps) {
    const [imageError, setImageError] = useState(false);

    // Reset image error when question link changes
    useEffect(() => {
        setImageError(false);
    }, [question.link]);

    // Question types mapping
    const questionTypeLabels: Record<string, string> = {
        Paragraph: "Reading Passage",
        Audio: "Listening Audio",
    };

    // Get question type display label
    const getQuestionTypeLabel = (type: string): string => {
        return questionTypeLabels[type] || type;
    };

    // Get question type badge color
    const getQuestionTypeBadgeClass = (type: string): string => {
        const badgeClasses: Record<string, string> = {
            Paragraph: "bg-primary",
            Audio: "bg-info",
        };
        return badgeClasses[type] || "bg-secondary";
    };

    // Check if a URL is an image
    const isImageUrl = (url: string): boolean => {
        if (!url) return false;
        
        // Check for common image extensions
        const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?.*)?$/i;
        if (imageExtensions.test(url)) return true;
        
        // Check for Discord CDN URLs
        if (url.includes('cdn.discordapp.com') && url.includes('attachments')) return true;
        
        return false;
    };

    // Check if a URL is an audio file
    const isAudioUrl = (url: string): boolean => {
        if (!url) return false;
        const audioExtensions = /\.(mp3|wav|ogg|m4a|aac)(\?.*)?$/i;
        return audioExtensions.test(url);
    };

    return (
        <div className="card mb-4 border-primary">
            <div className="card-header bg-primary bg-opacity-10">
                <h5 className="mb-0">
                    <span className={`badge ${getQuestionTypeBadgeClass(question.questionType)} me-2`}>
                        {getQuestionTypeLabel(question.questionType)}
                    </span>
                </h5>
            </div>
            <div className="card-body">
                {/* Content */}
                {question.content && (
                    <div className="mb-3">
                        <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                            {/* {question.content} */}
                            {question.content.includes('<') ? (
                                <div dangerouslySetInnerHTML={{ __html: question.content }} />
                                ) : (
                                question.content
                                .split("\n")
                                .map((line, lineIndex) => (
                                    <p key={lineIndex} className="mb-2">
                                    {line}
                                    </p>
                                ))
                            )}
                        </p>
                    </div>
                )}

                {/* Image Preview (if link is an image) */}
                {question.link && isImageUrl(question.link) && (
                    <div className="mb-3">
                        <small className="text-muted fw-semibold d-block mb-2">
                            <i className="bi bi-image me-1"></i>
                            Image:
                        </small>
                        <div className="border rounded p-2 bg-light">
                            {!imageError ? (
                                <img
                                    src={`${question.link}?v=${Date.now()}`}
                                    alt="Content image"
                                    className="img-fluid rounded"
                                    style={{ 
                                        maxHeight: "400px", 
                                        maxWidth: "100%",
                                        objectFit: "contain"
                                    }}
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="text-center text-muted p-3">
                                    <i className="bi bi-image-fill fs-1"></i>
                                    <p className="mb-0 mt-2">Failed to load image</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Audio Player (if link is an audio file) */}
                {question.link && isAudioUrl(question.link) && (
                    <div className="mb-3">
                        <small className="text-muted fw-semibold d-block mb-2">
                            <i className="bi bi-volume-up me-1"></i>
                            Audio:
                        </small>
                        <audio controls className="w-100">
                            <source src={question.link} />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )}

                {/* Transcript/Explanation (if available) */}
                {question.explanation && (
                    <div className="mt-3 p-3 bg-info bg-opacity-10 rounded">
                        <small className="text-info fw-semibold d-block mb-2">
                            <i className="bi bi-file-text me-1"></i>
                            {isAudioUrl(question.link) ? 'Transcript:' : 'Additional Information:'}
                        </small>
                        <p className="mb-0 text-dark" style={{ whiteSpace: 'pre-wrap' }}>
                            {question.explanation}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SubmissionParentDisplay;

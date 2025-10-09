import { useState, useEffect } from 'react';
import type { Question, QuestionToUpdate } from '../../../types/Question';
import { toast } from 'react-toastify';
import { updateQuestion } from '../../../services/questionService';
import { uploadFile } from "../../../services/fileUploadService";

interface DiagramEntry {
    id: number;
    label: string;
    correctAnswer: string;
}

interface DiagramLabelingUpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (updatedQuestion: Question) => void;
    question: Question;
}

// DiagramEntryItem component - MUST be defined outside to prevent re-renders and focus loss
interface DiagramEntryItemProps {
    entry: DiagramEntry;
    index: number;
    onLabelChange: (id: number, label: string) => void;
    onAnswerChange: (id: number, answer: string) => void;
    onDelete: (id: number) => void;
    canDelete: boolean;
}

function DiagramEntryItem({entry, index, onLabelChange, onAnswerChange, onDelete, canDelete}: DiagramEntryItemProps) {
    return (
        <div className="border rounded p-3 mb-3 bg-light">
            <div className="row align-items-center">
                <div className="col-10">
                    <div className="row">
                        <div className="col-6">
                            <label className="form-label fw-bold">Entry {index + 1}</label>
                            <input
                                type="text"
                                className="form-control"
                                value={entry.label}
                                onChange={(e) => onLabelChange(entry.id, e.target.value)}
                                placeholder={`Label for entry ${index + 1}`}
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label fw-bold">Correct Answer</label>
                            <input
                                type="text"
                                className="form-control"
                                value={entry.correctAnswer}
                                onChange={(e) => onAnswerChange(entry.id, e.target.value)}
                                placeholder="Enter correct answer"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-2 text-center">
                    <button
                        type="button"
                        className="btn btn-outline-danger btn-md rounded-3"
                        onClick={() => onDelete(entry.id)}
                        disabled={!canDelete}
                        title="Delete entry"
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

function DiagramLabelingUpdateModal({ 
    isOpen, 
    onClose, 
    onSubmit, 
    question 
}: DiagramLabelingUpdateModalProps) {
    const [questionContent, setQuestionContent] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
    const [imageLink, setImageLink] = useState<string>('');
    const [imageMode, setImageMode] = useState<'upload' | 'link'>('upload');
    const [entries, setEntries] = useState<DiagramEntry[]>([]);
    const [explanation, setExplanation] = useState('');
    const [nextEntryId, setNextEntryId] = useState(1);
    const [hasChanges, setHasChanges] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Parse entries from question data
    const parseEntriesFromQuestion = (choicesStr: string, correctAnswersStr: string): DiagramEntry[] => {
        if (!choicesStr) return [
            { id: 1, label: '', correctAnswer: '' }
        ];

        const labels = choicesStr.split('|').filter(Boolean);
        const answers = correctAnswersStr ? correctAnswersStr.split('|').filter(Boolean) : [];
        
        return labels.map((label, index) => ({
            id: index + 1,
            label: label.trim(),
            correctAnswer: answers[index] ? answers[index].trim() : ''
        }));
    };

    // Initialize form with question data when modal opens or question changes
    useEffect(() => {
        if (isOpen && question) {
            setQuestionContent(question.content || '');
            setExplanation(question.explanation || '');
            setCurrentImageUrl(question.link || '');
            setImagePreview(question.link || ''); // Show current image as preview
            setImageLink(''); // Reset image link
            setImageMode('upload'); // Default to upload mode
            
            const parsedEntries = parseEntriesFromQuestion(question.choices, question.correctAnswer);
            setEntries(parsedEntries);
            setNextEntryId(parsedEntries.length + 1);
            setHasChanges(false); // Reset changes when modal opens
            setSelectedImage(null); // Reset selected image
        }
    }, [isOpen, question]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Check file size (25MB limit for Discord)
            if (file.size > 25 * 1024 * 1024) {
                toast.error("File size too large. Please select an image under 25MB.");
                return;
            }
            
            // Check file type
            if (!file.type.startsWith('image/')) {
                toast.error("Please select a valid image file.");
                return;
            }
            
            setSelectedImage(file);
            setImageLink(''); // Clear link when file is selected
            setHasChanges(true);
            
            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setImageLink(url);
        setSelectedImage(null); // Clear file when link is entered
        setHasChanges(true);
        
        // Update preview with the link
        if (url.trim()) {
            setImagePreview(url);
        } else {
            setImagePreview(currentImageUrl); // Revert to current image if link is empty
        }
    };

    const handleModeChange = (mode: 'upload' | 'link') => {
        setImageMode(mode);
        
        // Clear the other mode's data when switching
        if (mode === 'upload') {
            setImageLink('');
            if (!selectedImage) {
                setImagePreview(currentImageUrl); // Show current image if no new file
            }
        } else {
            setSelectedImage(null);
            if (!imageLink) {
                setImagePreview(currentImageUrl); // Show current image if no link
            }
        }
    };

    const handleAddEntry = () => {
        const newEntry: DiagramEntry = {
            id: nextEntryId,
            label: '',
            correctAnswer: '',
        };
        setEntries([...entries, newEntry]);
        setNextEntryId(nextEntryId + 1);
        setHasChanges(true);
    };

    const handleEntryLabelChange = (id: number, label: string) => {
        setEntries(
            entries.map((entry) => (entry.id === id ? { ...entry, label } : entry))
        );
        setHasChanges(true);
    };

    const handleEntryAnswerChange = (id: number, correctAnswer: string) => {
        setEntries(
            entries.map((entry) =>
                entry.id === id ? { ...entry, correctAnswer } : entry
            )
        );
        setHasChanges(true);
    };

    const handleDeleteEntry = (id: number) => {
        // Prevent deleting if only 1 entry remains
        if (entries.length <= 1) return;
        setEntries(entries.filter((entry) => entry.id !== id));
        setHasChanges(true);
    };

    function formatEntriesToChoicesString(entries: DiagramEntry[]): string {
        return entries.map((entry) => entry.label).join('|');
    }

    function formatCorrectAnswersToString(entries: DiagramEntry[]): string {
        return entries.map((entry) => entry.correctAnswer).join('|');
    }

    const validateForm = () => {
        if (!questionContent.trim()) {
            toast.error('Question content is required');
            return false;
        }

        if (!currentImageUrl && !selectedImage && !imageLink.trim()) {
            toast.error('Please provide a diagram image');
            return false;
        }

        if (imageMode === 'link' && imageLink.trim() && !currentImageUrl && !selectedImage) {
            // Validate that the link was actually provided
            if (!imageLink.trim()) {
                toast.error('Please provide an image URL');
                return false;
            }
        }

        if (entries.some((entry) => !entry.label.trim())) {
            toast.error('All entries must have a label');
            return false;
        }

        if (entries.some((entry) => !entry.correctAnswer.trim())) {
            toast.error('All entries must have a correct answer');
            return false;
        }

        return true;
    };

    const uploadImageFile = async (file: File): Promise<string> => {
        // Use the generic upload function (includes Catbox 200MB limit validation)
        return await uploadFile(file);
    };

    const handleSubmit = async () => {
        // Check if there are any changes
        if (!hasChanges) {
            toast.info('No changes to save');
            return;
        }

        if (!validateForm()) {
            return;
        }

        if (isSubmitting) return; // Prevent multiple submissions

        setIsSubmitting(true);

        try {
            // Handle image based on selected mode
            let finalImageLink = currentImageUrl; // Keep existing image by default
            
            if (imageMode === 'upload' && selectedImage) {
                // Upload new image file
                try {
                    toast.info("Uploading new image...");
                    finalImageLink = await uploadImageFile(selectedImage);
                    toast.success("Image uploaded successfully!");
                    
                    // Update the preview to show the uploaded image URL instead of local file
                    setImagePreview(finalImageLink);
                    setCurrentImageUrl(finalImageLink);
                    setSelectedImage(null); // Clear the selected file since it's now uploaded
                } catch (uploadError) {
                    
                    // Ask user if they want to proceed without the new image
                    const proceed = window.confirm(
                        `Failed to upload new image: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}\n\n` +
                        'Would you like to proceed with updating the question while keeping the existing image?\n\n' +
                        'Click "OK" to proceed with existing image, or "Cancel" to try again.'
                    );
                    
                    if (!proceed) {
                        toast.error('Update cancelled. Please try uploading the image again.');
                        return;
                    }
                    
                    // Proceed with existing image
                    finalImageLink = currentImageUrl;
                    toast.warning('Proceeding with existing image due to upload failure.');
                }
            } else if (imageMode === 'link' && imageLink.trim()) {
                // Use the provided image URL directly
                finalImageLink = imageLink.trim();
            }

            const data: QuestionToUpdate = {
                questionType: 'DiagramLabeling',
                content: questionContent,
                choices: formatEntriesToChoicesString(entries),
                correctAnswer: formatCorrectAnswersToString(entries),
                explanation: explanation,
                parentId: question.parentId,
                order: question.order,
                link: finalImageLink, // Store uploaded URL or provided image URL
            };

            // Call API to update question after Discord upload (if needed) succeeds
            await toast.promise(
                updateQuestion(question.id, data),
                {
                    pending: 'Updating diagram labeling question...',
                    success: 'Diagram labeling question updated successfully!',
                    error: 'Failed to update diagram labeling question'
                }
            ).then((updatedQuestion) => {
                // Ensure the updated question includes the new image link
                const questionWithUpdatedImage = {
                    ...updatedQuestion,
                    link: finalImageLink // Make sure the new image URL is included
                };
                onSubmit(questionWithUpdatedImage);
                onClose();
            });

        } catch (error) {
            toast.error("Failed to update question: " + (error instanceof Error ? error.message : 'Unknown error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Diagram Labeling Question</h5>
                        <button
                            type="button"
                            className="btn-close border-0 rounded-1"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {/* Image Mode Selector */}
                        <div className="mb-3">
                            <label className="form-label fw-bold">Diagram Image</label>
                            <div className="btn-group w-100 mb-3" role="group">
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="imageMode"
                                    id="uploadMode"
                                    checked={imageMode === 'upload'}
                                    onChange={() => handleModeChange('upload')}
                                />
                                <label 
                                    className={`btn ${imageMode === 'upload' ? 'btn-primary' : 'btn-outline-primary'}`} 
                                    htmlFor="uploadMode"
                                >
                                    <i className="bi bi-upload me-2"></i>
                                    Upload Image
                                </label>

                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="imageMode"
                                    id="linkMode"
                                    checked={imageMode === 'link'}
                                    onChange={() => handleModeChange('link')}
                                />
                                <label 
                                    className={`btn ${imageMode === 'link' ? 'btn-primary' : 'btn-outline-primary'}`} 
                                    htmlFor="linkMode"
                                >
                                    <i className="bi bi-link-45deg me-2"></i>
                                    Use Image Link
                                </label>
                            </div>

                            {/* Upload Mode */}
                            {imageMode === 'upload' && (
                                <div>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="diagramImage"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <small className="form-text text-muted">
                                        {selectedImage 
                                            ? 'New image selected for upload.' 
                                            : currentImageUrl 
                                                ? 'Select a new image to replace the current one, or leave as is.'
                                                : 'Select an image file from your computer to upload.'}
                                    </small>
                                </div>
                            )}

                            {/* Link Mode */}
                            {imageMode === 'link' && (
                                <div>
                                    <input
                                        type="url"
                                        className="form-control"
                                        id="diagramImageLink"
                                        placeholder="Enter direct image URL (e.g., https://example.com/diagram.png)"
                                        value={imageLink}
                                        onChange={handleImageLinkChange}
                                    />
                                    <small className="form-text text-muted">
                                        Provide a direct URL to an image hosted online.
                                    </small>
                                </div>
                            )}
                        </div>

                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="mb-3">
                                <label className="form-label fw-bold">
                                    {selectedImage ? 'New Image Preview' : imageLink ? 'Image Preview' : 'Current Image'}
                                </label>
                                <div className="border rounded p-2 bg-light">
                                    <img
                                        src={imagePreview}
                                        alt="Diagram preview"
                                        className="img-fluid border rounded"
                                        style={{ maxHeight: "300px", maxWidth: "100%" }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Question Content */}
                        <div className="mb-3">
                            <label htmlFor="questionContent" className="form-label fw-bold">
                                Question Content
                            </label>
                            <textarea
                                className="form-control"
                                id="questionContent"
                                rows={3}
                                value={questionContent}
                                onChange={(e) => {
                                    setQuestionContent(e.target.value);
                                    setHasChanges(true);
                                }}
                                placeholder="Enter instructions for the diagram labeling task..."
                            ></textarea>
                        </div>

                        {/* Entries Section */}
                        <div className="mb-3">
                            <label className="form-label fw-bold">Diagram Entries</label>
                            <small className="form-text text-muted d-block mb-3">
                                Add labels and their corresponding correct answers for the diagram
                            </small>

                            {/* Render all entries */}
                            {entries.map((entry, index) => (
                                <DiagramEntryItem
                                    key={entry.id}
                                    entry={entry}
                                    index={index}
                                    onLabelChange={handleEntryLabelChange}
                                    onAnswerChange={handleEntryAnswerChange}
                                    onDelete={handleDeleteEntry}
                                    canDelete={entries.length > 1}
                                />
                            ))}

                            {/* Add Entry Button */}
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm rounded-1"
                                onClick={handleAddEntry}
                            >
                                <i className="bi bi-plus me-1"></i>
                                Add Entry
                            </button>
                        </div>

                        {/* Explanation */}
                        <div className="mb-3">
                            <label htmlFor="explanation" className="form-label fw-bold">
                                Explanation (optional)
                            </label>
                            <textarea
                                className="form-control"
                                id="explanation"
                                rows={3}
                                value={explanation}
                                onChange={(e) => {
                                    setExplanation(e.target.value);
                                    setHasChanges(true);
                                }}
                                placeholder="Provide explanations for the correct answers..."
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary me-3 rounded-3"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className={`btn rounded-3 ${hasChanges ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Updating...' : hasChanges ? 'Update Question' : 'No Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiagramLabelingUpdateModal;

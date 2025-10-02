import { useState } from "react";
import type { QuestionToCreate } from "../../../types/Question";
import { toast } from "react-toastify";
// import { createQuestion } from "../../../services/questionService"; // COMMENTED OUT FOR TESTING

let WEBHOOK_URL = "https://discord.com/api/webhooks/1423161768603291810/cfsLFxtoB-NGIF9FbqczJGqn5a09QImeviwtQYchd-BgTCkOmX-FzTBU_RS0ogPYyGIR"

interface DiagramEntry {
    id: number;
    label: string;
    correctAnswer: string;
}

interface OtherData {
    parentId: number;
    testId: number;
    order: number;
}

interface DiagramLabelingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    otherData?: OtherData;
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

function DiagramEntryItem({entry,index,onLabelChange,onAnswerChange,onDelete,canDelete,}: DiagramEntryItemProps) {
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

function DiagramLabelingModal({isOpen,onClose,onSubmit,otherData,}: DiagramLabelingModalProps) {

    const [questionContent, setQuestionContent] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [entries, setEntries] = useState<DiagramEntry[]>([
        { id: 1, label: "", correctAnswer: "" },
        { id: 2, label: "", correctAnswer: "" },
    ]);
    const [explanation, setExplanation] = useState("");
    const [nextEntryId, setNextEntryId] = useState(3);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleImageChange triggered");
        
        const file = event.target.files?.[0];
        if (file) {
            console.log("File selected:", file.name, "Size:", file.size, "Type:", file.type);
            
            // Just set the file without creating preview
            setSelectedImage(file);
            
            // Comment out the FileReader part temporarily
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
            
            console.log("File set successfully, no preview created");
        }
    };

    const handleAddEntry = () => {
        const newEntry: DiagramEntry = {
            id: nextEntryId,
            label: "",
            correctAnswer: "",
        };
        setEntries([...entries, newEntry]);
        setNextEntryId(nextEntryId + 1);
    };

    const handleEntryLabelChange = (id: number, label: string) => {
        setEntries(
            entries.map((entry) => (entry.id === id ? { ...entry, label } : entry))
        );
    };

    const handleEntryAnswerChange = (id: number, correctAnswer: string) => {
        setEntries(
            entries.map((entry) =>
                entry.id === id ? { ...entry, correctAnswer } : entry
            )
        );
    };

    const handleDeleteEntry = (id: number) => {
        // Prevent deleting if only 1 entry remains
        if (entries.length <= 1) return;
        setEntries(entries.filter((entry) => entry.id !== id));
    };

    function formatEntriesToChoicesString(entries: DiagramEntry[]): string {
        return entries.map((entry) => entry.label).join("|");
    }

    function formatCorrectAnswersToString(entries: DiagramEntry[]): string {
        return entries.map((entry) => entry.correctAnswer).join("|");
    }

    const validateForm = () => {
        if (!questionContent.trim()) {
            alert("Question content is required");
            return false;
        }

        if (!selectedImage) {
            alert("Please select a diagram image");
            return false;
        }

        if (entries.some((entry) => !entry.label.trim())) {
            alert("All entries must have a label");
            return false;
        }

        if (entries.some((entry) => !entry.correctAnswer.trim())) {
            alert("All entries must have a correct answer");
            return false;
        }

        return true;
    };

    const uploadImageToDiscord = async (file: File): Promise<string> => {
        console.log("Starting upload to Discord...", file.name, file.size);
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('content', `Diagram image uploaded at ${new Date().toISOString()}`);

        try {
            console.log("Making request to Discord webhook...");
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                body: formData,
            });

            console.log("Discord response status:", response.status);
            
            if (!response.ok) {
                console.error("Discord response not OK:", response.status, response.statusText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Discord response data:", data);
            
            // Extract the CDN URL from the Discord response
            if (data.attachments && data.attachments.length > 0) {
                console.log("CDN URL:", data.attachments[0].url);
                return data.attachments[0].url;
            } else {
                throw new Error('No attachment URL found in Discord response');
            }
        } catch (error) {
            console.error('Error uploading image to Discord:', error);
            throw new Error('Failed to upload image to Discord');
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async () => {
        if (!otherData) return;

        if (!validateForm()) return;

        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            // Upload image to Discord first and get the CDN URL
            let imageLink = "";
            if (selectedImage) {
                toast.info("Uploading image to Discord...");
                imageLink = await uploadImageToDiscord(selectedImage);
                toast.success("Image uploaded successfully!");
            }

            const data: QuestionToCreate = {
                questionType: "DiagramLabeling",
                content: questionContent,
                choices: formatEntriesToChoicesString(entries),
                correctAnswer: formatCorrectAnswersToString(entries),
                explanation: explanation,
                parentId: otherData.parentId,
                testId: otherData.testId,
                order: otherData.order,
                link: imageLink, // Store Discord CDN URL in link field
            };

            console.log("Question data with Discord CDN URL:", data);
            console.log("Discord CDN URL:", imageLink);

            // COMMENTED OUT FOR TESTING - Call API to create question
            // await toast.promise(createQuestion(data), {
            //     pending: "Creating diagram labeling question...",
            //     success: "Diagram labeling question created successfully!",
            //     error: "Failed to create diagram labeling question",
            // }).then((res) => {
            //     onClose();
            //     onSubmit(res);
            // });

            // For testing purposes - just show success and close modal
            toast.success("Image uploaded successfully! Check console for Discord CDN URL.");
            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (error) {
            console.error('Error in handleSubmit:', error);
            toast.error("Failed to create question: " + (error instanceof Error ? error.message : 'Unknown error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="modal show d-block"
            tabIndex={-1}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Diagram Labeling Question</h5>
                        <button
                            type="button"
                            className="btn-close border-0 rounded-1"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {/* Image Upload Section */}
                        <div className="mb-3">
                            <label htmlFor="diagramImage" className="form-label fw-bold">
                                Diagram Image
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="diagramImage"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <div className="mt-3">
                                    <img
                                        src={imagePreview}
                                        alt="Diagram preview"
                                        className="img-fluid border rounded"
                                        style={{ maxHeight: "300px", maxWidth: "100%" }}
                                    />
                                </div>
                            )}
                        </div>

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
                                onChange={(e) => setQuestionContent(e.target.value)}
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
                                onChange={(e) => setExplanation(e.target.value)}
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
                            className="btn btn-primary rounded-3"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create Question"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiagramLabelingModal;

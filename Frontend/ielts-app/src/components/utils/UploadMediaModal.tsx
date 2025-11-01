import { useState } from "react";
import { uploadFile } from "../../services/fileUploadService";
import { toast } from "react-toastify";

interface UploadMediaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUploadSuccess: () => void;
}

function UploadMediaModal({ isOpen, onClose, onUploadSuccess }: UploadMediaModalProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
        }
    };

    const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value);
    };

    const handleUpload = async () => {
        if (!selectedFile || !fileName.trim()) {
            toast.error("Please select a file and provide a name");
            return;
        }

        setIsUploading(true);

        try {
            // Create a new File with the edited name
            const renamedFile = new File([selectedFile], fileName, {
                type: selectedFile.type,
                lastModified: selectedFile.lastModified,
            });

            await toast.promise(
                uploadFile(renamedFile),
                {
                    pending: "Uploading file...",
                    success: "File uploaded successfully!",
                    error: "Failed to upload file"
                }
            );

            // Reset and close
            setSelectedFile(null);
            setFileName("");
            onUploadSuccess();
            onClose();
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleClose = () => {
        if (!isUploading) {
            setSelectedFile(null);
            setFileName("");
            onClose();
        }
    };

    const getFileExtension = (filename: string) => {
        const lastDot = filename.lastIndexOf('.');
        return lastDot !== -1 ? filename.substring(lastDot) : '';
    };

    if (!isOpen) return null;

    return (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Upload Media</h5>
                        <button
                            type="button"
                            className="btn-close border-0 rounded-1"
                            aria-label="Close"
                            onClick={handleClose}
                            disabled={isUploading}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {/* File Input */}
                        <div className="mb-3">
                            <label className="form-label fw-bold">Select File</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={handleFileSelect}
                                disabled={isUploading}
                            />
                            <small className="text-muted">Maximum file size: 200MB</small>
                        </div>

                        {/* File Name Editor */}
                        {selectedFile && (
                            <>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">File Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={fileName}
                                        onChange={handleFileNameChange}
                                        disabled={isUploading}
                                        placeholder="Enter file name"
                                    />
                                    <small className="text-muted">
                                        Extension: {getFileExtension(selectedFile.name)}
                                    </small>
                                </div>

                                {/* File Info */}
                                <div className="mb-3">
                                    <small className="text-muted">
                                        Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </small>
                                </div>

                                {/* Image Preview */}
                                {selectedFile.type.startsWith('image/') && (
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Preview</label>
                                        <div className="border rounded p-2 text-center bg-light">
                                            <img
                                                src={URL.createObjectURL(selectedFile)}
                                                alt="Preview"
                                                style={{ maxWidth: '100%', maxHeight: '200px' }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary me-3 rounded-3"
                            onClick={handleClose}
                            disabled={isUploading}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary rounded-3"
                            onClick={handleUpload}
                            style={!selectedFile ? { backgroundColor: "#808080 ", borderColor: "#808080"} : {}}
                            disabled={!selectedFile || isUploading || !fileName.trim()}
                        >
                            {isUploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadMediaModal;

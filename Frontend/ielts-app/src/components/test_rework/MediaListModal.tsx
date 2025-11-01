import MediaList from "../admin/MediaList";

interface MediaListModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectMedia?: (mediaUrl: string) => void;
}

function MediaListModal({ isOpen, onClose, onSelectMedia }: MediaListModalProps) {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={handleBackdropClick}>
            <div className="modal-dialog modal-xl modal-dialog-centered" style={{ maxWidth: '50vw' }}>
                <div className="modal-content" style={{ maxHeight: '90vh', minHeight: '90vh' }}>
                    <div className="modal-header border-bottom-0">
                        <button
                            type="button"
                            className="btn-close border-0 rounded-1"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body" style={{ maxHeight: 'calc(90vh - 120px)', overflowY: 'auto' }}>
                        <MediaList onSelectMedia={onSelectMedia} />
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary rounded-3"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MediaListModal;

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    mediaUrl: string;
    mediaType?: 'image' | 'audio';
    altText?: string;
}

function PreviewModal({ isOpen, onClose, mediaUrl, mediaType = 'image', altText = "Media" }: PreviewModalProps) {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '36px',
                    cursor: 'pointer',
                    zIndex: 10000,
                    lineHeight: '1',
                    padding: '0',
                    width: '40px',
                    height: '40px'
                }}
                aria-label="Close"
            >
                ×
            </button>

            {/* Media content */}
            {mediaType === 'image' ? (
                <img
                    src={mediaUrl}
                    alt={altText}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        maxWidth: '90%',
                        maxHeight: '90%',
                        objectFit: 'contain'
                    }}
                />
            ) : (
                <audio
                    controls
                    autoPlay
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        width: '500px',
                        maxWidth: '90%'
                    }}
                >
                    <source src={mediaUrl} />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
}

export default PreviewModal;

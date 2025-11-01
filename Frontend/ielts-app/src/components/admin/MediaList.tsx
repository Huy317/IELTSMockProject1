import { useEffect, useState } from "react";
import type { Media } from "../../types/Media";
import { getAllMedia } from "../../services/mediaService";
import { toast } from "react-toastify";
import Pagination from "../utils/Pagination";
import UploadMediaModal from "../utils/UploadMediaModal";
import OpenImageModal from "../utils/PreviewModal";

interface MediaListProps {
    onSelectMedia?: (mediaUrl: string) => void;
}

function MediaList({ onSelectMedia }: MediaListProps) {
    const [mediaItems, setMediaItems] = useState<Media[]>([]); // To be fetched from API
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all"); // all, image, audio
    const [currentPage, setCurrentPage] = useState(1);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [selectedMediaUrl, setSelectedMediaUrl] = useState("");
    const [selectedMediaType, setSelectedMediaType] = useState<'image' | 'audio'>('image');
    const itemsPerPage = 12; // 12 items per page (3x4 grid)

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterType(e.target.value);
        setCurrentPage(1); // Reset to first page when filtering
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleMediaClick = (mediaUrl: string) => {
        if (onSelectMedia) {
            onSelectMedia(mediaUrl);
        }
    };

    const handleCopyUrl = (mediaUrl: string) => {
        navigator.clipboard.writeText(mediaUrl).then(() => {
            toast.success("Media URL copied to clipboard!");
        }).catch(() => {
            toast.error("Failed to copy URL.");
        });
    };

    const handleViewImage = (mediaUrl: string, fileName: string) => {
        // Determine if it's an image or audio
        const isImage = fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i);
        const isAudio = fileName.match(/\.(mp3|wav|ogg|m4a|aac)$/i);
        
        if (isImage) {
            setSelectedMediaUrl(mediaUrl);
            setSelectedMediaType('image');
            setIsMediaModalOpen(true);
        } else if (isAudio) {
            setSelectedMediaUrl(mediaUrl);
            setSelectedMediaType('audio');
            setIsMediaModalOpen(true);
        } else {
            toast.info("Preview is only available for images and audio files.");
        }
    };

    const fetchMediaItems = async () => {
        toast.promise(getAllMedia().then((data) => {
            console.log(data);
            setMediaItems(data);
        }), {
            pending: "Loading media...",
            error: "Failed to load media."
        });
    };

    useEffect(() => {
        fetchMediaItems();
    }, []);

    // Filter media based on search term and filter type
    const filteredMedia = mediaItems.filter((media : Media) => {
        const matchesSearch = media.originalFileName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? true;
        const matchesFilter = 
            filterType === "all" ||
            (filterType === "image" && media.fileName?.match(/\.(jpg|jpeg|png|gif|webp)$/i)) ||
            (filterType === "audio" && !media.fileName?.match(/\.(jpg|jpeg|png|gif|webp)$/i));
        return matchesSearch && matchesFilter;
    });

    // Calculate pagination for filtered results
    const totalItems = filteredMedia.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMedia = filteredMedia.slice(startIndex, endIndex);

    return (
        <>
            {/* Page title and actions */}
            <div className="page-title d-flex align-items-center justify-content-between mb-3">
                <h5 className="fw-bold">Media Library</h5>
                <button className="btn btn-primary" onClick={() => setIsUploadModalOpen(true)}>
                    <i className="isax isax-add me-2"></i>
                    Upload Media
                </button>
            </div>

            {/* Search and Filter Section */}
            <div className="row mb-4">
                <div className="col-md-8">
                    <div className="input-icon">
                        <span className="input-icon-addon">
                            <i className="isax isax-search-normal-14"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control form-control-md"
                            placeholder="Search by media name..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select form-control-md"
                        value={filterType}
                        onChange={handleFilterChange}
                    >
                        <option value="all">All Media Types</option>
                        <option value="image">Images Only</option>
                        <option value="audio">Audio Only</option>
                    </select>
                </div>
            </div>

            {/* Media Grid Section */}
            <div className="row">
                <div className="col-12">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            {/* Scrollable media container */}
                            <div
                                className="media-grid-container"
                                style={{
                                    maxHeight: '600px',
                                    overflowY: 'auto',
                                    overflowX: 'hidden'
                                }}
                            >
                                <div className="row g-3">
                                    {currentMedia.map((media) => (
                                        <div key={media.id} className="col-lg-3 col-md-4 col-sm-6 mt-0">
                                            <div className="card border mb-3">
                                                <div className="card-body p-2 pb-2">
                                                    {/* Media Preview */}
                                                    <div
                                                        className="media-preview bg-light d-flex align-items-center justify-content-center mb-2"
                                                        style={{
                                                            height: '150px',
                                                            borderRadius: '6px',
                                                            overflow: 'hidden',
                                                            cursor: onSelectMedia ? 'pointer' : 'default'
                                                        }}
                                                        onClick={() => onSelectMedia && handleMediaClick(media.fileUrl)}
                                                    >
                                                        {media.fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                                            <img
                                                                src={media.fileUrl}
                                                                alt={media.originalFileName}
                                                                className="img-fluid object-fit-cover w-100 h-100"
                                                            />
                                                        ) : (
                                                            <i className="isax isax-music text-primary" style={{ fontSize: '56px' }}></i>
                                                        )}
                                                    </div>

                                                    {/* Media Info */}
                                                    <div className="media-info px-1">
                                                        <h6 className="fw-medium mb-1 text-truncate" title={media.originalFileName}>
                                                            {media.originalFileName}
                                                        </h6>
                                                        <small className="text-muted d-block mb-2">{new Date(media.uploadedAt).toLocaleDateString()}</small>

                                                        {/* Action Buttons - Centered */}
                                                        <div className="d-flex justify-content-center gap-1 mb-0">
                                                            <button
                                                                className="btn btn-sm btn-outline-primary d-inline-flex align-items-center justify-content-center"
                                                                style={{ width: '32px', height: '32px' }}
                                                                title="View"
                                                                onClick={() => handleViewImage(media.fileUrl, media.fileName)}
                                                            >
                                                                <i className="isax isax-eye"></i>
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center justify-content-center"
                                                                style={{ width: '32px', height: '32px' }}
                                                                title="Copy URL"
                                                                onClick={() => handleCopyUrl(media.fileUrl)}
                                                            >
                                                                <i className="isax isax-copy"></i>
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-outline-danger d-inline-flex align-items-center justify-content-center"
                                                                style={{ width: '32px', height: '32px' }}
                                                                title="Delete"
                                                            >
                                                                <i className="isax isax-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Empty State */}
                                {filteredMedia.length === 0 && (
                                    <div className="text-center py-5">
                                        <i className="isax isax-gallery-slash text-muted" style={{ fontSize: '64px' }}></i>
                                        <h5 className="text-muted mt-3">No media found</h5>
                                        <p className="text-muted">Try adjusting your search or filter criteria</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <Pagination
                totalItems={totalItems}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />

            {/* Upload Media Modal */}
            <UploadMediaModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUploadSuccess={fetchMediaItems}
            />

            {/* Image Preview Modal */}
            <OpenImageModal
                isOpen={isMediaModalOpen}
                onClose={() => setIsMediaModalOpen(false)}
                mediaUrl={selectedMediaUrl}
                mediaType={selectedMediaType}
            />
        </>
    );
}

export default MediaList;

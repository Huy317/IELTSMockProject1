import { client } from './authService';

/**
 * Upload a file through your ASP.NET backend proxy
 * @param file - The file to upload
 * @returns Promise<string> - The direct URL to the uploaded file
 */
export const uploadFileToCatbox = async (file: File): Promise<string> => {
    try {
        // Validate file
        if (!file) {
            throw new Error('No file provided');
        }

        // Create form data for the backend API
        const formData = new FormData();
        formData.append('file', file);

        // Make the API request to your ASP.NET backend using the same client as authService
        const response = await client.post('/fileupload/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Axios automatically throws for HTTP error status codes (4xx, 5xx)
        // So if we reach here, the request was successful

        // Parse JSON response from your backend (Axios automatically parses JSON)
        const result = response.data;

        if (!result.url) {
            throw new Error('No file URL returned from server');
        }

        return result.url;

    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error(
            `Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
};

/**
 * Generic file upload function - currently uses Catbox.moe
 * This function provides a consistent interface that can be easily switched to other services
 * @param file - The file to upload
 * @returns Promise<string> - The direct URL to the uploaded file
 */
export const uploadFile = async (file: File): Promise<string> => {
    // Validate file with Catbox's 200MB limit and no MIME type restrictions
    const validation = validateFile(file, 200);
    if (!validation.isValid) {
        throw new Error(validation.error);
    }

    return uploadFileToCatbox(file);
};

/**
 * Validate file before upload
 * @param file - The file to validate
 * @param maxSizeInMB - Maximum file size in MB (default: 200MB - Catbox limit)
 * @param allowedTypes - Array of allowed MIME types (optional)
 * @returns boolean - True if file is valid
 */
export const validateFile = (file: File, maxSizeInMB: number = 200, allowedTypes?: string[]): { isValid: boolean; error?: string } => {
    // Check file size (Catbox has 200MB limit)
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
        return {
            isValid: false,
            error: `File size exceeds ${maxSizeInMB}MB limit. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`
        };
    }

    // Check file type if specified
    if (allowedTypes && allowedTypes.length > 0) {
        const isTypeAllowed = allowedTypes.some(type => {
            if (type.endsWith('/*')) {
                return file.type.startsWith(type.slice(0, -1));
            }
            return file.type === type;
        });

        if (!isTypeAllowed) {
            return {
                isValid: false,
                error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`
            };
        }
    }

    return { isValid: true };
};

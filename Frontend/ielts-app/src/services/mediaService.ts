import type { Media } from '../types/Media';
import { client } from './authService';

export const getAllMedia = async (): Promise<Media[]> => {
    const response = await client.get('/media/');
    return response.data;
};

export const getMediaById = async (id: number): Promise<Media> => {
    const response = await client.get(`/media/${id}`);
    return response.data;
}

export const deleteMedia = async (id: number): Promise<void> => {
    const response = await client.delete(`/media/${id}`);
    return response.data;
}



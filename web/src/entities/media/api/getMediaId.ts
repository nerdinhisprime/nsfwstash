import { API_HOSTNAME } from '@/shared';

export const getMediaId = async (id: number | string) => {
  const res = await fetch(`${API_HOSTNAME}/media/get-img/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  return {
    previewUrl: data.previewUrl,
    originalUrl: data.originalUrl,
    mediaType: data.mediaType,
  };
};

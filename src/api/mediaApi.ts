import { apiFetch, ensureXsrfCookie } from './api';

export interface MediaUploadResponse {
  url: string;
  key: string;
  bucket: string;
}

/**
 * Upload a file to cloud storage
 * @param file - The file to upload
 * @param orgId - Organization ID
 * @param folder - Optional folder name (e.g., 'events', 'profiles')
 * @returns Upload response with the file URL
 */
export async function uploadMedia(
  file: File,
  orgId: string,
  folder?: string,
): Promise<MediaUploadResponse> {
  await ensureXsrfCookie();
  const formData = new FormData();
  formData.append('File', file);
  formData.append('OrgId', orgId);
  if (folder) {
    formData.append('Folder', folder);
  }

  const response = await apiFetch<MediaUploadResponse>('/media/upload', {
    method: 'POST',
    body: formData,
    // Note: Don't set Content-Type header for FormData, browser will set it automatically with boundary
  });

  return response;
}

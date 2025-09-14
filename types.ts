
export interface ImageFile {
  file: File;
  base64: string;
  mimeType: string;
}

export interface EditHistoryItem {
  imageUrl: string;
  prompt: string;
}
